import { Request, Response } from "express";
import z from 'zod';
import { client } from '../pg';
import { v4 as uuid } from 'uuid';

const IngredientSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
});

type Ingredient = z.infer<typeof IngredientSchema>;
export const addIngredient = async (req: Request, res: Response): Promise<void> => {
    try{
        const ingredient = req.body
        const ingredientBody = IngredientSchema.parse(ingredient);
        const { name } = ingredientBody;
        const lastId = await client.query('SELECT id FROM ingredients ORDER BY id DESC LIMIT 1');
        const id = lastId.rows[0] ? lastId.rows[0].id + 1 : 1;
        const sql = `INSERT INTO ingredients (id, name)
                     VALUES ($1, $2)`;
        await client.query(sql, [id, name]);
        res.status(200).send({ message: "Ingredient added"});
    }
    catch(e){
        console.error(e);
        res.status(500).send( { message: "Error adding ingredients" });
    }
}
