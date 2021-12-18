import config from 'config';
import { createClient } from 'redis';

const EXPIRATION = config.get('redis.expiration') as number;

const client = createClient();

const redis = {
  client,
  async set(key: string, value: string, expiration: number = EXPIRATION) {
    if (!client.isOpen) await client.connect();

    return await client.set(key, value, { EX: expiration });
  },
  async get(key: string) {
    if (!client.isOpen) await client.connect();

    return await client.get(key);
  }
}

export default redis;