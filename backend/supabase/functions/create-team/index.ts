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
  const { name } = body;

  const inviteCode = Math.random().toString(36).slice(2, 10).toUpperCase();

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({ team_name: name, invite_link: inviteCode, owner_id: user.id });

  if (teamError) {
    return new Response(JSON.stringify({ error: teamError.message }), {
      status: 500,
    });
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

  return new Response(JSON.stringify({ team }), { status: 200 });
});
