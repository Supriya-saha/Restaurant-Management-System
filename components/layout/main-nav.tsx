"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideUtensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-16 items-center justify-between px-4 border-b">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <LucideUtensils className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Paapi Pet
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-orange-500",
                pathname === item.href
                  ? "text-orange-500"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/logout">Logout</Link>
        </Button>
      </div>
    </div>
  );
}