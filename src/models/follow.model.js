import { User } from "./user.model.js";
import mongoose from "mongoose";

const followSchema = mongoose.Schema({
    follow: {
        type: Boolean,
        default: false
    },
    followers: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 0
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 0
    }
})

export const follow = mongoose.model("follow",followSchema)