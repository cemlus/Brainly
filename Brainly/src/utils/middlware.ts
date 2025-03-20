import jwt from "jsonwebtoken";
import express ,{ Request, Response, NextFunction } from "express";
import dotenv from "dotenv";        // install dotenv package to use .env file for environment variables 
dotenv.config();   

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const userAuth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            message: 'Token not provided'
        });
    } else {
        try {
            // Use the synchronous version of jwt.verify
            const decoded = jwt.verify(token, process.env.USER_JWT_SECRET as string) as { id: string };

            if (decoded && decoded.id) {
                req.userId = decoded.id; // Assign the userId to the request object
                next(); // Proceed to the next middleware or route handler
            } else {
                return res.status(403).json({
                    message: "Invalid token payload",
                });
            }
        } catch (error) {
            res.status(403).json({
                message: 'Invalid token'
            });
        }
    }
}