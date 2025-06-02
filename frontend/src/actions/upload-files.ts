"use server";

import { createClient } from "@/lib/supabase/server";

export const uploadImages = async (file: File, bucketname: string) => {
  const supabase = await createClient();
  try {
    const formattedName = file.name
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "_")
      .toLowerCase();
    const filename = new Date().getTime() + formattedName;
    const { data, error } = await supabase.storage
      .from(bucketname)
      .upload(filename, file);
    if (error) throw new Error(error.message);

    const url = await supabase.storage.from(bucketname).getPublicUrl(filename);
    return {
      success: true,
      data: url.data.publicUrl,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
};
