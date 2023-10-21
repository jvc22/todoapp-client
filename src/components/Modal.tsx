import { Button, FormControl, FormLabel, Input, Modal as CModal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormHelperText, Stack} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { DotPulse } from "@uiball/loaders";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const taskFormSchema = z.object({
    name: z.string()
            .min(3, {message: 'Minimum of 3 characters required.'})
            .max(20, {message: 'Maximum of 20 characters.'}),
    descr: z.string()
            .min(5, {message: 'Minimum of 5 characters required.'})
            .max(40, {message: 'Maximum of 40 characters.'})
})

type TaskFormData = z.infer<typeof taskFormSchema>

export function Modal({ isOpen, onClose }: ModalProps) {
    async function handleNewTask(data: TaskFormData) {
        try {
            setIsLoading(true)
            
            const res = await api.post('/task', {
                name: data.name,
                descr: data.descr
            })
    
            if(res.status === 201) {
                window.location.reload()
            }
    
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                console.log(err.response.data.message)
                return
            }
        }
    }

    const {register, handleSubmit, formState: {errors}} = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema)
    })

    const [isLoading, setIsLoading] = useState(false)

    return (
        <CModal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent as={'form'} onSubmit={handleSubmit(handleNewTask)}>
                <ModalHeader>New task</ModalHeader>
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" {...register('name')}/>
                            {errors.name && (
                                <FormHelperText color={'#F75A68'}>{errors.name.message}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input type="text" {...register('descr')}/>
                            {errors.descr && (
                                <FormHelperText color={'#F75A68'}>{errors.descr.message}</FormHelperText>
                            )}
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button type="submit" spinner={<DotPulse size={28}/>} isLoading={isLoading}>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </CModal>
    )
}