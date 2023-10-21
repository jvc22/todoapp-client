import { AtSignIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

export function Header() {
    return (
        <Box className="w-full max-w-[718px] mt-10 flex justify-between">
            <Box className="flex items-center gap-2">
                <Heading size={'md'}>To Do App</Heading>
                <CheckIcon />
            </Box>
            <Text><AtSignIcon className="text-sm"/> joaovcostas</Text>
        </Box>
    )
}