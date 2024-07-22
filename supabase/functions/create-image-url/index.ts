import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Database } from "../_shared/database.types.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { id, full_path } = payload.record;

    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(`${full_path}`);

    const { error } = await supabase.from("products_images").update({
      image_url: data.publicUrl,
    }).eq("id", id);

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    return new Response("ok");
  } catch (error) {
    console.error(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
});
