import {createClient, RedisClientType} from "redis";



const awaitRedis = (): Promise<any > => {
    return createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}



export const redisClient = () => {
    let client: any | null = null
    return {
        getClient: async () : Promise<any > => {
            if (!client) {
                client = await awaitRedis()
            }
            return client
        }
    }
}