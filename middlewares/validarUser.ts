import { NextFunction, Request, Response } from "express";

export const isVerifiedUser = (req: Request, res: Response, next: NextFunction) => {
    const { verified } = req.body.userConfirmed;

    if (!verified) {
        res.status(401).json({
            msj: "El usuario no está verificado"
        });
        return;
    }
    next();
};
