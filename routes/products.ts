import { Router } from "express";
import { createProducts, deleteProducts, getAllProducts, getProductsById, updateProducts } from "../controllers/products";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductsById);

router.post("/", createProducts);

router.put("/:id", updateProducts);

router.patch("/:id", updateProducts);

router.delete("/:id", deleteProducts)

export default router;

// import { Router } from "express"
// import { postNewIssue } from "../controllers/issue"
// import validarToken from "../middlewares/validarToken"
// import { isAdminUser } from "../middlewares/validarRol"
// import { check } from "express-validator"
// import { collectErrors } from "../middlewares/collectErrors"

// const router = Router()

// router.post("/",[
//     validarToken,
//     isAdminUser,
//     check("title", "El título es obligatorio").not().isEmpty(),
//     check("description", "La descripción es obligatoria").not().isEmpty(),
//     check("price", "El precio es obligatoria").not().isEmpty(),
//     collectErrors
// ], postNewIssue)

// export default router