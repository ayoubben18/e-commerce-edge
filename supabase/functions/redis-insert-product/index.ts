import { Redis } from "https://esm.sh/@upstash/redis";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { id, general_rating } = payload.record;

    const redis = new Redis({
      url: Deno.env.get("REDIS_URL")!,
      token: Deno.env.get("REDIS_TOKEN")!,
    });

    await redis.set(`product:${id}`, payload.record);
    await redis.zadd("products_by_rating", {
      score: general_rating,
      member: `product:${id}`,
    });
    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
