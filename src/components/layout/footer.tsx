import Link from 'next/link';
import { Github, Twitter, Send } from 'lucide-react';

const socialLinks = [
    { name: 'Discord', href: '#', icon: Send },
    { name: 'X/Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
];

export function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} CryptoDAO. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        {socialLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <link.icon size={20} />
                                <span className="sr-only">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}