import React from 'react';
import { Flex, Image, Box } from '@chakra-ui/react'

export default function Navbar() {
    return (
        <>
            <Box className="navbar" w="100%" h="7vh" px={100} minH={50} align="center" justify="center" position="relative" zIndex={50} paddingTop={"30px"} p='6' rounded='md' backgroundColor='#f0faff' >
                <Flex w='100%' h='100%' justifyContent={'Center'} alignItems={'center'}>
                    <Image src='Logo.png' h={"4vh"} alt='Logo' />
                </Flex>
            </Box>
        </>
    )
}





