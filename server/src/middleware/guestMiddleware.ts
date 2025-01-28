import {v4 as uuidv4} from 'uuid';
import {Request, Response, NextFunction} from "express";

export const ensureGuestId = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user && !req.session.guestId){
        req.session.guestId = uuidv4();
    }

    next();
}