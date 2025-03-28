import { Server as HttpServer } from "http";
import { Socket } from "net";
import { Server as IOServer } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: HttpServer & {
            io?: IOServer;
        };
    };
};