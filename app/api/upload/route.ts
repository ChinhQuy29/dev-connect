import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json();

        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: "devconnect/posts",
            resource_type: "auto",
        });

        return NextResponse.json({
            secure_url: uploadedImage.secure_url,
        })
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}