import express from 'express'
import { Protectroute } from '../middlewares/auth.middleware.js';
import { createComment, deleteComment, getComment } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.get("/post/:postId", getComment);
commentRouter.post('/post/:postId', Protectroute, createComment);
commentRouter.delete('/:commentId', Protectroute,deleteComment);
export default commentRouter;