import { getAuth } from "@clerk/express";
import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ errror: "User not Found" });

  const notification = await Notification.find({ to: user._id })
    .sort({ created: -1 })
    .populate("from", "username firstName lastName profilePicture")
    .populate("post","content image")
    .populate("comment", "content");

  return res.status(200).json({ notification });
});

export const deleteNotification = asyncHandler(async (req, res) => {
    const {userId} = getAuth(req);
    const {notificationId}= req.params;
    const user = await User.findOne({clerkId:userId});
    if (!user) return res.status(404).json({ errror: "User not Found" });

    const notification = await Notification.findOneAndDelete({
        _id:notificationId,
        to:user._id
    })

    if(!notification)return res.status(404).json({error:"Notification Not Found"});

    return res.status(200).json({message:"Notification Deleted Successfully"})

});
