import { User } from "../models/user.model.js";
import { follow } from "../models/follow.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";

export const followersandFollowing = async(req,res) => {
    const{username} = req.body;
    if(!username?.trim()){
        throw new APIerror(404, "Username required")
    }

    const user = await User.findOne({username})

    if(!user){
        throw new APIerror(409,"User not found")
    }

    const profile = await user.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $lookup: {
                from: "follow",
                localField: "_id",
                foreignField: "followers",
                as: "following"
            }
        },
        {
            $lookup: {
                from: "follow",
                localField: "_id",
                foreignField: "following",
                as: "followers"
            }
        },
        {
            $addFields: {
                followersCount: {
                    $size: "$followers"
                },
                followedToCount: {
                    $size: "$following"
                }
            }
        }
    ])

    if(!profile){
        throw new APIerror(500, "Internal Server Error")
    }
    
    return res.status(200).json(new APIresponse(200,profile))
}

