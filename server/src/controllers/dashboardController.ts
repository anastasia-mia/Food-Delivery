import { Request, Response } from 'express';

const dashboard = (req: Request, res: Response) => {
    console.log(req.session)
    if (!req.session.user) {
        return res.status(401).send('Please log in');
    }

    res.send(`You are logged in`);
    return res.json(req.session)
};

export { dashboard };