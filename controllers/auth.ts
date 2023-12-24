import { Request, Response } from "express";
import User, {IUser} from "../models/user";
import bcryptjs from "bcryptjs"
import { sendEmail } from "../mailer/mailer";
import randomstring from "randomstring";
import generateJWT from "../helpers/generateJWT";

export const register = async (req: Request, res: Response): Promise<void> =>{
    const {nombre, email, password}: IUser = req.body;

    const user = new User ({nombre, email, password})

    const salt = bcryptjs.genSaltSync()
    // "salt" se combina con la contraseña para crear 
    //un hash único y más seguro que se almacena en la base de datos.
    user.password = bcryptjs.hashSync(password,salt) //se crea el password encriptado
    //hashea (encripta) la contraseña del usuario utilizando el salt generado, 
    //y se asigna la contraseña encriptada a la propiedad password del objeto user
    
    const newCode = randomstring.generate(6)

    user.code = newCode;

    await user.save(); 
    //recien aca es que mongoose guarda la data, una vez que se pasan todos los pasos.

    await sendEmail(email, newCode);

    res.status(201).json ({
        user
    })
}

export const login = async (req: Request, res: Response): Promise<void> =>{
    const {email, password}: IUser = req.body;

    try{
        const user =await User.findOne({email})
        if (!user){
            res.status(400).json({
                msj:" No se encontro el email en la base de datos"
            })
            return;
        }

        //en este caso se va a comparar el passw que tenemos en la bd con la que ingresa el usuario
        //recordando que el pass esta encriptado, y si la validacion resulta falsa me tira el error y el msj.
        const validarPass = bcryptjs.compareSync(password, user.password)
        if(!validarPass){
            res.status(400).json({
                msj: "La contraseña es incorrecta"
            }) 
            return;
        }

        //si la validacion resulta correcta, no entra en el bloque anterior y pasa a este
        //en donde se generaria un token, que es el que tiene la info del user
        const token = await generateJWT (user.id)
        res.json({
            user,
            token,
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            msj: "Error en el servidor"
        })        
    }
}

//en ambos casos se debieron chequear(check del auth de routes) para entrar en estas funciones

export const verifyUser = async (req: Request, res: Response): Promise<void> =>{
    const { email, code} = req.body

    try{
        const user =await User.findOne({email})

        if (!user){
            res.status(400).json({
                msj: "No se encontro el email en la base de datos"
            })
            return;
        }

        if (user.verified){
            res.status(400).json({
                msj: "El usuario ya esta correctamente verificado"
            })
            return;
        }

        if(user.code !== code){ //si el codigo ingresado por el usuario es diferente al codigo que tengo..
            res.status(401).json({
                msj: "El codigo ingresado es incorrecto"
            })
            return;
        }

        const userActualizado = await User.findOneAndUpdate({email}, {verified: true})

        res.status(200).json({
            msj: "Usuario verificado con exito"
        })


    }catch (error){
        console.log(error);
        res.status(500).json({
            msj: "Error en el servidor"
        })        
    }
}