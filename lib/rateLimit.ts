import redis from './redis';

export async function rateLimit(ip: string, key: string, limit = 20, windowSec = 60) {
  const redisKey = `ratelimit:${key}:${ip}`;
  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.expire(redisKey, windowSec);
  }
  if (count > limit) {
    return false;
  }
  return true;
}
