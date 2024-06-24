import { Request, Response } from "express";
import { client } from '../pg';
export const dinners = async (req: Request, resp: Response )=> {
    try {
        const dinnersQuery = await client.query(`
            SELECT DISTINCT ON (DATE(wr.date), r.id) wr.recipe_id, r.name, r.url
            FROM weekly_dinner wr
                     JOIN recipes r ON r.id = wr.recipe_id
            WHERE DATE(wr.date) >= (date_trunc('week', current_date) - INTERVAL '1 day')
              AND DATE(wr.date) < (date_trunc('week', current_date) + INTERVAL '7 days');

        `)
        const dinners = dinnersQuery.rows;
        resp.status(200).send(dinners);
    }
    catch(e) {
        console.error(e);
        resp.status(500).send({ message: "Error getting dinners" });
    }

}
