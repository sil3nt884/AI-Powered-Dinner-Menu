import { Request, Response } from "express";
import { client } from '../pg';
export const dinners = async (req: Request, resp: Response )=> {
    try {
        const dinnersQuery = await client.query(`
            SELECT * FROM weekly_dinner_view
        `)
        const dinners = dinnersQuery.rows;
        resp.status(200).send(dinners);
    }
    catch(e) {
        console.error(e);
        resp.status(500).send({ message: "Error getting dinners" });
    }

}
