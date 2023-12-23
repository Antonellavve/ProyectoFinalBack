import { Router } from "express";
import { login, register } from "../controllers/auth";
import { check } from "express-validator";
import {existingEmail} from "../helpers/validatorsDB"
import { collectErrors } from "../middlewares/collectErrors";


const router = Router();

//primer ruta para registrar usuario
router.post('/register', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check ("password", "La contraseña debe ser de 6 caracteres").isLength({min:6}),
    //validacion custom
    check ("email").custom(existingEmail),
    //middleware custom
    collectErrors,

], register) //*

router.post("/login",
[
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres").isLength({min:6}),
    collectErrors,
],login) //*luego de que pasa los check, entra en la funcion del auth de los controladores 

export default router