import { Redis } from "https://esm.sh/@upstash/redis";
import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Database } from "../_shared/database.types.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const redis = new Redis({
  url: Deno.env.get("REDIS_URL")!,
  token: Deno.env.get("REDIS_TOKEN")!,
});

type ImageCache = {
  name: string;
  path: string;
  url: string;
};

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { name, bucket_id } = payload.record;

    if (bucket_id !== "images") {
      throw new Error("Invalid Bucket");
    }

    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(`${name}`);

    const [productId, imageName] = name.split("/");

    const imageCache = {
      name: imageName,
      path: name,
      url: data.publicUrl,
    };

    const productImages: ImageCache[] | null = await redis.get(
      `images:${productId}`,
    );

    if (productImages) {
      await redis.set(`images:${productId}`, [...productImages, imageCache]);
    } else {
      await redis.set(`images:${productId}`, [imageCache]);
    }

    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
});
