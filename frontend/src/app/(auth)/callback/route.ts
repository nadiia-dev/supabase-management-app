import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/onboarding";
  if (!next.startsWith("/")) {
    next = "/onboarding";
  }
  if (code) {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/error`);
    }

    const session = data.session;
    const access_token = session?.access_token;

    if (!access_token) {
      return NextResponse.redirect(`${origin}/error`);
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(access_token);

    if (userError || !user) {
      return NextResponse.redirect(`${origin}/error`);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userData = await res.json();

    if (userData?.data.team_id) {
      next = "/dashboard";
    }

    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";
    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/error`);
}
