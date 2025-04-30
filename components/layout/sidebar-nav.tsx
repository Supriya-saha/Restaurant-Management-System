"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LucideHome,
  LucideClipboardList,
  LucideUsers,
  LucideSettings,
  LucideLayoutDashboard,
  LucideShoppingBag,
  LucideReceipt,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LucideLayoutDashboard className="mr-2 h-5 w-5" />,
  },
  {
    title: "Menu",
    href: "/admin/menu",
    icon: <LucideShoppingBag className="mr-2 h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <LucideClipboardList className="mr-2 h-5 w-5" />,
  },
  {
    title: "Bills",
    href: "/admin/bills",
    icon: <LucideReceipt className="mr-2 h-5 w-5" />,
  },
  {
    title: "Staff",
    href: "/admin/staff",
    icon: <LucideUsers className="mr-2 h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <LucideSettings className="mr-2 h-5 w-5" />,
  },
];

const waiterNavItems = [
  {
    title: "Home",
    href: "/waiter",
    icon: <LucideHome className="mr-2 h-5 w-5" />,
  },
  {
    title: "Menu",
    href: "/waiter/menu",
    icon: <LucideShoppingBag className="mr-2 h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/waiter/orders",
    icon: <LucideClipboardList className="mr-2 h-5 w-5" />,
  },
];

interface SidebarNavProps {
  role: "admin" | "waiter";
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();
  const items = role === "admin" ? adminNavItems : waiterNavItems;

  return (
    <div className="flex flex-col gap-2 p-4 min-h-screen border-r">
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "hover:bg-muted"
          )}
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}