import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";
import SiteFooter from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
      <head>
        <title>Steve - AI-Powered Business Analysis</title>
        <meta name="description" content="Explore Steve's AI-driven business analysis tools for data-driven insights and strategic decision-making." />
        <link rel="icon" href="logo.png" type="image/png" />
      </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistMono.variable,
            GeistSans.variable,
          )}
        >
          <Toaster />

          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <>
                <SiteHeader />

                {children}

                <SiteFooter />
              </>
            </TRPCReactProvider>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
