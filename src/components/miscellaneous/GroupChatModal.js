import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
    Box,
} from '@chakra-ui/react'
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../Users/UserListItem';
import UserBadgeItem from '../Users/UserBadgeItem';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
   
    const { user, chats, setChats } = ChatState();

    const handleSearch = async (event) => {
        setSearch(event.target.value);
        if (!event.target.value) {
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`https://chat-app-server-pipa.onrender.com/api/user?search=${event.target.value}`, config)
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to Load the search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    }

    const handleSubmit = async () => {
        if(!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the fields!!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("https://chat-app-server-pipa.onrender.com/api/chat/group", {
                name: groupChatName,
                users:JSON.stringify(selectedUsers.map((u) => u._id))
            }, config);
            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Chat Created!!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        }   catch (error) {
            toast({
                title: "Failed to Create the Chat!!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        }
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    }
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="25px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input placeholder='Group Chat Name' value={groupChatName} mb={3} onChange={(e) => { setGroupChatName(e.target.value); console.log(groupChatName) }} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add Users eg:John, Jack, Jane' id="searchInput" value={search} mb={3} onChange={handleSearch} />
                        </FormControl>

                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />                               
                            ))}                                                                                       
                        </Box>

                        {loading ? <div>Loading...</div> : (
                            searchResult?.slice(0, 4).map((user) => (                                                    
                                <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal