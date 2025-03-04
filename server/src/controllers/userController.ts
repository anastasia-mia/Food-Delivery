import { Request, Response } from "express";
import {addUser, getUserByEmail, getUserInfo} from "../queries/userQueries";
import {IUser} from "../models/UserModel";
import bcrypt from "bcrypt";
import 'express-session';

declare module 'express-session' {
    interface Session {
        user: { userId: number; name: string };
        guestId?: string
    }
}

const createNewUser = async (req: Request, res: Response)  => {
    try{
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }

        const user = await getUserByEmail(email);

        if(user){
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = {name, email, password: hashedPassword};
        await addUser(newUser);

        res.status(201).send('User Created Successfully');
    }catch{
        res.status(500).send('Error Creating User');
    }
}

const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await getUserByEmail(email);

    if(!user){
        return res.status(400).send("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid Password');
    }

    req.session.user = { userId: user.id, name: user.name };

    const userInfo = await getUserInfo(user.id);

    res.json({
        message: 'Login successful',
        user: { userId: user.id, name: user.name, email: userInfo.email}
    });
}

const checkSession = async(req: Request, res: Response) => {
    if (req.session.user) {
        const { userId, name } = req.session.user;
        const { email } = await getUserInfo(userId);

        return res.status(200).json({ isLoggedIn: true, user: { userId, name, email } });
    } else {
        res.status(401).send({message: 'Unauthorised'});
    }
};

const logoutUser = (req:Request, res:Response) => {
    if(req.session.user){
        req.session.destroy((err) => {
            if(err){
                res.status(500).json({message: "Error logging out"});
            }else{
                res.clearCookie("connect.sid");
                res.status(200).json({message: "User logged out"});
            }
        })
    }else{
        res.status(400).json({message: "User is not logged in"});
    }
}

export { createNewUser, loginUser, checkSession, logoutUser};