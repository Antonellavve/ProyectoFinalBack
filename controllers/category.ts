import { Request, Response } from "express";
import Category, { ICategory } from "../models/category";

export const getAllCategories = async (req: Request, res: Response) => {
	const categories: ICategory[] = await Category.find();
	res.status(200).json({ categories });
	return;
};
export const getCategoryByCode = async (req: Request, res: Response) => {
	const { CODE } = req.params;
	const category: ICategory | null = await Category.findOne({ code: CODE });
	category
		? res.status(200).json({
				category,
		})
		: res.status(404).json({
				msj: "No existe ninguna categoría con ese código",
		});
};


export const createCategory = async (req: Request, res: Response) => {
    try {
        const categoryData: ICategory = req.body;
        const { title, code } = categoryData;

        if (!title || !code) {
            res.json({
                msg: "Faltan datos necesarios"
            });
            return;
        }
// Verificar si ya existe una categoría con el mismo título
        const categoryInDB = await Category.findOne({
            title: title
        });

        if (categoryInDB) {
            res.json({
                msg: "La categoría ya existe en la Base de Datos"
            });
            return;
        }
        
// Crear una nueva categoría
        const newCategory = await Category.create({
            title: title,
            code: code
        });

        res.json({
            msg: "Categoría creada con éxito",
            category: newCategory
        });
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        res.status(500).json({
            msg: "Hubo un error al crear la categoría"
        });
    }
};
