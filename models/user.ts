import {Model, Schema, model} from "mongoose";
import { ROLESADMIN } from "../helpers/constant";

export interface IUser{
    name: string;
    email: string;
    password: string;
    rolAdmin?: string;
    code?: string;
    verified?: boolean;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rolAdmin: {
		type: String,
        default: ROLESADMIN.user
	},
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
})

//para evitar enviar al cliente informacion que no necesita ver, por ejemplo los datos que le envio.
//el objeto se va a ir filtrando apartir de los valores que le pongo en la funcion
UserSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...user } = this.toObject();
    return user;
}

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;

//IUser > interface del usuario