// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
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

  const url = new URL(req.url);
  const pathname = url.pathname;
  const parts = pathname.split("/");
  const team_id = parts[2];

  const params = url.searchParams;
  const offset = Number(params.get("offset"));
  const limit = Number(params.get("limit"));
  const status = params.get("status");
  const author = params.get("author");
  const from = params.get("from");
  const to = params.get("to");
  const search = params.get("search");

  let query = supabase
    .from("products_with_author")
    .select("*")
    .eq("team_id", team_id);

  if (status) {
    query = query.eq("status", status);
  }

  if (author) {
    query = query.eq("author", author);
  }

  if (from && to) {
    query = query.gte("created_at", from).lte("created_at", to);
  }

  if (search?.trim()) {
    query = query.textSearch("search", search.trim(), {
      type: "websearch",
      config: "english",
    });
  }

  const { data, error } = await query.range(offset, offset + limit - 1);

  console.log(data);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 200, headers });
});
