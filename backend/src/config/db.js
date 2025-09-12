import mongoose from 'mongoose'
import { ENV } from './env.js';
import colors from 'colors'
export const connectDatabse=async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Connected to Database!".bgGreen)
    } catch (error) {
        console.log("Error connecting to mongoDb".bgRed)
        process.exit(1);
    }
}