import { NextFunction, Request, Response } from "express";
import { ROLESADMIN } from "../helpers/constant";

export const isAdminUser = (req: Request, res: Response, next: NextFunction) => {
	const { rolAdmin } = req.body;

	if (rolAdmin !==ROLESADMIN.admin) {
		res.status(401).json({
			msg: "El usuario no es administrador",
		});
		return;
	}

	next();
};