import { User } from "../models/user.model.js";
import { APIerror } from "../utils/APierror.js";
import jwt from "jsonwebtoken"

export const verifyJWT = async (req, _ , next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
  
      if (!token) {
        throw new APIerror(401, "Unauthorized request");
      }
  
      const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      const user = await User.findById(decodedtoken?._id).select(
        "-password"
      );
      if (!user) {
        throw new APIerror(401, "Invalid Access Token");
      }
  
      req.user = user;
      next();
    } catch (error) {
      throw new APIerror(401, error?.message || "Invalid access token");
    }
  };