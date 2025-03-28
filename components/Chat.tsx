"use client";

import { useSocket } from '@/app/hooks/useSocket';
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const socket = useSocket();
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        if (!socket) return;

        socket.on("message", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("message");
        };
    }, [socket]);

    const sendMessage = () => {
        if (socket && input.trim() !== "") {
            socket.emit("message", input);
            setInput("");
        }
    }

    return (
        <div>
            <h2>Real-time Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...' />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat