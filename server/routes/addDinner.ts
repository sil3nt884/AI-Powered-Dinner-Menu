import { Request, Response } from "express";
import { client } from '../pg';
import { v4 as uuid } from 'uuid';
import z from 'zod';

const DinnerSchema = z.object({
    recipe_id: z.string(),
    date: z.string().date().optional(),
});


export const addDinner = async (req: Request, res: Response): Promise<void> => {
        try {
            const dinner = req.body
            const dinnerBody = DinnerSchema.parse(dinner);
            const { recipe_id } = dinnerBody;
            const date = new Date();
            const id = uuid();
            const sql = `INSERT INTO weekly_dinner (id,  recipe_id, date)
                         VALUES ($1, $2, $3)`;
            await client.query(sql, [id, recipe_id, date]);

            res.status(200).send({ message : "Dinner added" });
        } catch (e) {
            console.error(e);
            res.status(500).send({message: "Error adding dinner" });
        }



}
