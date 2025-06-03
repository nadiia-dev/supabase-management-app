"use server";

import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";

export const createProductAction = async (data: Product) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/create-product`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  } else {
    return json.data;
  }
};

export const getProductAction = async (id: string) => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/get-product/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  } else {
    return json.data;
  }
};

export const updateProductAction = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Product>;
}) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/update-product/${id}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  } else {
    return json.data;
  }
};

export const changeProductStatusAction = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token");
  const data = { status };

  const res = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/change-product-status/${id}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  } else {
    return json.data;
  }
};

export const getTeamProducts = async (
  team_id: string,
  offset: number,
  limit: number,
  status?: string,
  member?: string,
  from?: string,
  to?: string,
  search?: string
) => {
  const supabase = await createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;
    if (!token) throw new Error("No access token");

    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-products/${team_id}`;
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    if (status !== undefined && status !== null)
      params.append("status", status);
    if (member !== undefined && member !== null)
      params.append("author", member);
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (search) params.append("search", search);

    const res = await fetch(`${baseUrl}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return {
      success: true,
      data: { data: json.data, totalCount: json.totalCount },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
