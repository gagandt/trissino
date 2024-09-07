"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginFailed() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-400 to-pink-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <motion.div
                className="flex items-center justify-center text-center text-3xl font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <AlertCircle className="mr-2 mt-1 h-6 w-6 text-red-500" />
                Login Failed
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.p
              className="text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              We{"'"}re sorry, but we couldn{"'"}t log you in. Please check the
              following:
            </motion.p>
            <motion.ul
              className="list-inside list-disc text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <li>Your username or email is correct</li>
              <li>Your password is correct</li>
              <li>
                Your account hasn{"'"}t been locked due to multiple failed
                attempts
              </li>
              <li>There are no network connectivity issues</li>
            </motion.ul>
            <motion.div
              className="flex flex-col space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => {
                  router.refresh();
                }}
                variant="default"
              >
                Try Again
              </Button>
              <Button variant="outline">
                <Link href="/">Go Home</Link>
              </Button>
              <Button variant="ghost">
                <Link href="/support">Contact Support</Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
