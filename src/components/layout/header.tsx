import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Bell } from "lucide-react";


export function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Airdrops", href: "/airdrops" },
    { name: "Guides & Tools", href: "/guides-tools" },
    { name: "Alpha Hub", href: "/alpha-hub" },
    { name: "Blog", href: "/blog" },
  ];
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
                        <button className='p-2 rounded-full bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-800'>
                            <Bell size={18} className='text-gray-500 dark:text-gray-400' />
                        </button>
                        <ThemeToggle/>

                        {/* <div className="md:hidden ml-2">
                            <button  className="p-2">
                                <span className="sr-only">Open menu</span>
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Menu mobile juga bisa disesuaikan jika perlu */}
        </header>
  );
}
