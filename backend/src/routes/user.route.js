import { getUserProfile, updateProfile , syncUser, getCurrentUser, followUser} from "../controllers/user.controller.js";
import express from "express";
import { Protectroute } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get('/profile/:username',getUserProfile);

userRouter.post('/sync',Protectroute,syncUser);
userRouter.post('/me',Protectroute,getCurrentUser);
userRouter.put('/profile',Protectroute,updateProfile);
userRouter.post('/follow/:targetUserId',Protectroute,followUser);

export default userRouter;