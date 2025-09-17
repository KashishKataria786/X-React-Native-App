import express from 'express'
import { ENV } from './config/env.js';
import cors from 'cors'
import { connectDatabse } from './config/db.js';
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import notificationRouter from './routes/notification.route.js'
import { arcjetMiddleware } from './middlewares/arcjet.middleware.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/notification', notificationRouter);

app.get("/", (req, res) => res.send("Hello from server"));
app.use((err,req,res,next   )=>{
    console.error("Unhandled Error",err);
    res.status(500).json({
        error:err.message || "Internal Server Error"
    })
})

if (ENV.NODE_ENV !== 'production') {
  const startServer = async () => {
      await connectDatabse();
      app.listen(ENV.PORT, () => {
        console.log(`Server started at ${ENV.PORT}`);
      });
  };
  startServer();
}


// Vercel only 
export default app