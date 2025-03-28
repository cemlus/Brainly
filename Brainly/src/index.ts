import express, {Request, Response} from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";        // install dotenv package to use .env file for environment variables 
dotenv.config();                 // load the .env file
import cors from "cors";

import userRouter from "./routes/user"; // import the userRouter from the user.ts file 
import { contentRouter } from "./routes/content";
import { brainRouter } from "./routes/brain";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // get the PORT from .env file or use 3000 as default

const app = express();
app.use(express.json());
app.use(cors());

const serverStart = async() :Promise<void> => {
    const mongoURI = process.env.MONGO_URI; 
    if(!mongoURI){  
        console.error(`Error: MONGO_URI is not defined in the .env file`);
        return;
    }
    try {
        const dbconnection = await mongoose.connect(mongoURI);          
        if(dbconnection){
            app.listen(PORT, () => {
                console.log(`Database has been connected and the server is running on port: ${PORT}`);  
            })
        } else {
            console.log(`Error in connecting to the database`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        
    }
}
serverStart();

app.use('/api/v1/user', userRouter);   // use the userRouter for user routes 

app.use('/api/v1/content', contentRouter); 

app.use('/api/v1/brain', brainRouter);

app.post('/api/v1/brain/share', (req, res) => {

})

app.get('/api/v1/brain/:shareLink', (req, res) => {

})

