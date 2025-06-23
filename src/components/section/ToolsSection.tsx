import { Compass } from 'lucide-react';
import Image from 'next/image';

const tools = [
    { name: 'Revoke.cash', category: 'Security', description: 'Check and revoke token approvals to protect your wallet from scams.', logo: '/logos/tools/revoke.png', href: 'https://revoke.cash' },
    { name: 'DeBank', category: 'Portfolio Tracker', description: 'A comprehensive dashboard to track all your assets across multiple chains.', logo: '/logos/tools/debank.png', href: 'https://debank.com' },
    { name: 'Bungee', category: 'Bridge Aggregator', description: 'Find the cheapest and fastest route to bridge your funds between networks.', logo: '/logos/tools/bungee.svg', href: 'https://bungee.exchange' },
    { name: 'L2BEAT', category: 'Analytics', description: 'In-depth analysis and risk assessment for various Layer 2 solutions.', logo: '/logos/tools/l2beat.png', href: 'https://l2beat.com' },
];

// Buat folder public/logos/tools/ dan letakkan logo-logo ini di dalamnya.

export function ToolsSection() {
    return (
        <div className="py-10 md:py1-6">
            <div className="container mx-auto px-4">
                <div className="mb-8 border-b border-gray-300 dark:border-gray-700 pb-4">
                    <h2 className="flex items-center gap-3 text-2xl font-bold">
                        <Compass className="text-indigo-400" />
                        Essential Tools
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Essential tools to streamline your airdrop farming workflow.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {tools.map((tool) => (
                        <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" className="group block">
                            <div className="h-full flex items-center gap-4 bg-light dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-gray-800/10">
                                <Image
                                    src={tool.logo}
                                    alt={`${tool.name} logo`}
                                    width={48}
                                    height={48}
                                    className="rounded-full bg-gray-700 flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-lg">{tool.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{tool.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}