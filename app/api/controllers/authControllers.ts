import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { connectToDB } from "../lib/dbConnect";

export const signup = async (req: NextRequest) => {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectToDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword
        })
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};