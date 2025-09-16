import express from "express";
import {
  getPosts,
  getPost,
  getUserPosts,
  createPost,
  likeAPost,
  deletePost,
} from "../controllers/post.controller.js";
import { Protectroute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
const postRouter = express.Router();

// public Routes
postRouter.get("/", getPosts);
postRouter.get("/:postId", getPost);
postRouter.get("/user/:username", getUserPosts);

// Protected Routes
postRouter.post("/", Protectroute, upload.single("image"), createPost);
postRouter.post("/:postId/like", Protectroute, likeAPost);
postRouter.delete("/:postId", Protectroute, deletePost);

export default postRouter;
