import User, { IUser } from "../models/user";

export const existingEmail = async (email: string): Promise<void> => {
	const user: IUser | null = await User.findOne({ email });
	
    if (user) throw new Error(`El correo electrónico ${email} ya está registrado`);
};