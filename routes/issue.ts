import { Router } from "express"
import { postNewIssue } from "../controllers/issue"
import validarToken from "../middlewares/validarToken"
import { isAdminUser } from "../middlewares/validarRol"
import { check } from "express-validator"
import { collectErrors } from "../middlewares/collectErrors"

const router = Router()

router.post("/",[
    validarToken,
    isAdminUser,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio es obligatoria").not().isEmpty(),
    collectErrors
], postNewIssue)

export default router