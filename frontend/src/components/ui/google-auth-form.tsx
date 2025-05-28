"use client";

import { authWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Result } from "@/types/result";
import { useState } from "react";

const GoogleAuthForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res: Result = await authWithGoogle();
      if (!res.success) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <form onSubmit={handleSocialLogin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Continue with Google"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAuthForm;
