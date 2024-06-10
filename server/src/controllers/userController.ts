import { Request, Response } from "express";
import {addUser, getUserByEmail} from "../queries/userQueries";
import {IUser} from "../models/UserModel";
import jwt from "jsonwebtoken";

const createNewUser = async (req: Request, res: Response)  => {
    try{
        const { name, email, password } = req.body;

        const user = await getUserByEmail(email);

        if(user){
            return res.status(400).send("User already exists");
        }
        const newUser: IUser = {name, email, password};
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

    if(password !== user.password){
        return res.status(401).send('Invalid Password');
    }

    const token = jwt.sign({ userId: user.id }, 'secret');

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
    });

    res.json({ message: 'Login successful' });
}

export { createNewUser, loginUser };