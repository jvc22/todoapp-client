import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Heading, Text } from "@chakra-ui/react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { Jelly } from "@uiball/loaders";

export interface TaskProps {
    id: string;
    name: string;
    descr: string;
    finished: boolean;
}

export function Task({id, name, descr, finished}: TaskProps) {
    async function handleDeleteTask() {
        try {
            setIsLoading(true)

            await api.delete(`/task/${id}`)
            window.location.reload()
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                console.log(err.response.data.message)
                return
            }
        }
    }

    async function handleCheckTask() {
        try {
            setIsChecked(!finished)

            await api.put(`/task/${id}`)
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                console.log(err.response.data.message)
                return
            }
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(finished)
    
    return (
        <Box>
            <Box className="flex items-start justify-between">
                <Box className="flex items-center gap-2">
                    <Checkbox isChecked={isChecked} onChange={handleCheckTask} />
                    <Heading size={"sm"} className={isChecked ? 'line-through' : ''}>{name.toUpperCase()}</Heading>
                </Box>

                {
                    isLoading ? (
                        <Jelly size={20} />
                    ) : (
                        <DeleteIcon onClick={handleDeleteTask} className="cursor-pointer hover:scale-125 transition-all ease-in-out"/>
                    )
                }
            </Box>
            <Text pt='2' fontSize='sm' className={isChecked ? 'line-through' : ''}>{descr}</Text>
        </Box>
    )
}