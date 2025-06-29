'use client';

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Bell } from "lucide-react";
import { useUser } from "@/contexts/UserProvider";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { UserNav } from "./user-nav";
import { NotificationPanel } from "./NotificationPanel";


// import { UserNav } from "./user-nav";

export function Header() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Airdrops", href: "/airdrops" },
        { name: "Guides & Tools", href: "/guides-tools" },
        { name: "Alpha Hub", href: "/alpha-hub" },
        { name: "Insights", href: "/insights" },
    ];
    const { user, isLoading } = useUser();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-light/80 dark:bg-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                        AirdropEarly
                    </Link>

                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-dark dark:hover:text-white transition-colors">
                                {item.name}
                            </Link>
                        ))}
                        <Link href="#">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105">
                                Join Alpha
                            </button>
                        </Link>

                    </nav>

                    <div className="flex items-center space-x-2">
                        <NotificationPanel />
                        <ThemeToggle />

                        {isLoading ? (
                            // Tampilkan skeleton saat loading
                            <Skeleton className="h-8 w-8 rounded-full" />
                        ) : user ? (
                            // Tampilkan UserNav jika sudah login
                            <UserNav user={user} />
                            // <></>
                        ) : (
                            // Tampilkan tombol Login jika belum login
                            <Button asChild>
                                <Link href="/auth/login">Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* Menu mobile juga bisa disesuaikan jika perlu */}
        </header>
    );
}
