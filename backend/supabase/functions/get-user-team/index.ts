import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return new Response("Invalid token", { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("team_id")
    .eq("id", user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
});
