import { Redis } from "https://esm.sh/@upstash/redis";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { product_id } = payload.record;

    const redis = new Redis({
      url: Deno.env.get("REDIS_URL")!,
      token: Deno.env.get("REDIS_TOKEN")!,
    });
    console.log(redis);

    const oldComments = await redis.get(`comments:${product_id}`);
    console.log(oldComments);

    if (!oldComments) {
      await redis.set(`comments:${product_id}`, [payload.record]);
      return new Response("ok");
    }
    // @ts-ignore
    await redis.set(`comments:${product_id}`, [...oldComments, payload.record]);
    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
