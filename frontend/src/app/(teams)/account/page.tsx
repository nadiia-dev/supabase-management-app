"use client";

import { uploadImages } from "@/actions/upload-files";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { updateUserSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name || "",
        email: user.email || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user, form]);

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    console.log(values);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const newUrl = await uploadImages(file, "avatars");

      form.setValue("avatar_url", newUrl?.data);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-4 md:w-1/3">
              <Label htmlFor="picture" className="text-sm leading-none">
                Avatar
              </Label>
              {form.watch("avatar_url") && (
                <Avatar className="h-30 w-30 rounded-lg overflow-hidden">
                  <AvatarImage
                    src={
                      form.watch("avatar_url") || "https://placehold.co/400x400"
                    }
                    alt={user?.full_name || "user avatar"}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              )}
              <div>
                <Input id="picture" type="file" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
