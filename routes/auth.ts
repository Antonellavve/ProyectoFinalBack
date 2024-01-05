import { Router } from 'express';
import { login, register, verifyUser, logout } from '../controllers/auth';
import { check } from 'express-validator';
import { existingEmail } from '../helpers/validatorsDB';
import { collectErrors } from '../middlewares/collectErrors';

const router = Router();

// Ruta para registrar usuario
router.post(
  '/register',
  [
    //middlewares para chequear lo que nos envie el usuario
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    // Validación custom
    check('email').custom(existingEmail),
    // Middleware custom
    collectErrors,
  ],
  register
);

// Ruta para iniciar sesión
router.post(
  '/login',
  [
    //middlewares para chequear lo que nos envie el usuario
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    collectErrors,
  ],
  login
);

// Ruta para verificar usuario
router.patch(
  '/verify',
  [
    //middlewares para chequear lo que nos envie el usuario
    check('email', 'El email es requerido').not().isEmpty(),
    check('code', 'El código de verificación es requerido').not().isEmpty(),
    collectErrors,
  ],
  verifyUser
);
//se usa patch porque vamos a modificar un dato de la BD
// Ruta para cerrar sesión (logout)
router.post('/logout', logout);

export default router;
//definimos la ruta que va a definir a los controladores, tales como 
//registrar, loguear, verificar un usuario y cerrar sesion.

//collectErrors, para recolectar errores por si queda alguno que se agrupe