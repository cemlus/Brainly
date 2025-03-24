import { ContentModel } from "../db/db";
import express, {Request, Response} from "express";
import { userAuth } from "../utils/middlware";
import ts from "typescript";

export const contentRouter = express.Router();


// @ts-ignore
contentRouter.post('/', userAuth, async(req: Request, res: Response) => {
    const {title, description} = req.body as {title: string , description: string};
    const {link, type} = req.body as {link: string, type: string};
    const userId = req.userId;

    if(!title || !description || !link || !type){
        return res.status(400).json({
            message: 'Please provide all the fields'
        });
    }
    try {
        await ContentModel.create({
            title: title,
            description: description,
            link: link,
            contentType: type,
            tags: [],
            userId: userId
        });
        return res.json({
            message: 'Content created successfully'
        });
    } catch (error) {
        res.status(403).json({
            message: 'Error in creating content',
            error: error
        });
    }
    
})

// @ts-ignore
contentRouter.get('/', userAuth, async(req: Request, res: Response) => {
    const userId = req.userId;
    if(!userId){
        return res.status(403).json({
            message: 'Invalid user'
        });
    } else {
        try {
            const content = await ContentModel.find({
                userId: userId
            }).populate('userId', 'username');
            res.status(200).json({
                message: 'Content fetched successfully',
                content: content
            });
        } catch (error) {
            res.status(403).send({
                message: 'Error in fetching content',
                error: error
            })
        }
    }
})
// ws7pcse3u8d317k

// @ts-ignore
contentRouter.delete('/', userAuth, async (req: Request, res: Response) => {
    const {contentId} = req.body as {contentId : string};
    const userId = req.userId;
    if(!contentId || !userId){
        return res.status(400).json({
            message: 'Please provide all the fields'
        });
    } else {
        try {
            await ContentModel.deleteOne({
                _id: contentId,
                userId: userId
            })
            res.json({
                message: 'Content deleted successfully'
            });
        } catch (error) {
            res.status(403).json({
                message: 'Error in deleting content',
                error: error
            });
        }
    }
})