// src/components/profile/ProfileSidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { User, Settings, Shield } from "lucide-react"; // Contoh ikon

// Definisikan item navigasi
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    title: "Account",
    href: "/profile/account",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
  {
    title: "Security",
    href: "/profile/security",
    icon: <Shield className="mr-2 h-4 w-4" />,
  },
];

export function ProfileSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}