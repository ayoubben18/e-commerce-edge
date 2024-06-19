import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";

import { createClient } from "npm:@supabase/supabase-js@2.42.0";

import { Database } from "../_shared/database.types.ts";

const model = new Supabase.ai.Session("gte-small");

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const payload = await req.json();
  const { description, id } = payload.record;

  // Generate embedding.
  const embedding = await model.run(description, {
    mean_pool: true,
    normalize: true,
  });

  // Store in database.
  const { error } = await supabase
    .from("products")
    .update({ embeddings: JSON.stringify(embedding) })
    .eq("id", id);
  if (error) {
    console.warn(error.message);
    return new Response("Something Went Wrong", { status: 500 });
  }

  return new Response("ok");
});
