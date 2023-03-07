import React, { useState } from 'react';
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Center, Container, Flex, Heading } from "@chakra-ui/react";
import { useColorModeValue } from '@chakra-ui/react';

const ResetPassword = () => {
    const [show, setShow] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const { id, token } = useParams();

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show)
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!newPassword || !confirmPassword) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }

        if (!(newPassword === confirmPassword)) {
            toast({
                title: "Passwords do mot match",
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
                `https://prasanth-chat-app-server.up.railway.app/api/user/reset-password/${id}/${token}`,
                { password: newPassword },
                config
            );
            toast({
                title: "Password updated successfully !!",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
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
                        <FormControl id="new-password" isRequired>
                            <FormLabel>New Password</FormLabel>
                            <InputGroup>
                                <Input bg="white" value={newPassword} id="newPassword" type={show ? "text" : "password"} placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl id="confirm-password" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input bg="white" value={confirmPassword} id="confirmPassword" type={show ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Button colorScheme="teal" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Update password</Button>
                    </VStack>
                </Flex>
            </Flex>
        </Container>

    )
}

export default ResetPassword