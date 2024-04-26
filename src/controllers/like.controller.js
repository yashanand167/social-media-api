import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";

export const likePost = async(req,res) => {

}

export const getNoOfLikes = async(req,res) => {
    const{username} = req.body;

    if(!username){
        throw new APIerror(404, "username is required")
    }
    
    const user = await User.findOne({username});

    if(!user){
        throw new APIerror(404, "username is missing")
    }

    const post = Post.req.params;

    const get_post = await post.findById(user._id)

    if(post.like.includes(get_post)){
        throw new APIerror(400, "You have already liked this post")
    }

    post.like.push(get_post)
    await post.save()

    if(!post){
        throw new APIerror(500, "Internal Server Error")
    }

    return res.status(200).json(new APIresponse(200, post, "Post liked successfully"))
}

export const likeComment = async(req,res) => {

}

export const removeLikefromComment = async(req,res) => {

}

export const removeLikefromPost = async(req,res) => {
    
}