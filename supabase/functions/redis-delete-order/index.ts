import { Redis } from "https://esm.sh/@upstash/redis";

const redis = new Redis({
  url: Deno.env.get("REDIS_URL")!,
  token: Deno.env.get("REDIS_TOKEN")!,
});
type CheckoutItemType = {
  id: string;
  price: number;
  quantity: number;
  color: string | null;
  size: string | null;
  status: string;
  user_id: string;
  order_date: string;
  product_id: string;
  delivery_id: string | null;
  products: {
    name: string;
  };
};
Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { id, user_id } = payload.record;

    const checkout = await redis.get(`user-checkout:${user_id}`);
    // filter the deleted one
    const newCheckout = (checkout as CheckoutItemType[]).filter((item) =>
      item.id !== id
    );

    if (newCheckout.length === 0) {
      await redis.del(`user-checkout:${user_id}`);
      return new Response("ok");
    }

    await redis.set(`user-checkout:${user_id}`, newCheckout);

    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
