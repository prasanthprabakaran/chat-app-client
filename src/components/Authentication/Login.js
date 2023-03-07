import React, { useState } from 'react';
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from '../../Context/ChatProvider';
import { Link } from '@chakra-ui/react'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = ChatState();

    const handleClick = () => {
        setShow(!show)
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
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

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://prasanth-chat-app-server.up.railway.app/api/user/login",
                { email, password },
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false)
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setUser(userInfo)
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
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
        <VStack spacing="5px">
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input bg="white" value={email} id="loginEmail" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input bg="white" type={show ? "text" : "password"} id="loginPassword" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl align="right" pt={2}>
                <Link textDecoration="underline" onClick={() => navigate('/forgot-password')}>
                    Forgot Password ?
                </Link>
            </FormControl>

            <Button colorScheme="teal" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Login</Button>
            <Button variant="solid" colorScheme="yellow" width="100%" style={{ marginTop: 15 }} onClick={() => { setEmail("test02@gmail.com"); setPassword("123456") }}>Get Guest user credentials</Button>
        </VStack>
    )
}

export default Login