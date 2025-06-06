"use server";
import { createClient } from "@/lib/supabase/server";

export const signUpUser = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.CLIENT_URL}/onboarding`,
      },
    });

    if (error) {
      throw error;
    }

    return { success: true, data: null };
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

export const signInUser = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, data: null };
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

export const forgotPassword = async (email: string) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.CLIENT_URL}/update-password`,
    });

    if (error) throw error;

    return { success: true, data: null };
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

export const logoutUser = async () => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { success: true, data: null };
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
