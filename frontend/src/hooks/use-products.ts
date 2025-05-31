import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";

const supabase = createClient();

interface FilterValue {
  id: string;
  value: string;
}

const getTeamProducts = async (
  team_id: string,
  offset: number,
  limit: number,
  status?: string,
  member?: string
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/functions/v1/get-products/${team_id}?offset=${offset}&limit=${limit}${
      status ? `&status=${status}` : ""
    }${member ? `&author=${member}` : ""}`,
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

export function useProducts(
  team_id: string,
  offset: number,
  limit: number,
  columnFilters?: ColumnFiltersState
) {
  const status = columnFilters?.find((filter) => filter.id === "status") as
    | FilterValue
    | undefined;

  const author = columnFilters?.find((filter) => filter.id === "author") as
    | FilterValue
    | undefined;

  return useQuery({
    queryKey: [
      "getTeamProducts",
      team_id,
      offset,
      limit,
      status?.value,
      author?.value,
    ],
    queryFn: () =>
      getTeamProducts(team_id, offset, limit, status?.value, author?.value),
    enabled: !!team_id,
  });
}
