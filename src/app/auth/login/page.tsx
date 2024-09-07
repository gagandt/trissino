import { type Metadata } from "next";
import Link from "next/link";

import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account for Palladio AI",
};

export default function AuthenticationPage() {
  const redirectTo = "/api/auth/login";

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 lg:pt-6">
        <ClerkLoading>
          <div className="flex min-h-72">
            <Loader className="m-auto h-8 w-8 animate-spin text-primary" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn
            routing="hash"
            signUpForceRedirectUrl={redirectTo}
            forceRedirectUrl={redirectTo}
          ></SignIn>
        </ClerkLoaded>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
