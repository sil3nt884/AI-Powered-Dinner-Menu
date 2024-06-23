import { Request, Response } from "express";
import { client } from '../pg';
export const whatsapp = async (req: Request, resp: Response )=> {
    try {
        const dinnersQuery = await client.query(`
            SELECT DISTINCT ON (DATE(wr.date), r.id) wr.recipe_id, r.name, r.url
            FROM weekly_dinner wr
                     JOIN recipes r ON r.id = wr.recipe_id
            WHERE wr.date > NOW() - INTERVAL '7 days';
        `)
        const dinners = dinnersQuery.rows;
        resp.status(200).send(
            `Dinners for the week are: <br> ${dinners.map((d, index) => ` <br> ${index + 1}. ${d.name} <br>`).join("")}`
        );
    }
    catch(e) {
        console.error(e);
        resp.status(500).send("Error getting dinners");
    }

}
