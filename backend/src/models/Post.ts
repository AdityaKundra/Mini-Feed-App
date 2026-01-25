import {Schema, Document, model, Types } from "mongoose";

export interface Post extends Document{
    // userId, title, description, media, likesId, createdAt
    authorId: Types.ObjectId,
    title: String,
    description: String,
    media?: [String],
    likes: [Types.ObjectId],
    createdAt: Date
}

const postSchema = new Schema<Post>({
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
    },
    title:{
        type: String,
        required: true,
        maxLength:70,
        trim: true
    },
    description:{
        type: String,
        maxlength:200,
        trim: true,
        required: true
    },
    media:{
        type: [String],
        default: []
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true}
);

postSchema.index({createdAt: -1});


export const Post = model<Post>("Post", postSchema);