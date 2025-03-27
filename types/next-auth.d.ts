import NextAuth from "next-auth";

declare module "next-auth" {

    interface User {
        id: string,
        name: string,
        email: string,
        role?: "admin" | "member"
    }

    interface Session {
        user: User,
    }
}