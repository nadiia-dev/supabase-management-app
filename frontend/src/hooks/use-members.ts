import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

const getTeamMembers = async (team_id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `http://127.0.0.1:54321/functions/v1/get-members/${team_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
};

export function useMembers(team_id: string) {
  return useQuery({
    queryKey: ["getTeamMembers", team_id],
    queryFn: () => getTeamMembers(team_id),
    enabled: !!team_id,
  });
}
