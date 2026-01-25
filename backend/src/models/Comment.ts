import {Schema, Document, model, Types } from "mongoose";

export interface Comment extends Document{
    postId: Types.ObjectId,
    author: Types.ObjectId,
    text: String,
    CreatedAt: Date
}

const commentSchema = new Schema<Comment>({
    postId:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        required: true,
        maxLength: 200
    }
},{timestamps: true}
);

export const Comment = model<Comment>("Comment", commentSchema)