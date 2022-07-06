import { useState } from 'react'
import './StyleTransfer.css';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { FiUpload, FiNavigation, FiPlusCircle, FiArrowRightCircle } from 'react-icons/fi'

function StyleTransfer() {
    const STYLE_IMAGE_ID = "style-image";
    const CONTENT_IMAGE_ID = "content-image";
    const OUTPUT_IMAGE_ID = "output-image";

    const noImageImage = "no_image.png"

    // raw image files for API
    const [styleImage, setStyleImage] = useState(null);
    const [contentImage, setContentImage] = useState(null);


    // URL image for UI preview
    const [styleURL, setStyleURL] = useState(noImageImage);
    const [contentURL, setContentURL] = useState(noImageImage);
    const [outputURL, setOutputURL] = useState(noImageImage);

    //Spinner state
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [failed, setFailed] = useState(false);

    const updateStyleImage = (e) => {
        console.log('style image updated');
        const [file] = e.target.files;
        setStyleImage(file);
        setStyleURL(URL.createObjectURL(file));
    }

    const updateContentImage = (e) => {
        console.log('content image updated');
        const [file] = e.target.files;
        setContentImage(file);
        setContentURL(URL.createObjectURL(file));

    }

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData();

        setIsSubmitting(true);

        // build form
        formData.append('content_image', contentImage);
        formData.append('style_image', styleImage);

        // call API
        axios.post('https://digimap-backend.herokuapp.com/execute', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            setOutputURL('data:image/png;base64,' + response.data.output);
        }).catch((error) => {
            setFailed(true);
        }).finally(() => {
            setIsSubmitting(false);
        });
    }

    return (
        <>
            <Flex  w='100vw' flexDir="column" align="center" justify="center" justifyContent='center' display='inline-flex' mx='auto' mt='7vh'>

                <img src="im_ST1.png" alt="IMAGE STYLE TRANSFER" width="500px" />
                
                {failed ? 
                    <Text color='red'>API failed to complete action. Please try again later or try a different set of images.</Text>
                    :
                    null
                }
                <Box h="70px"></Box>
                <Flex height='50vh' width={'150vh'} align="center" justify="center" justifyContent='center' >

                    <form id="ImageForm" onSubmit={submitForm}>
                        <HStack spacing='24px' >

                            <Flex w="35vh" h="40vh" align="center" justify="center" flexDir="column" backgroundColor='#82afc2' borderRadius={"10px"} padding="20px" spacing='70px' >
                                <Text fontSize='20px' fontWeight={"700"} color="white">CONTENT IMAGE</Text>
                                <img id={CONTENT_IMAGE_ID} src={contentURL} alt="Content Display" width="250px" height="250px" />

                                <input id={CONTENT_IMAGE_ID + "-input"} type="file" onChange={updateContentImage} accept="image/*" mt={4} align="center" className="filetype" />
                                <label className="image-upload" htmlFor="content-image-input">
                                    <HStack spacing='10px' align="center" justify="center" justifyContent='center' >
                                        <FiUpload mt={2} fontSize='1em' />
                                        <Text fontSize='15px' fontWeight={"700"}>Upload Content Image</Text>
                                    </HStack>
                                </label>
                            </Flex>

                            < FiPlusCircle mt={2} fontSize='5em' color='#D7C9B8' />

                            <Flex w="35vh" h="40vh" align="center" justify="center" flexDir="column" backgroundColor='#82afc2' borderRadius={"10px"} padding="20px" spacing='70px' >
                                <Text fontSize='20px' fontWeight={"700"} color="white">STYLE IMAGE</Text>

                                <img id={STYLE_IMAGE_ID} src={styleURL} alt="Style Display" width="250px" height="250px" />

                                <input id={STYLE_IMAGE_ID + "-input"} type="file" onChange={updateStyleImage} accept="image/*" mt={4} align="center" className="filetype" />
                                <label className="image-upload" htmlFor="style-image-input">
                                    <HStack spacing='10px' align="center" justify="center" justifyContent='center' >
                                        <FiUpload mt={2} fontSize='1em' />
                                        <Text fontSize='15px' fontWeight={"700"}>Upload Style Image</Text>
                                    </HStack>
                                </label>
                            </Flex>

                            < FiArrowRightCircle mt={2} fontSize='5em' color='#D7C9B8' />

                            <Flex w="35vh" h="40vh" align="center" justify="center" flexDir="column" backgroundColor='#82afc2' borderRadius={"10px"} padding="20px" spacing='70px'>
                                <Text fontSize='20px' fontWeight={"700"} color="white">RESULT</Text>
                                {isSubmitting ? 
                                    <Box w='250px' height='250px' display='flex' alignItems='center'>
                                        <Spinner    width={100} height={100}
                                                    speed='0.65s'
                                                    style={{color: 'white'}}
                                                    display='block'
                                                    m='auto'                                     
                                        />  
                                    </Box>
                                    :
                                    <img id={OUTPUT_IMAGE_ID} src={outputURL} alt="Output Display" width="250px" height="250px" />
                                }
                                <input type="submit" value="Execute" id={"submit"} disabled={!styleImage || !contentImage} mt={4} align="center" className="filetype" />
                                <label className="image-upload" htmlFor="submit">
                                    <HStack spacing='10px' align="center" justify="center" justifyContent='center' >
                                        <FiNavigation mt={2} fontSize='1em' />
                                        <Text fontSize='15px' fontWeight={"700"}>Submit</Text>

                                    </HStack>
                                </label>
                            </Flex>
                        </HStack>
                    </form>
                </Flex>
                <img  src='notflix - how to.png' alt="How Does it Work?" width="60%" />
            </Flex>
        </>

    );
}

export default StyleTransfer;