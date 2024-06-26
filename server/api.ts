import dotenv  from 'dotenv';
dotenv.config();
import express from 'express'
import { connect, disconnect } from "./pg";
import { handleAddRecipe } from "./routes/addRecipe";
import  bodyParser  from 'body-parser';
import { getRecipes } from "./routes/getRecipes";
import { addIngredient } from "./routes/addIngredients";
import cors from 'cors';
import { addDinner } from "./routes/addDinner";
import { dinners } from "./routes/dinners";
import { whatsapp } from "./routes/whatsapp";
import {allowedIpAddress} from "./routes/ipAddress";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(allowedIpAddress());
app.use(bodyParser.json());


app.post('/addRecipes', handleAddRecipe);
app.get('/getRecipes', getRecipes);
app.post('/addIngredient', addIngredient);
app.post('/addDinner', addDinner);
app.get('/dinners', dinners);
app.get('/whatsapp', whatsapp);

app.listen(PORT, async () => {
    await connect();
    console.log('Server is running');
});

process.on('SIGINT', async () => {
    await disconnect();
    process.exit();
});

console.log("http://localhost:3000/addRecipes")
console.log("http://localhost:3000/getRecipes")
console.log("http://localhost:3000/addIngredient")
console.log("http://localhost:3000/addDinner")
console.log("http://localhost:3000/dinners")
console.log("http://localhost:3000/whatsapp")
