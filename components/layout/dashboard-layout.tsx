"use client";

import { useState, useEffect } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideLogOut, LucideUtensils } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";

const navItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Orders", href: "/admin/orders" },
  { title: "Menu", href: "/admin/menu" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "waiter";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  // Simulate user loading
  useEffect(() => {
    // In a real app, you would fetch the user data from an API
    setUser({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: role,
      avatar: "https://github.com/shadcn.png",
    });
  }, [role]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <div className="md:hidden">
            <MobileNav items={navItems} />
          </div>
          <div className="flex items-center md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <LucideUtensils className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Paapi Pet
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:gap-2 md:ml-4">
            <Link href="/" className="flex items-center space-x-2">
              <LucideUtensils className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Paapi Pet
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive"
                  asChild
                >
                  <Link href="/logout" className="flex w-full items-center">
                    <LucideLogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[200px] md:block">
          <SidebarNav role={role} />
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}