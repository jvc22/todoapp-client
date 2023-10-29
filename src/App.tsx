import { AddIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns-tz";
import { Task, TaskProps } from "./components/Task";
import { Modal } from "./components/Modal";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import { AxiosError } from "axios";
import { LineWobble } from "@uiball/loaders";
import { Header } from "./components/Header";

export function App() {
  const date = new Date()
  const formattedDate = format(date, "dd MMM. yyyy")

  const {isOpen, onOpen, onClose} = useDisclosure()

  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getTodayTasks() {
      try {
        const res = await api.get('/task')
        
        if(res.status === 200) {
          setTasks(res.data)
          setIsLoading(false)
        }
      } catch(err) {
        if(err instanceof AxiosError && err?.response?.data?.message) {
          console.log(err.response.data.message)
          return
        }
      }
    }

    getTodayTasks()
  }, [])

  return (
    <div className="h-[100vh] w-[100vw] px-10 flex flex-col justify-start items-center">
      <Header />

      <Card shadow='lg' className="w-full max-w-[720px] mt-10 h-fit">
        <CardHeader className="flex items-center justify-between">
          <Heading size='md'>Add a new task for today</Heading>
          <AddIcon onClick={onOpen} className="hover:rotate-90 transition-transform ease-linear cursor-pointer"/>
        </CardHeader>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}/>

      <Card shadow='lg' className="w-full max-w-[720px] min-w-[600px] mt-10 h-fit">
        <CardHeader className="flex items-center justify-between">
          <Heading size='md'>To Do List</Heading>
          <Text className="text-xs">{formattedDate.toLowerCase()}</Text>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {
              isLoading ? (
                <div className="mx-auto mb-4">
                  <LineWobble />
                </div>
              ) : (
                tasks.length !== 0 ? (
                  tasks.map(task => (
                    <Task key={task.id} id={task.id} name={task.name} descr={task.descr} finished={task.finished}/>
                  ))
                ) : (
                <Text>No tasks found for today.</Text>
                )
              )
            }
          </Stack>
        </CardBody>
      </Card>
    </div>
  )
}
