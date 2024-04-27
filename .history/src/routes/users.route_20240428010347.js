import { logInUser, registerUser } from "../controllers/Users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  editPost,
  postImageOrVideos,
} from "../controllers/posts.controllers.js";
import { Router } from "express";

export const router = Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.post("/login", logInUser);

router.post("/post",upload.fields([
      {
        name: "Image",
      },
      {
        name: "Video",
      },, postImageOrVideos),
  router.post(
    "/editPost",
    upload.fields([
      {
        name: "Image",
      },
      {
        name: "Video",
      },
    ]),
    editPost
  );
