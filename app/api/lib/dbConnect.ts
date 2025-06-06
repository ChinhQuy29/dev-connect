import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

export const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    if (!MONGODB_URI) return;

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "devconnect"
        });

        console.log("✅ MongoDB Connected")
    } catch (error) {
        console.error("❌ MongoDB Connection Failed", error);
    }
};