import { APIresponse } from "../utils/APIresponse.js";
import { APIerror } from "../utils/APierror.js";
import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const postComment = async(req,res) => {
    try{
        const{postId,text} = req.body;

        // const user = User.findById(userId);

        // if(!user){
        //     throw new APIerror(404, "User not found")
        // }

        const post = Post.findById(postId);

        if(!post){
            throw new APIerror(404, "Post not found")
        }

        const comment = new Comment({ postId, text });
        await comment.save()

        post.comment.push(comment._id);
        await post.save()

        return res.status(200).json(new APIresponse(200, comment, "Comment posted successfully"))

    }
    catch(error){
        console.log(error);
        return res.status(500, "Internal Serever Error");
    }
}

export const getAllCommentsForPost = async(req,res) => {
    try{
        const postId = req.params.postId
        const post = Post.findById(postId)

        if(!post){
            throw new APIerror(404, "Post not found")
        }
        const comment = Comment.find(postId)

        if(!comment){
            throw new APIerror(404, "No comments were found")
        }

        return res.status(200).json(new APIresponse(200,comment))
    }
    catch(error){
        return res.status(500, "Internal Server Error")
    }
}

export const deletePost = async(req,res) => {
    try {
        const commentId = req.params;
        const comment = await Comment.findById(commentId)
        
        if(!comment){
            throw new APIerror(404, "Comment not found")
        }

        await comment.remove()
        const post = await Post.findByIdAndUpdate(
            comment.postId, 
            {
                $pull: {
                    comment: commentId
                }
            }
        )
        await post.save()

        return res.status(200).json(new APIresponse(200,{}, "Comment removed"))

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const editComment = async(req,res) => {
    const commentId = req.params
    const comment = Comment.findById(commentId);

    if(!comment){
        throw new APIerror(404, "Comment does not exist")
    }
        
    const editcomment = await Comment.findByIdAndUpdate(comment._id)(
        {
            $set: {
                comment: comment
            }
        },
        {
            new: true
        }
    )

    if(!editcomment){
        throw new APIerror(500, "Internal Server Error")
    }

    await comment.save()

    return res.status(200).json(new APIresponse(200, comment, "Comment edited successfully"))
}