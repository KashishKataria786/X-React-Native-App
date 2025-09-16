import express from 'express'
import { ENV } from './config/env.js';
import cors from 'cors'
import { connectDatabse } from './config/db.js';
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/users', userRouter);

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