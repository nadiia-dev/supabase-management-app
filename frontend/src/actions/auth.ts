import supabase from "@/config/supabase-config";

export const signUpUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: ``,
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
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/update-password`,
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

export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({ password });

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
