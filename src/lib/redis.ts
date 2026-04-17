import { createClient, RedisClientType } from 'redis';
import { config } from '../config';
import {Logger} from "../helpers/Logger";

let client: RedisClientType | null = null;

export interface IRedisClient extends RedisClientType {
}


export const connectRedis = async (): Promise<IRedisClient | null> => {
    if (config.redis.disabled || !config.redis.uri) {
        Logger.Info('Redis disabled or missing REDIS_URI_WITH_AUTH. Skipping connection.');
        return null;
    }

    if (!client) {
        client = createClient({ url: config.redis.uri });
        client.on('error', (err: unknown) => console.log('Redis Client Error', err));
    }

    await client.connect();
    const isConnected = client.isReady;
    if (isConnected) {
        Logger.Info('Redis Connection Established');
    }
    return client as unknown as IRedisClient;
};

export const redisClient = client;
