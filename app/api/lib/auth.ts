import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { connectToDB } from "./dbConnect";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                await connectToDB();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) throw new Error("User not found");

                const isValid = await bcrypt.compare(credentials!.password, user.password);
                if (!isValid) throw new Error("Invalid credentials");

                return {
                    id: user._id,
                    name: user.username,
                    email: user.email,
                };
            },
        }),
    ],
    session: { strategy: "jwt" as SessionStrategy },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions)