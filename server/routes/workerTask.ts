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

function promiseRace<T>(promise: Promise<T>, ms: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                        reject(new Error(`Promise timed out after ${ms} milliseconds`));
                }, ms);

                promise.then(
                    (value) => {
                            clearTimeout(timeoutId);
                            resolve(value);
                    },
                    (error) => {
                            clearTimeout(timeoutId);
                            reject(error);
                    }
                );
        });
}
export const handleTask = async () => {
        const redis = await redisClient().getClient();

        if (!redis.isOpen) { return }

        const results = await promiseRace<any>(redis.blPop(commandOptions({ isolated: true }), 'tasks', 0), 2000)

        if (!results) { return }

        const { element } = results;
        const task = JSON.parse(element);
        const taskName = task.taskName;
        const args = task.args;


        parentPort?.postMessage({
                event: 'task-started',
                task: taskName,
                payload: args
        })
}


