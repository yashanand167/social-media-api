import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

const postImageOrVideos = async (req, res) => {
  let { username, caption } = req.body;

  // const user = await User.findOne({ username });

  console.log(username);

  // if (!user) {
  //   throw new APIerror(404, "User not Found");
  // }

  // const ImagePath = await req.files?.Image?.path;
  // const videoPath = await req.files?.Video?.path;

  // const postImage = await uploadonCloudinary(ImagePath);
  // const postVideo = await uploadonCloudinary(videoPath);

  // if (!postImage || !postVideo) {
  //   caption = "";
  // }

  // const post = await Post.create({
  //   user: user._id,
  //   postImage: postImage?.url || "",
  //   postVideo: postVideo?.url || "",
  //   caption,
  // });

  // if (!post) {
  //   throw new APIerror(500, "Internal Server Error");
  // }

  // await post.save();

  return res
    .status(200)
    .json(new APIresponse("Post uploaded successfully", post, 200));
};

const editPost = async (req, res) => {
  // const{username} = req.body;
  // if(!username){
  //   throw new APIerror(404, "User not found")
  // }

  // const postId = req.params.postId;
  const { postId } = req.params;

  console.log(postId);
  const post = await Post.findById(postId);

  if (!post) {
    // throw new APIerror(404, "Post doesn't exist");
    console.log("Damn it post is not there!");
    process.exit();
  }

  const ImagePath = req.files?.Image?.path;
  const VideoPath = req.files?.Video?.path;

  const image = await uploadonCloudinary(ImagePath);
  const video = await uploadonCloudinary(VideoPath);

  const updatePost = Post.findByIdAndUpdate(
    {
      $set: {
        caption: req.body.caption || post.caption,
        image: image?.url || post.image,
        video: video?.url || post.video,
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
const getPost = async (req, res) => {
  // const user = await User.findOne({ username });

  // if (!user) {
  //   throw new APIerror(404, "User does not exist");
  // }

  const { postId } = req.body;
  console.log(postId);
  // const getpost = await post.findById();

  if (!getpost) {
    throw new APIerror(404, "Post not found");
  }

  return res.status(200).json(new APIresponse(200, getpost, "Post found"));
};

const deletePost = async (req, res) => {
  const post = Post.req.params;

  if (!post) {
    throw new APIerror(404, "Post not found");
  }
};

export { postImageOrVideos, editPost };
