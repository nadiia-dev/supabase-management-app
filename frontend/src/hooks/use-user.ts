import { createClient } from "@/lib/supabase/client";
import { User } from "@/types/user";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

const supabase = createClient();

async function fetchCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-user`,
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
}

export function useUser(): UseQueryResult<User, Error> {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

async function updateUser({
  full_name,
  avatar_url,
}: {
  full_name?: string;
  avatar_url?: string;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-user`,
    {
      method: "POST",
      body: JSON.stringify({ full_name, avatar_url }),
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
}

export function useUpdateUser(): UseMutationResult<
  any,
  Error,
  { full_name?: string; avatar_url?: string }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      full_name,
      avatar_url,
    }: {
      full_name?: string;
      avatar_url?: string;
    }) =>
      updateUser({
        full_name,
        avatar_url,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
