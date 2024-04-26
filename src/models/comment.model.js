import mongoose from "mongoose";
import { Post } from "./posts.model.js";

const commentSchema = mongoose.Schema({
    Comment: {
        type: String,
        ref: "Post"
    },
    likes: {
        type: Number
    },
})

export const Comment = mongoose.model("Comment",commentSchema);