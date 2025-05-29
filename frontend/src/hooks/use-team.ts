import { getUserTeam } from "@/actions/teams";
import { Result } from "@/types/result";
import { useEffect, useState } from "react";

export function useTeam(userId: string | null) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchTeam = async () => {
      const res: Result = await getUserTeam();

      if (res.data) {
        setTeam(res.data);
      }

      setLoading(false);
    };

    fetchTeam();
  }, [userId]);

  return { team, loading };
}
