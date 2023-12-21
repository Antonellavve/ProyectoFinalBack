import {Model, Schema, model} from "mongoose";

export interface IUser{
    nombre: string;
    email: string;
    password: string;
    admin: boolean;
}

const UserSchema = new Schema<IUser>({
    nombre: {
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
    admin: {
		type: Boolean,
		default: false,
	},
})

//para evitar enviar al cliente informacion que no necesita ver, por ejemplo los datos que le envio.
//el objeto se va a ir filtrando apartir de los valores que le pongo en la funcion
UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user } = this.toObject();
    return user;
}

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;

//IUser > interface del usuario