import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

export const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.createAccessToken()
        return accessToken
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async(req,res) => {
    const {email, username, password, bio} = req.body
    console.log(req.body);

    if (!(email || username || password)) {
        throw new APIerror(400, "all fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }] 
    })

    if (existedUser) {
        throw new APIerror(409, "User with email or username already exists")
    }

    const profileImageLocalPath = await req.files?.profileImage[0]?.path;
    const avatarLocalPath = await req.files?.avatar[0]?.path;

    const profileImage = await uploadonCloudinary(profileImageLocalPath);
    const avatar = await uploadonCloudinary(avatarLocalPath);

    const newuser = await User.create({
        username: username,
        email: email,
        password: password,
        avatar: avatar?.url || "",
        bio,
        profileImage: profileImage?.url || ""
    })
    
    const createdUser = await User.findById(newuser._id).select("-password")
    if(!createdUser){
        throw new APIerror(500, "Internal Server Error")
    }
    return res.status(200).json(new APIresponse(200, createdUser, "User registered successfully"))
}

export const logInUser = async(req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);

    if (!email || !username || !password) {
        throw new APIerror(400, "All fields are required");
    }

    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            throw new APIerror(404, "User not found");
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new APIerror(401, "Incorrect Password");
        }

        const accessToken = generateAccessToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password");

        if (!loggedInUser) {
            throw new APIerror(500, "Internal Server Error");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(new APIresponse(200, {
                user: loggedInUser, 
                accessToken
            }, "User logged in successfully"));
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

//TODO: write controllers for logging out using auth middleware
export const logOutUser = async(req,res) => {
    const{username,email,password} = req.body;

    if(!username || !password || !email){
        throw new APIerror(400, "All fields are required");
    }
}

export const updateprofileImageAndAvatar = async(req,res)=>{
    const{profileImage,username,avatar} = req.body;

    if(!username){
        throw new APIerror(404, "User with username doesnt exist");
    }

    const user = await User.findByIdAndUpdate(user._id)(
        {
            $set: {
                profileImage: profileImage?.url || "",
                avatar: avatar?.url || ""
            },
        },
        {
            new: true
        }
    )

    if(!user){
        throw new APIerror(500, "Internal Server Error")
    }

    return res.status(200)
    .json(new APIresponse(200, user, "Profile Image Update successfully"))
}

export const updateUserDetails = async(req,res) => {
    const{username,bio} = req.body;

    if(!username){
        throw new APIerror(404,"Username is required");
    }

    const user = await User.findByIdAndUpdate(user?._id)(
        {
            $set: {
                username: username,
                bio: bio
            }
        },
        {
            new: true
        }
    )
}