import { Request, Response } from "express";
import User, {IUser} from "../models/user";
import bcryptjs from "bcryptjs"
import { sendEmail } from "../mailer/mailer";
import randomstring from "randomstring";
import generateJWT from "../helpers/generateJWT";

export const register = async (req: Request, res: Response): Promise<void> =>{
    const {name, email, password}: IUser = req.body;

    const user = new User ({name, email, password})

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

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                success: false,
                msj: "No se encontró el email en la base de datos"
            });
            return;
        }

        if (user.verified) {
            res.status(400).json({
                success: false,
                msj: "El usuario ya está correctamente verificado"
            });
            return;
        }

        if (user.code !== code) {
            res.status(400).json({
                success: false,
                msj: "El código ingresado es incorrecto"
            });
            return;
        }

        const userActualizado = await User.findOneAndUpdate({ email }, { verified: true });

        res.status(200).json({
            success: true,
            msj: "Usuario verificado con éxito"
        });
    } catch (error) {
        console.log('Error en verifyUser:', error);
        res.status(500).json({
            success: false,
            msj: "Error en el servidor"
        });
    }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
    console.log('Inicio de la función logout');

    try {
      res.json({
        success: true,
        message: 'Logout exitoso',
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el servidor al intentar cerrar sesión',
      });
    }
  };