"use client";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import {
  SignedOut,
  ClerkLoading,
  SignInButton,
  SignedIn,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:flex md:max-w-2xl xl:max-w-6xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6">
            <SignedOut>
              <ClerkLoading>
                <Skeleton className="h-8 w-20" />
              </ClerkLoading>
              <SignInButton mode="modal">
                <Button className="w-full">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8">
                  <ClerkLoading>
                    <Skeleton className="h-full w-full rounded-full" />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-full h-full",
                        },
                      }}
                    />
                  </ClerkLoaded>
                </div>
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
