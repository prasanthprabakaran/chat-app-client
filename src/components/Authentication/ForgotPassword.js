import React, { useState } from 'react';
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Center, Container, Flex, Heading } from "@chakra-ui/react";
import { useColorModeValue } from '@chakra-ui/react';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const formBackground = useColorModeValue('gray.100', 'gray.700');

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if (!email) {
            toast({
                title: "Please enter your email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://chat-app-server-pipa.onrender.com/api/user/forgot-password",
                { email },
                config
            );
            console.log(data)
            toast({
                title: "Password reset link sent successfully to your email. Please check your mail",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            setLoading(false)
            navigate("/");
        } catch (error) {
            toast({
                title: "Error Occurred!!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            setLoading(false)
        }

    }

    return (
        <Container centerContent>
            <Flex h="100vh" alignItems="center">
                <Flex
                    flexDirection="column"
                    bg={formBackground}
                    pr={8} pl={8} pb={8} pt={5} width="500px"
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Center>
                        <Heading mb={6}>Chat-Box</Heading>
                    </Center>
                    <VStack spacing="5px">
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input bg="white" p={6} value={email} id="loginEmail" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>

                        <Button colorScheme="teal" p={6} width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Send password reset mail</Button>
                    </VStack>
                </Flex>
            </Flex>
        </Container>
    )
}

export default ForgotPassword