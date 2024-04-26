import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

export const getPost = async (req, res) => {
    // const user = await User.findOne({ username });
  
    // if (!user) {
    //   throw new APIerror(404, "User does not exist");
    // }
  
    let { name, caption } = req.body;
    console.log(caption);
    // const getpost = await post.findById();
  
    // if (!getpost) {
    //   throw new APIerror(404, "Post not found");
    // }
  
    return res.status(200).json(new APIresponse(200, getpost, "Post found"));
  };
  
