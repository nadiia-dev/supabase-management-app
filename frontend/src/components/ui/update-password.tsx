"use client";

import { updatePassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Values = {
  password: string;
};

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>();

  const handleUpdatePassword = async (values: Values) => {
    try {
      const res = await updatePassword(values.password);
      if (res.success) {
        toast("Your password was successfully updated");
      } else {
        toast(res.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleUpdatePassword)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  {...register("password")}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save new password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
