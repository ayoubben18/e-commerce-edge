import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Database } from "../_shared/database.types.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { rate, product_id } = payload.record;

    const { data: product, error } = await supabase.from("products").select("*")
      .eq(
        "id",
        product_id,
      ).single();

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    const newRating = (product.general_rating * product.rating_count + rate) /
      (product.rating_count + 1);

    const { error: updateError } = await supabase.from(
      "products",
    ).update(
      {
        general_rating: newRating,
        rating_count: product.rating_count + 1,
      },
    ).eq("id", product_id);

    if (updateError) {
      console.log(updateError.message);
      throw new Error(updateError.message);
    }

    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
