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

  const body = await req.json();
  const { code } = body;

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("invite_link", code)
    .single();

  if (teamError || !team) {
    return new Response(
      JSON.stringify({ error: teamError?.message || "Team not found" }),
      {
        status: 404,
      }
    );
  }

  const { error: joinError } = await supabase
    .from("users")
    .update({ team_id: team.id })
    .eq("id", user.id);

  if (joinError) {
    return new Response(JSON.stringify({ error: joinError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data: team }), { status: 200 });
});
