
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <>
            <Flex height='100vh' width='100%' flexDir="row" align="center" justify="center" justifyContent='center'  >

                <Flex flexDir="column" paddingTop="100px">
                    <Image src='landing_tittle.png' h={"30vh"} alt='Logo' />
                    <p>By Team Notflix, DIGIMAP group 10</p>
                    <Link to="/StyleTransfer">
                        <Button rightIcon={<FiArrowRight />} h="40px" w="50%" fontWeight="800" variant='outline' border='0px' borderRadius={7} backgroundColor='#82afc2' color="white" py={5} px={20}>LETS GO </Button>
                    </Link>
                </Flex>
                <Box w="150px" />
                <Image src='BG.png' h={"80vh"} alt='Logo' />
            </Flex>
        </>

    );
}

export default Landing;