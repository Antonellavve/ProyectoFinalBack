import User, { IUser } from "../models/user";
import { sendEmail } from "../mailer/mailer";

export const existingEmail = async (email: string): Promise<void> => {
	const existingEmail: IUser | null = await User.findOne({ email });
	//si existe el email y esta verificado
    if (existingEmail && existingEmail.verified){ 
        throw new Error(`El correo electrónico ${email} ya está registrado`);
    }
    //si existe el email pero no esta verificado
    if (existingEmail && !existingEmail.verified){
        await sendEmail (email, existingEmail.code as string)
        throw new Error (`El usaurio ya este registrado. se envio el codigo de verificacion a ${email}`)
    }
    //si no cumple con nignuna sera usuario nueva y no se cumple con ninguna funcion y corre a la registrarse con la sig funcion
};