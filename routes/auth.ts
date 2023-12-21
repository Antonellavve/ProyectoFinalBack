import { Router } from "express";
import { register } from "../controllers/auth";
import { check } from "express-validator";
import {existingEmail} from "../helpers/validatorsDB"
import { collectErrors } from "../middlewares/collectErrors";


const router = Router();

router.post('/register', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmpty(),
    check ("password", "La contraseña debe ser de 6 caracteres").isLength({min:6}),
    //validacion custom
    check ("email").custom(existingEmail),
    //middleware custom
    collectErrors,

], register)

export default router