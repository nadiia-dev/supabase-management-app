import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req: Request) => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return new Response("Unauthorized", { status: 401, headers });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return new Response("Invalid token", { status: 401, headers });
  }

  const body = await req.json();
  const { status } = body;

  const url = new URL(req.url);
  const pathname = url.pathname;
  const parts = pathname.split("/");
  const id = parts[2];

  const { data, error } = await supabase
    .from("products")
    .update({ status })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 200, headers });
});
