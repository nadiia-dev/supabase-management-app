"use client";

import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient();

export function useCheckAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let sessionCheckAttempts = 0;
    const maxAttempts = 20;

    const checkForSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        setSession(session);
        setIsLoading(false);
        return;
      }

      sessionCheckAttempts++;

      if (sessionCheckAttempts >= maxAttempts) {
        setIsLoading(false);
        return;
      }
      setTimeout(checkForSession, 500);
    };

    checkForSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setSession(session);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, isLoading };
}
