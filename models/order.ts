import {Model, Schema, Types, model} from "mongoose";

interface IShipping {
    name: String;
    cellphone: String;
    location: String
    address: String;
}

interface IItem{
    id: Number;
    price: Number;
    quantity: Number;
    title: String;
}

export interface IOrder{
    create: Date;
    user: Types.ObjectId; //esto quiere decir que este modelo de orden
    //tiene un dato que hace referencia al usuario
    price: Number;
    shippingCost: Number;
    items: IItem[];
    shippingDetails: IShipping;
    status: String;
    total: Number;
}

const OrderSchema = new Schema<IOrder>({
    create: { //la fecha de creada la orden, y es now. la data de esto 
        //no la envia el front, el resto si.
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId, //cuando guardo el object id le tengo que decir
        ref:'User', //a que coleccion hace referencia.
        required: true
    }, 
    price: {
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
        cellphone:{
            type: String,
            require: true
        },
        location: {
            type: String,
            required: true,
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

});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order