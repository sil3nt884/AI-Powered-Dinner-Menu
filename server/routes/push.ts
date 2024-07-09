import {Request, Response} from "express";
import { client } from '../pg';





export const handleSubscription = async (req: Request, res: Response) => {
    try {
        const subscription = req.body;
        const {endpoint, expirationTime, keys} = subscription;
        await client.query('INSERT INTO pushsubscription (endpoint, keys) VALUES ($1, $2, $3)', [endpoint, expirationTime, keys]);


        res.status(201).json({});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Error saving subscription"});
    }
}