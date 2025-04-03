"use client";

import { useSocket } from '@/context/SocketContext';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

const Chat = () => {
    const { socket, isSocketConnected } = useSocket();
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (!socket) return;

        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("connect", () => {
            setIsConnected(true);
        })

        socket.on("disconnect", () => {
            setIsConnected(false);
        })

        return () => {
            socket.off("chat message");
        }
    }, [socket]);

    const sendMessage = () => {
        if (!socket || !message?.trim()) return;

        socket.emit("chat message", message);
        setMessage("");
    }
    return (
        <div>
            {isConnected && <p>User {session?.user?.id} is connected</p>}
            <input type="text" placeholder='Type a message...' onChange={(e) => setMessage(e.target.value)} value={message} />
            <button onClick={sendMessage}>Send</button>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    )
}

export default Chat