import { Request, Response } from "express"
import Category, { ICategory } from "../models/category"

export const createCategory = async (req: Request, res: Response)=>{
    
    const categoryData : ICategory = req.body

    const {title} = categoryData;

    const category = new Category (categoryData);

    await category.save();

    res.json({
        msg: "Categoria guardada",
        category
    })
}