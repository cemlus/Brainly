import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../db/db';
dotenv.config();

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the user route'
    });
})

userRouter.post('/signup', async (req: Request, res: Response) => {

    // add zod validation and hash the password
    const { username, password } = req.body as { username: string; password: string };
    try {
        await UserModel.create({
            username: username,
            password: password
        });
        // add different status codes for different scenarios like 201 for created and 400 for bad request etc
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(403).json({
            message: 'User already exists',
            error: error
        });
    }
});

userRouter.post('/signin',async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };
    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    });
    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.USER_JWT_SECRET as string, {expiresIn: '1h'});
        res.json({
            message: `Signin for ${username} successful`,
            token: token
        });
    } else {
        res.status(403).json({
            message: 'Invalid username or password'
        });
    }

})

export default userRouter;