import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    profileImage?: string,
    bio?: string
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        }
    }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User