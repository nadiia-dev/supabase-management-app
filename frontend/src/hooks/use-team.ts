import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

const getUserTeam = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(`http://127.0.0.1:54321/functions/v1/get-user-team`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

export function useTeam() {
  return useQuery({
    queryKey: ["getUserTeam"],
    queryFn: getUserTeam,
    staleTime: 1000 * 60 * 5,
  });
}
