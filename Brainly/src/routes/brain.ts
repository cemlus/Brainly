import express, {Request, Response} from "express"
import { ContentModel, LinkModel, UserModel } from "../db/db";
import { userAuth } from "../utils/middlware";
import { random } from "../utils/random";

export const brainRouter = express.Router();
// @ts-ignore
brainRouter.post('/share', userAuth, async(req: Request, res: Response) => {
    const sharePermission = req.body.sharePermission;

    if(sharePermission){
        const hashh = random(15);
        await LinkModel.create({
            userId: req.userId,
            uniqueHash: hashh
        })
        res.json({
            message: `the unique hash has been generated`,
            hash: hashh
        })
    } else {
        //  when the user wants to disable the URL i.e. make his brain private and not public anymore => sharePermission = false
        await LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: `your brain workspace is now private`
        })
    }
})

brainRouter.get('/:shareLink', async(req: Request, res: Response) => {
    const hashh = req.params.shareLink;
    if(!hashh) {
        res.status(500).json({message: `internal server error`});
        return;
    }
    try {        
        const brainExists = await LinkModel.findOne({
            uniqueHash: hashh.toString()
        })     
        
        if(!brainExists){
            res.status(403).json({ message: `no open sharable brain found`});
            return;            
        }
        // now the hash must exist and we also have the corresponding userId of the user and thus we must now find a way to display the brain
        const content = await ContentModel.find({
            userId: brainExists?.userId
        })
        const user = await UserModel.find({
            _id: brainExists?.userId
        })
        
        res.status(200).json({
            user: user,
            content: content
        })
        
    } catch (error) {
        res.status(403).json({
            message: `an error occured while fetching brain`
        })
    }
})
