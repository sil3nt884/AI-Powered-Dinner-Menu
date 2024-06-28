import {client} from "../pg";
import {Request, Response} from "express";
import z from 'zod';

const RecipeSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    url: z.string(),
    owner: z.string(),
    possible_ingredients: z.array(z.string()),
    best_effort_ingredients: z.array(z.string()),
    ingredients: z.array(z.string()),
    uncleaned_ingredients: z.array(z.string()),
    searchQueries: z.array(z.string()),
    created_at: z.string().optional(),

});

export type RecipeData = z.infer<typeof RecipeSchema>;

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const recipesQuery = await client.query(`
            with recipes_with_ingredients as (
            SELECT   r.url,
                     r.id,
                     r.name,
                     r.owner,
                     gr.best_effort_ingredients,
                     gr.ingredients,
                     gr.uncleaned_ingredients
            FROM recipes AS r
            JOIN generated_recipes AS gr ON r.id = gr.recipe_id),
                 recipes_with_best_match_ingredients AS (
                 SELECT 
                     url,
                     name,
                     owner,
                     ri.id,
                     ri.best_effort_ingredients,
                     ri.ingredients,
                     ri.uncleaned_ingredients,
                     ARRAY(
                           SELECT ingredient
                           FROM (
                           SELECT ingredient, COUNT(*) as count
                            FROM (
                                  SELECT LOWER(UNNEST(best_effort_ingredients)) AS ingredient
                                  UNION ALL
                                  SELECT LOWER(UNNEST(ingredients))
                                  UNION ALL
                                  SELECT LOWER(UNNEST(uncleaned_ingredients))
                                  ) ALL_INGREDIENTS
                                     GROUP BY ingredient
                                     ORDER BY count DESC
                                  ) ingredient_counts
                                WHERE count >= 2
                            ) AS possible_ingredients
                     FROM recipes_with_ingredients ri
                 )
            SELECT *
            FROM recipes_with_best_match_ingredients
        `)
        const recipes = recipesQuery.rows;
        const recipesWithIngredients = recipes.map(recipe => {
            const ingredients = [...new Set<string>([...recipe.ingredients.map((e: string) => e.toLowerCase()), ...recipe.possible_ingredients.map((e: string) => e.toLowerCase())])];
            return {
                id: recipe.id,
                url: recipe.url,
                name: recipe.name,
                owner: recipe.owner,
                ingredients,
                searchQueries: ingredients.map(ingredient => `${new URL(`https://www.tesco.com/groceries/en-GB/search?query=${ingredient}`).toString()}`),
            }
        });
        res.status(200).send(recipesWithIngredients);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error getting recipes" });
    }
}
