import { Request, Response } from "express";
import Order, {IOrder} from "../models/order";
import { ObjectId } from "mongoose";

export const getOrders = async (req: Request, res: Response): Promise<void> =>{
//cuando se genera el token viaja info, y podemos obtener el id del usuario
    const userId: ObjectId = req.body.userConfirmed._id;

    const consulta = {user: userId}

    const orders =await Order.find(consulta)

    res.json({
        data: [...orders]
    })
}

export const createOrder = async(req: Request, res: Response): Promise<void> =>{
    const user: ObjectId = req.body.userConfirmed._id

    const orderData : IOrder = req.body

    const data ={
        ...orderData,
        user: user,
        createAt: new Date(),
        status: "pending"
    }

    const order = new Order(data)

    await order.save(),

    res.status(201).json({
        order
    })
}