import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, {IUser} from "../models/user";

const validarToken = async (req: Request, res: Response, next: NextFunction): Promise <void>=>{
    const token = req.headers ["x-token"] as string;

     if(!token){
        res.status(401).json({
            msj: "No hay token en la petición"
        })
        return;
     }

     try{
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload;

        const {id} = payload;
        const userConfirmed : IUser | null =await User.findById(id);

        if(!userConfirmed){
            res.status(401).json({
                msj: "Token no válido"
            })
            return;
        }

        req.body.userConfirmed = userConfirmed;
        req.body.id = id;
        next();

     }catch (error){
        console.log(error);
        res.status(401).json({
            msj: "Token no válido"
        })
        
     }
}

export default validarToken;