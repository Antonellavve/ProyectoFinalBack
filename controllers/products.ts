import { Request, Response } from "express"
import Products, {IProducts} from "../models/products";
import Category from "../models/category";

export const getAllProducts = async (req : Request, res : Response)=>{
    const condicion ={
        stock: { $gte: 1 } //mayor o igual que 1
        //{ $gt: 0 } // $gt representa "mayor que"
    }

    const products = await Products.find(condicion)
        .populate( "category", "title")
            // path: "category",
            // select: "title - _id"
        //en este caso le pido el nombre sin el id

        // u otro ejemplo "category", "title"
//populate es para que en lugar de objectId me traiga el nombre de la 
//categoria a la que pertenece el producto
    res.status(200).json({
        products,
    });
    return;
}//no necesita validacion, no se rompe porque siempre me devuelve algo  por el metodo find 
//(que devuelve algo que coincida con la busqueda), y si no devuelve me da un null

export const getProductsById = async (req : Request, res : Response)=>{    
    const {id} = req.params 
    
    const products : IProducts | null = await Products.findOne({id:id})
        .populate("category");
    
    if (!products) {
        res.status(404).json({
            msg: "Id de producto inválido",
        });
        return;
    }

    res.status(200).json({
        products
    });
    return;
}

export const createProducts = async (req : Request, res : Response)=>{
    const productsData: IProducts = req.body;

    const {id, price, category, title, stock} = productsData;

    const categoryData = await Category.findOne({title: category}) 
//validaciones para cuando falta algun dato
    if(!id || !title || !category || !price){
        res.json({
            msg: "Faltan datos necesarios"
        })
        return
    }

    if (!categoryData){
        res.json ({
            msg: "La categoria no esta cargada en la base de datos"
        })
        return
    }

    const productoEnDb = await Products.findOne({id: id})

    if (productoEnDb){
        res.json({
            msg: "El producto ya esta registrado en la base de datos"
        })
        return
    }

    const products = new Products ({
        id,
        price,
        title,
        stock,
        category: categoryData?._id  //lo que le indico es que si * no existe me devolvera null, 
        //ahi reventaria todo, entonces con el ? le digo que si existe lo traiga.
        //lo que se guarda es el id
    });

    await products.save();

    res.json({
        msg: "Producto guardado",
        products
    })
}

export const updateProducts = async (req: Request, res: Response)=>{
    //put si es actualizacion completa
    //patch si es una actualizacion parcial
    const {id} = req.params;

    const { title, img, price, category, ...data } = req.body; 
    //desestructuro todo lo que el usuario no puede cambiar,
    //stock si se cambia cada vez que hace una compra

    const productoEnDb = await Products.findOne({id: id})

    if (!productoEnDb){
        res.status(404).json({
            msg: "El producto no esta en la base de datos"
        })
        return
    }

    const products = await Products.findOneAndUpdate({id: id}, data, {new: true})

    res.status(200).json({
		msg: "Producto actualizado con éxito",
		products,
	});
	return;
}


export const deleteProducts = async (req: Request, res: Response)=>{

    const {id} = req.params;

    const productoEnDb = await Products.findOne({id: id})

    if (!productoEnDb){
        res.json({
            msg: "El producto no esta en la base de datos"
        })
        return
    }
//HARD DELTE
//   const products = await Products.findOneAndDelete({id:id})
    
//SOFT DELETE
    const products = await Products.findOneAndUpdate(
        {id: id},
        {stock: false},
        {new: true}
    )
    res.json({
        products
    })
}