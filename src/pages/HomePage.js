import React, { useEffect } from 'react'
import { Center, Container, Flex, Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react';
import Login from "../components/Authentication/Login"
import Signup from "../components/Authentication/Signup"
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats")
    };
  }, [navigate]);

  return (
    <Container centerContent>

      <Flex h="100vh" alignItems="center">
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={3} width="500px"
          borderRadius={8}
          boxShadow="lg"
        >
          <Center>
            <Heading mb={6}>Chat-Box</Heading>
          </Center>

          <Tabs>
            <TabList mb="1em" ms="1em" mr="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Container>

  )
}

export default HomePage