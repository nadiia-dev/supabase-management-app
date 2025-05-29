"use client";

import { createTeam, joinTeam } from "@/actions/teams";
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
import { createTeamSchema } from "@/lib/validation";
import { Result } from "@/types/result";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const OnboardingForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
  });

  const onSubmit = async (values: z.infer<typeof createTeamSchema>) => {
    const { name, inviteCode } = values;

    if (!name && !inviteCode) {
      toast("Please enter a team name or an invite code.");
      return;
    }

    if (name && inviteCode) {
      toast("Please enter only one: either a team name or an invite code.");
      return;
    }

    try {
      if (inviteCode) {
        const res: Result = await joinTeam(inviteCode!);
        if (res.success) {
          router.push(`/dashboard`);
        }
      } else if (name) {
        const res: Result = await createTeam(name!);
        if (res.success) {
          toast("Your team was succesfully created!");
          router.push(`/dashboard`);
        }
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
          <CardTitle className="text-2xl">Join or Create a Team</CardTitle>
          <CardDescription>
            Create a new team by entering a team name, or join an existing one
            using an invite code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Team Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter new team name"
                  {...register("name")}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  type="text"
                  placeholder="Enter invite code"
                  {...register("inviteCode")}
                />
                <ErrorMessage
                  errors={errors}
                  name="inviteCode"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <p className="text-sm text-gray-500">
                Please fill <strong>either</strong> the Team Name{" "}
                <strong>or</strong> the Invite Code.
              </p>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
