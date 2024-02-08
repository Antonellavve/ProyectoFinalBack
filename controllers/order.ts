import { Request, Response } from "express";
import Order, {IOrder} from "../models/order";
import { ObjectId } from "mongoose";

export const getOrders = async (req: Request, res: Response) =>{
//cuando se genera el token viaja info, y podemos obtener el id del usuario
    const userId: ObjectId = req.body.userConfirmed._id;

    const consulta = {user: userId}

    const orders =await Order.find(consulta)

    res.status(200).json({
        data: [...orders]
    })
}

export const createOrder = async(req: Request, res: Response) =>{
    const userId: ObjectId = req.body.userConfirmed._id;

    const orderData : IOrder = req.body

    const data ={
        ...orderData,
        user: userId, //id del usuario
        createAt: new Date(), //fecha
        status: "pending"
    }

    const order = new Order(data)

    await order.save(), //guardar en BD

    res.status(201).json({ //201 CREADO CON ÉXITO
        order
    })
}