import { Request, Response } from "express";
import {addUser, getUserByEmail} from "../queries/userQueries";
import {IUser} from "../models/UserModel";
import bcrypt from "bcrypt";

const createNewUser = async (req: Request, res: Response)  => {
    try{
        const { name, email, password } = req.body;

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

    res.json({ message: 'Login successful' });
}

const checkSession = (req: Request, res: Response) => {
    if (req.session.user) {
        return res.json({ isLoggedIn: true, user: req.session.user });
    } else {
        return res.json({ isLoggedIn: false });
    }
};

export { createNewUser, loginUser, checkSession };