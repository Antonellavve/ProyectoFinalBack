import { Request, Response } from "express";
import User, {IUser} from "../models/user";


export const register = async (req: Request, res: Response): Promise<void> =>{
    const {nombre, email, password}: IUser = req.body;

    const user = new User ({nombre, email, password})

    res.json ({
        user
    })
}