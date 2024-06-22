import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Redis } from "https://esm.sh/@upstash/redis";
import { Database } from "../_shared/database.types.ts";

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

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const redis = new Redis({
  url: Deno.env.get("REDIS_URL")!,
  token: Deno.env.get("REDIS_TOKEN")!,
});

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const {
      product_id,
      user_id,
      size,
      color,
      quantity,
      status,
      price,
      delivery_id,
    } = payload.record;

    if (delivery_id) {
      return new Response("ok");
    }

    const { data, error } = await supabase.from("products").select("name").eq(
      "id",
      product_id,
    ).single();

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    const oldCheckoutItems = await redis.get(`user-checkout:${user_id}`);

    if (!oldCheckoutItems) {
      await redis.set(`user-checkout:${user_id}`, [{
        ...payload.record,
        products: { name: data.name },
      }]);
      return new Response("ok");
    }

    // find for those who has the same product_id and user_id and size and color
    const isExist = (oldCheckoutItems as CheckoutItemType[]).find((
      item: CheckoutItemType,
    ) =>
      item.product_id === product_id && item.user_id === user_id &&
      item.size === size && item.color === color && item.status === status
    );

    // if it exists just update the quantity in the redis cache
    if (isExist) {
      const updatedCheckoutItems = (oldCheckoutItems as CheckoutItemType[]).map(
        (item: CheckoutItemType) => {
          if (
            item.product_id === product_id && item.user_id === user_id &&
            item.size === size && item.color === color && item.status === status
          ) {
            return {
              ...item,
              price: price,
              quantity: quantity,
            };
          }
          return item;
        },
      );
      await redis.set(`user-checkout:${user_id}`, updatedCheckoutItems);
      return new Response("ok");
    }

    // @ts-ignore
    await redis.set(`user-checkout:${user_id}`, [...oldCheckoutItems, {
      ...payload.record,
      products: { name: data.name },
    }]);
    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
