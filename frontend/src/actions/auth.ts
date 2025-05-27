import supabase from "@/config/supabase-config";

export const signUpUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: ``,
      },
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
