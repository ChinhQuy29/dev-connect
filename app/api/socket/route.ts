import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types/socketTypes";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (!res.socket.server.io) {
        const httpServer: HttpServer = res.socket.server as any;
        const io = new IOServer(httpServer, {
            path: "/api/socket",
            addTrailingSlash: false,
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket) => {
            console.log("New client connected: ", socket.id);

            socket.on("message", (msg) => {
                console.log("Message received: ", msg);
                io.emit("message", msg);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected: ", socket.id);
            });
        });

        res.socket.server.io = io;
    }

    res.end();
}