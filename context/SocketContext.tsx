import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface iSocketContext {
    socket: Socket | null,
    isSocketConnected: boolean,
};

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

    console.log("isConnected: ", isSocketConnected);

    useEffect(() => {
        if (!session?.user?.id) return;

        const newSocket = io();
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        };
    }, [session?.user?.id])

    useEffect(() => {
        if (socket === null) return;

        if (socket.connected) {
            onConnect();
        };

        function onConnect() {
            setIsSocketConnected(true);
        };
        function onDisconnect() {
            setIsSocketConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        }
    }, [socket]);
    return <SocketContext.Provider value={{ socket, isSocketConnected }}>
        {children}
    </SocketContext.Provider>
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (context === null) {
        throw new Error("useSocket must be used within a SocketContextProvider.");
    }

    return context;
}
