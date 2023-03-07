import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../Context/ChatProvider';
import "./styles.css"

const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();
   
    return (      
            <ScrollableFeed className="messageFeed">
                {messages && messages.map((m) => (
                    <div className={m.sender._id === user._id ? "ownMessage" : "message"} key={m._id}>
                        {m.content}
                    </div>
                ))}
            </ScrollableFeed>
    )
}

export default ScrollableChat;