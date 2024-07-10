import { redisClient } from "../redis";
import { commandOptions } from "redis";
import { client } from '../pg';
import webPush from "web-push";
import { parentPort } from 'node:worker_threads';


export const sendPushNotifications = async () => {
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
                console.log("Push notifications sent")
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
        const args = task.args;

        console.log('Task', taskName, args)
        parentPort?.postMessage({
                event: 'task-started',
                task: taskName,
                payload: args
        })
}


