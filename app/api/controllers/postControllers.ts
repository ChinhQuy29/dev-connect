import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import Post from "../models/Post";
import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const createPost = async (req: NextRequest) => {
    try {
        await connectToDB();
        
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}