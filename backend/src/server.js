import express from 'express'
import { ENV } from './config/env.js';
import cors from 'cors'
import { connectDatabse } from './config/db.js';
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comment',commentRouter);

app.use((err,req,res,next   )=>{
    console.error("Unhandled Error",err);
    res.status(500).json({
        error:err.message || "Internal Server Error"
    })
})

const startServer = async()=>{
    try {
        await connectDatabse();
    app.listen(ENV.PORT,()=>{
    console.log(`Server Started At ${ENV.PORT}`.bgBlue)
})
    } catch (error) {
        console.log("Failed to start Server",error.message);
        process.exit(1);
    }
}

startServer();