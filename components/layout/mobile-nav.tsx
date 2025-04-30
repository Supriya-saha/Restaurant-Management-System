"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideMenu, LucideX, LucideUtensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <LucideMenu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <LucideUtensils className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Paapi Pet
            </span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="p-1 h-auto"
          >
            <LucideX className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-base font-medium transition-colors px-2 py-1 rounded-md hover:bg-muted",
                pathname === item.href
                  ? "text-orange-500 font-semibold"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}