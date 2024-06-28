import {client} from '../pg';
import {Request, Response} from "express";
import z from 'zod';
import {v4 as uuid} from 'uuid';
import { bestEffortExtractIngredients,  getTextFromHtml} from "../HtmlPasrer";
import ollama from "ollama";
import { redisClient } from "../redis";
import {RedisCommandArgument } from "@redis/client/dist/lib/commands";
import {commandOptions} from "redis";





export const extractIngredients = async (text: string): Promise<string[] | undefined> => {
    try {
        const response = await ollama.generate({
            model: 'llama3',
            format: 'json',
            prompt: `extract ingredients from given text ${text} reply with only the extracted ingredients response should be a JSON object with the key "ingredients" and the value being an array of strings`,
        });
        console.log('Extracted ingredients json', response);
        const jsonResponse = JSON.parse(response.response)
        const ingredientsKey = Object.keys(jsonResponse)[0]
        return jsonResponse[ingredientsKey];
    }
    catch (e) {
        console.error(e);
    }
}

const RecipeSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    url: z.string().url(),
    owner: z.union([
        z.literal('Jacob'),
        z.literal('Ricky'),
        z.literal('Leo'),
    ]),
    created_at: z.string().optional(),

});

export type Recipe = z.infer<typeof RecipeSchema>;

const createRecipe =  async (recipe: Recipe) => {
    await addRecipe(recipe);
    await generateRecipe();
}

const redisTasks = {
    createRecipe
}





export const addRecipe = async (recipe: Recipe): Promise<void> => {
    const {name, url, owner} = recipe;
    const id = uuid();
    const sql = `INSERT INTO recipes (id, name, url, owner ,created_date)
                 VALUES ($1, $2, $3, $4, $5)`;
    await client.query(sql, [id, name, url, owner, Date.now()]);
}


const enqueueTask = async ({ task,args }: { task: any, args: string }) => {
    const redis = await redisClient().getClient();
    const payload  = JSON.stringify({taskName: task, args});
    const key: RedisCommandArgument = 'tasks';
    const element: RedisCommandArgument = payload;
    await redis.rPush(key, element);
}






export const handleTask = async () => {
    const redis = await redisClient().getClient();
    const results = await redis.blPop(commandOptions({ isolated: true }),'tasks', 0)
    const { element } = results;
    const task = JSON.parse(element);
    const taskName = task.taskName;
    const args = task.args;
    console.log('Handling task', taskName);
    await redisTasks[taskName](JSON.parse(args));
    console.log('Task handled', taskName);
}


export const handleAddRecipe = async (req: Request, res: Response) => {
    const recipeBody = req.body
    try {
        const recipe = RecipeSchema.parse(recipeBody);
        await enqueueTask({ task:'createRecipe', args:JSON.stringify(recipe)});
        console.log('Recipe added', recipe.name);
        handleTask();
        res.status(202).send({ message: "Recipe added"});
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error adding recipe" });
    }
}

const cleanExtractedIngredients = async (extractedIngredients: string[], cleanedIngredientsRegexp: RegExp[]): Promise<string[]> => {
    let cleanedIngredients: string[] = [];

    for (let ingredient of extractedIngredients) {
        let words = ingredient.split(' ');
        let cleanedIngredient = words.filter(word => {
            return cleanedIngredientsRegexp.some(regex => regex.test(word));
        }).join(' ');

        if(cleanedIngredient !== ''){
            cleanedIngredients.push(cleanedIngredient);
        }
    }

    return cleanedIngredients;
};

const generateRecipe = async () => {
    try {
        const lastAddedRecipeQuery = await client.query('SELECT * FROM recipes ORDER BY created_date DESC LIMIT 1');
        console.log('Selected Recipe', lastAddedRecipeQuery);
        const lastAddedRecipe: Recipe = lastAddedRecipeQuery.rows[0];
        const url = lastAddedRecipe.url;
        const text = await getTextFromHtml(url)
        const ingredients = await extractIngredients(text);
        console.log('Extracted ingredients', ingredients);
        if (Array.isArray(ingredients)) {
            const removeSymbols = ingredients.filter((ingredient: string) => ingredient.match(/\w+/)?.length ?? 0 > 0);

            const ingredientsListQuery = await client.query('SELECT * FROM ingredients');
            const ingredientsList = ingredientsListQuery.rows;
            const cleanedIngredientsRegexp = ingredientsList.map((ingredient) => {
                return new RegExp(ingredient.name, 'gi');
            });
            const cleanedIngredients = await cleanExtractedIngredients(removeSymbols, cleanedIngredientsRegexp);
            const removeSymbolsIng = cleanedIngredients.filter((ingredient: string) => ingredient.match(/\w+/)?.length ?? 0 > 0);
            const uniqueIngredients = [...new Set(removeSymbolsIng)];
            const bestEffortExtractIngredientsList = await bestEffortExtractIngredients(url);
            const id = uuid();
            await client.query(`INSERT INTO generated_recipes (id, name, ingredients, recipe_id, uncleaned_ingredients,
                                                               best_effort_ingredients)
                                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    id,
                    lastAddedRecipe.name,
                    uniqueIngredients,
                    lastAddedRecipe.id,
                    removeSymbols,
                    bestEffortExtractIngredientsList
                ]);
            console.log('Recipe generated', lastAddedRecipe.name);
        }
    } catch (e) {
        console.log('Failed to generate recipe', e);
    }
}

