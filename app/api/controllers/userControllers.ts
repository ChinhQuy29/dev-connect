import { connectToDB } from "../lib/dbConnect";
import User from "../models/User";
import { NextRequest, NextResponse } from "next/server";

export const getUsers = async (req: NextRequest) => {
    try {
        await connectToDB();
        const users = await User.find().select("-password");
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};