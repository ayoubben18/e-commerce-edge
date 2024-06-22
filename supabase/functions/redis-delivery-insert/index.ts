// import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Redis } from "https://deno.land/x/upstash_redis@v1.14.0/mod.ts";
// import { Database } from "../_shared/database.types.ts";

type CheckoutItemType = {
  id: string;
  image: string | null;
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

// const supabase = createClient<Database>(
//   Deno.env.get("SUPABASE_URL")!,
//   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
// );

const redis = new Redis({
  url: Deno.env.get("REDIS_URL")!,
  token: Deno.env.get("REDIS_TOKEN")!,
});

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { user_id, id } = payload.record;

    const oldCheckoutItems = await redis.get(`user-checkout:${user_id}`);

    if (!oldCheckoutItems) {
      throw new Error("No items in the checkout");
    }

    //change the delivery id to the id from the paloqd
    const updatedCheckoutItems = (oldCheckoutItems as CheckoutItemType[]).map(
      (item: CheckoutItemType) => {
        return {
          ...item,
          status: "placed",
          delivery_id: id,
        };
      },
    );

    await redis.del(`user-checkout:${user_id}`);

    await redis.set(`user-placed:${user_id}/${id}`, updatedCheckoutItems);

    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
