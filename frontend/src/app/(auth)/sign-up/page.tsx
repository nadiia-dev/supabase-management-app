import GoogleAuthForm from "@/components/auth/google-auth-form";
import { SignUpForm } from "@/components/auth/sign-up-form";

const Page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-2 text-center w-full max-w-sm">
        <SignUpForm />
        <p>or</p>
        <GoogleAuthForm />
      </div>
    </div>
  );
};

export default Page;
