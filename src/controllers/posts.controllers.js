import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

export const postImageOrVideos = async (req, res) => {
  let { username, caption } = req.body;

  const user = await User.findOne({ username });

  console.log(username);

  if (!user) {
     throw new APIerror(404, "User not Found");
  }

  const ImagePath = req.files?.Image?.path;
  const videoPath = req.files?.Video?.path;

  if (!ImagePath || !videoPath) {
    caption = "";
  }

  const post = await Post.create({
    user: user._id,
    ImagePath: ImagePath,
    videoPath: videoPath,
    caption: Post.caption,
  });

  await post.save();
  const createdPost = await Post.findById(post._id)

  if (!createdPost){
    throw new APIerror(500, "Internal Server Error")
  }

  return res
    .status(200)
    .json(new APIresponse("Post uploaded successfully", createdPost, 200));
};

export const editPost = async (req, res) => {
  const{username} = req.body;
  if(!username){
     throw new APIerror(404, "User not found")
  }

  const postId = req.params.postId;

  console.log(postId);
  const post = await Post.findById(postId);

  if (!post) {
    throw new APIerror(404, "Post doesn't exist");
  }

  const ImagePath = req.files?.Image?.path;
  const VideoPath = req.files?.Video?.path;

  const updatePost = Post.findByIdAndUpdate(
    {
      $set: {
        caption: req.body.caption || post.caption,
        ImagePath: ImagePath?.url || post.ImagePath,
        VideoPath: VideoPath?.url || post.VideoPath,
      },
    },
    {
      new: true,
    }
  );

  if (!updatePost) {
    throw new APIerror(500, "Internal Server Error");
  }

  res
    .status(200)
    .json(new APIresponse(200, updatePost, "Post updated successfully"));
};

//TODO: write controllers for finding and deleting post
export const getPost = async (req, res) => {
  // const user = await User.findOne({ username });

  // if (!user) {
  //   throw new APIerror(404, "User does not exist");
  // }

  const { postId } = req.body;
  console.log(postId);
  const getpost = await post.findById();

  if (!getpost) {
    throw new APIerror(404, "Post not found");
  }

  return res.status(200).json(new APIresponse(200, getpost, "Post found"));
};

export const deletePost = async (req, res) => {
  const post = Post.req.params;

  if (!post) {
    throw new APIerror(404, "Post not found");
  }
};


