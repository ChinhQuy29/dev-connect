import mongoose, { Schema, Document } from "mongoose";

export interface IReply {
    userId: mongoose.Types.ObjectId,
    text: string,
    userProfilePic: string,
    username: string,
}

export interface IPost extends Document {
    postedBy: mongoose.Types.ObjectId,
    text: string,
    img?: string,
    likes: mongoose.Types.ObjectId[],
    replies: IReply[],
}

const PostSchema = new Schema<IPost>(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        replies: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                userProfilePic: {
                    type: String,
                },
                username: {
                    type: String,
                }
            }
        ],
    },
    {
        timestamps: true
    }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post