//se construye una ruta que esta consume un controlador, y luego para usarla la tenemos que subir a la instancia, 
// la levantamos en el servidor
import { Router } from "express";
import { getOrders, createOrder } from "../controllers/orders"
import validarToken from "../middlewares/validarToken"
import { collectErrors } from "../middlewares/collectErrors";
import { isVerifiedUser } from "../middlewares/validarUser";
import { check } from "express-validator";


const router = Router();

router.get ("/", [validarToken, collectErrors], getOrders);

router.post("/", [
    validarToken,
    isVerifiedUser,
    check ("price", "El precio es obligatorio").not().isEmpty(),
    check ("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check ("total", "El total es obligatorio").not().isEmpty(),
    check ("shippingDetails", "Los detalles de envio con onbligatorios").not().isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    collectErrors
],createOrder)

export default router;