import {Model, Schema, Types, model} from "mongoose";

interface IShipping {
    name: string;
    email: string;
    dni: number;
    adress: string;
}

interface IItems{
    id: number;
    price: number;
    quantity: number;
    title: string;
}

export interface IOrder{
    create: Date;
    user: Types.ObjectId; //esto quiere decir que este modelo de orden
    //tiene un dato que hace referencia al usuario
    price: number;
    shippingCost: number;
    items: IItems[];
    shippingDetails: IShipping;
    status: string;
    total: number;
}

const OrderSchema = new Schema<IOrder>({
    create: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }, price: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    items: {
        type: [{
            id: {
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            require: true
        },
        dni:{
            type: Number,
            require: true
        },
        address: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required:true
    },
    total: {
        type: Number,
        required: true
    },

})

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema)

export default Order