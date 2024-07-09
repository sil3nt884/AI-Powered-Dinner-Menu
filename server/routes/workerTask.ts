import { redisClient } from "../redis";
import { commandOptions } from "redis";
import { redisTasks } from "./addRecipe";
import { client } from '../pg';
import webPush from "web-push";


const sendPushNotifications = async () => {
        try {
                const subscriptionsResults = await client.query('SELECT * FROM pushsubscription');
                const subscriptions = subscriptionsResults.rows;


                const notificationPayload = {
                        title: "New Recipe Added",
                        body: "New recipe added to the database"
                }

                await Promise.all(
                    subscriptions.map(sub => webPush.sendNotification(sub, JSON.stringify(notificationPayload)))
                )

        }
        catch (e) {
                console.error(e);
        }

}


export const handleTask = async () => {
        const redis = await redisClient().getClient();
        const results = await redis.blPop(commandOptions({ isolated: true }),'tasks', 0)
        const { element } = results;
        const task = JSON.parse(element);
        const taskName = task.taskName;
        if(!redisTasks[taskName]) {
            console.log('Task not found', taskName);
            return;
        }
        const args = task.args;
        await redisTasks[taskName](JSON.parse(args));
        await sendPushNotifications();

}


