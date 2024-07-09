import dotenv  from 'dotenv';
dotenv.config();
import express from 'express'
import { connect, disconnect } from "./pg";
import {handleAddRecipe, redisTasks} from "./routes/addRecipe";
import  bodyParser  from 'body-parser';
import { getRecipes } from "./routes/getRecipes";
import { addIngredient } from "./routes/addIngredients";
import cors from 'cors';
import { addDinner } from "./routes/addDinner";
import { dinners } from "./routes/dinners";
import { whatsapp } from "./routes/whatsapp";
import { allowedIpAddress } from "./routes/ipAddress";
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import {handleTask, sendPushNotifications} from "./routes/workerTask";
import webPush from 'web-push';
import { keys } from './keys';
import {handleSubscription} from "./routes/push";






if (isMainThread) {
     const worker=  new Worker(__filename);

    worker.on('message', async (message) => {
        const { event, task, payload } = message;
        console.log('Message received', message);
        if (event === 'task-started') {
            console.log('Task started', task, payload);
            await redisTasks[task](JSON.parse(payload));
            await sendPushNotifications()
        }
    })


    console.log(keys)
    webPush.setVapidDetails(
    'mailto:your-email@example.com',
        keys.pulbic,
        keys.private
    );

    const app = express();

    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(allowedIpAddress());
    app.use(bodyParser.json());

    const subscriptions = []; // Store subscriptions in a database in a real application

// Endpoint to save the subscription
    app.post('/subscribe', handleSubscription);
    app.post('/addRecipes', handleAddRecipe);
    app.get('/getRecipes', getRecipes);
    app.post('/addIngredient', addIngredient);
    app.post('/addDinner', addDinner);
    app.get('/dinners', dinners);
    app.get('/whatsapp', whatsapp);

    app.listen(PORT, async () => {
        console.log('Server is running');
        await connect();
        console.log('Connected to database');

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
} else {
    setInterval(async () => {
        try {
            await handleTask();
        }
        catch (e) {
            console.error(e);
        }
    }, 1000);
}