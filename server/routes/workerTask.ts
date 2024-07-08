import { redisClient } from "../redis";
import { commandOptions } from "redis";
import { redisTasks } from "./addRecipe";

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

}


