import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, {IUser} from "../models/user";

const validarToken = async (req: Request, res: Response, next: NextFunction): Promise <void>=>{
    const token = req.headers ["x-token"] as string; //el front me manda el token
    //a traves del header y se llama "x-token" y le digo que lo tomo como string

    if(!token){
        res.status(401).json({
            msj: "Se debe ingresar un token válido"
        })
        return;
    }

     try{ //verificacion del JWT ingresado
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload;
//mi payload va a ser la verificacion de ese token desencriptado con mi clave secreta
        const {id} = payload;
        const userConfirmed : IUser | null = await User.findById(id);
// cuando buscamos un solo usuario en la bd y no existe, moongose me duvuelve un null.
// pero cuando buscamos varios y no hay, devuelve un array vacio
        if(!userConfirmed){
            res.status(401).json({
                msj: "El usuario no se encuntra en la BD"
            })
            return;
        }

        req.body.userConfirmed = userConfirmed;
        req.body.id = id;
        next();

    }catch (error){
        console.log(error);
        res.status(401).json({
            msj: "Token inválido"
        })
        
    }
}

export default validarToken;

//CONCLUSION: 1, VEO QUE EXISTE EL TOKEN, VERIFICO, Y AL CONTROLADOR LE LLEGA LA DATA DEL USER CONFIRMADO. AHORRANDO
//EL LLAMADO NUEVAMENTE A LA BD