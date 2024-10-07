"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export const LoginSuccess: React.FC<{
  code: string;
  redirect: string;
}> = ({ code, redirect }) => {
  useEffect(() => {
    toast.success("Login Success, Redirecting to VSCode");
    window.open(redirect, "_self");
  }, [redirect]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full">
          <CardHeader>
            <motion.h1
              className="text-center text-2xl font-bold text-primary sm:text-3xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              Successfully created API Key
            </motion.h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.p
              className="text-center text-sm text-muted-foreground sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              You{"'"}re almost there! Redirecting you to VSCode...
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="mb-2 text-lg font-semibold sm:text-xl">
                Login Failed on VSCode?
              </h2>
              <p className="mb-2 text-sm text-muted-foreground sm:text-base">
                If you{"'"}re having trouble logging in on VSCode, you can use
                the code below:
              </p>
              <div className="relative flex flex-col items-start overflow-hidden rounded-md bg-muted p-4 sm:flex-row sm:items-center">
                <code className="mb-2 flex-1 overflow-x-auto whitespace-nowrap text-sm sm:mb-0 sm:mr-2">
                  {code}
                </code>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    toast.promise(navigator.clipboard.writeText(code), {
                      loading: "Copying code...",
                      success: "Code copied!",
                      error: "Failed to copy code",
                    });
                  }}
                >
                  Copy Code
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => {
                  window.open(redirect, "_self");
                }}
                className="w-full"
              >
                Continue to VSCode
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild variant="secondary" className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
