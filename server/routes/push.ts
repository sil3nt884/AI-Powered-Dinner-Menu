import {Request, Response} from "express";

export const handleSubscription = async (req: Request, res: Response) => {

    const subscription = req.body;

    console.log(subscription);

    res.status(201).json({});
}