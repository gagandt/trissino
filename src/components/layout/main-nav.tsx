"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { siteConfig } from "@/app/config/site";

const NavItems: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <nav
      className={cn(
        "hidden text-sm md:flex md:items-center md:gap-6",
        isMobile && "flex flex-col md:hidden",
      )}
    >
      <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
        {/* <Image src="/logo.webp" alt="" width={64} height={64} /> */}
        {/* < className="h-6 w-6" /> */}
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </nav>
  );
};

export function MainNav() {
  return (
    <div className="mr-4 md:flex">
      <Link href="/" className="mr-6 hidden items-center space-x-2 md:flex">
        {/* <Image src="/logo.webp" alt="" width={40} height={40} /> */}
        {/* < className="h-6 w-6" /> */}
        <h1 className="mx-0 max-w-[43.5rem] text-balance text-3xl font-semibold tracking-tighter">

          {siteConfig.name}
        </h1>
      </Link>
      <NavItems isMobile={false} />
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="size-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <NavItems isMobile={true} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
