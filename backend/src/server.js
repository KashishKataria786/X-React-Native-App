import express from 'express'
import { ENV } from './config/env.js';
import { connectDatabse } from './config/db.js';

const app = express();
connectDatabse();

app.listen(ENV.PORT,()=>{
    console.log("Started Server- PORT 5001".bgBlue)
})