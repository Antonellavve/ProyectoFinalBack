import {Model, Types, Schema, model} from "mongoose";

export interface IProducts{
    id: number; //en minuscula hace referencia al tipo de dato
    title: string;
    img: string;
    price: number;
    category: Types.ObjectId;
    stock: number;
}

const ProductsSchema = new Schema<IProducts>({
    id:{
        type: Number, //mayusc: hace referencia al constructor del tipo de dato
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: false,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: Schema.Types.ObjectId, //hace referencia a un documento en otro lado
        ref: "Category", //documento dentro de la coleccion Category
        required: true
    },
    stock:{
        type: Number,
        required: true,
    },
})

const Products: Model<IProducts> = model <IProducts>("Products", ProductsSchema);

export default Products;