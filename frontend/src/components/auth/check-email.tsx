"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";

const CheckEmail = () => {
  const [checking, setChecking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const checkVerification = async () => {
    setChecking(true);
    const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      console.log("No active session found.");
      setChecking(false);
      return;
    }

    const isConfirmed = !!sessionData.session.user?.email_confirmed_at;

    if (isConfirmed) {
      setIsVerified(true);
    } else {
      setChecking(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkVerification();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVerified) {
      router.push("/sign-in");
    }
  }, [isVerified]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          Check your email
        </h1>
        <p className="text-gray-700 mb-6">
          We sent a confirmation link to your email. Please click the link to
          verify your address.
        </p>

        <Button onClick={checkVerification} disabled={checking}>
          {checking ? "Checking..." : "I verified my email"}
        </Button>
      </div>
    </div>
  );
};

export default CheckEmail;
