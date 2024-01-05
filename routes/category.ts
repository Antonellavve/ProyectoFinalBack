import { Router } from "express";
import { createCategory } from "../controllers/category";

const router = Router();

router.post("/", createCategory)

export default router;