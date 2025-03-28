import { NextRequest, NextResponse } from "next/server";
import Post from "../models/Post";
import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "../lib/dbConnect";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        let { postedBy, text, img } = await req.json();
        if (!postedBy || !text) {
            return NextResponse.json({ error: "Missing information" }, { status: 400 });
        }

        if (img) {
            const uploadedImage = await cloudinary.uploader.upload(img, {
                folder: "devconnect",
                resource_type: "auto",
            });
            img = uploadedImage.secure_url;
        }

        const newPost = new Post({
            postedBy,
            text,
            img
        });
        newPost.save();

        return NextResponse.json(newPost, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: `Server error: ${error}` }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const posts = await Post.find();
        if (!posts) {
            return NextResponse.json({ error: "No posts found" }, { status: 400 });
        }

        return NextResponse.json({ posts }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}