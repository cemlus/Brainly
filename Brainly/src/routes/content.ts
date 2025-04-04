import { ContentModel } from "../db/db";
import express, {Request, Response} from "express";
import { userAuth } from "../utils/middlware";

export const contentRouter = express.Router();


// @ts-ignore
contentRouter.post('/', userAuth, async(req: Request, res: Response) => {
    const {title, description, cardInfo} = req.body as {title: string , description: string , cardInfo: string};
    const {embeddedLink, contentType, tags} = req.body as {embeddedLink: string, contentType: string, tags: string[]};
    const userId = req.userId;

    if(!embeddedLink || !contentType){
        return res.status(400).json({
            message: 'Please provide all the fields'
        });
    }
    try {
        await ContentModel.create({
            title: title,
            description: description,
            embeddedLink: embeddedLink,
            contentType: contentType,
            tags: tags,
            cardInfo: cardInfo,
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
            })

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