import { BookOpen, Shield, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const beginnerGuides = [
    { title: 'Airdrop 101: How It All Works', description: 'Understand the fundamentals of airdrops, from snapshots to token claims.', icon: BookOpen, href: '#' },
    { title: 'Essential Wallet Security', description: 'Learn how to protect your assets with best practices for your hot wallet.', icon: Shield, href: '#' },
    { title: 'First Steps: On-Chain Interactions', description: 'A practical guide to your first swap, bridge, and liquidity provision.', icon: BarChart2, href: '#' },
];

const advancedStrategies = [
    { title: 'The Art of Sybil Farming', description: 'Strategies for multi-wallet farming while managing risks.', icon: BookOpen, href: '#' },
    { title: 'Gas Fee Optimization Guide', description: 'Techniques to save money on transaction fees across different L1s and L2s.', icon: Shield, href: '#' },
    { title: 'Analyzing Airdrop Criteria', description: 'Learn to "read the minds" of project teams to predict potential airdrop requirements.', icon: BarChart2, href: '#' },
];

export function GuidesSection() {
    return (
        <div className="py-10 md:py-16">
            <div className="container mx-auto px-4">
                {/* Beginner Section */}
                <div className="mb-16">
                    <div className="mb-8 border-b border-gray-300 dark:border-gray-700 pb-4">
                        <h2 className="text-3xl font-bold mb-2">Start Here: Airdrop 101</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Build a strong foundation for your airdrop hunting journey.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {beginnerGuides.map((guide, index) => (
                            <Link href={guide.href} key={index} className="h-full flex flex-col items-center gap-4 bg-light dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-gray-800/10">
                                <div className="flex gap-4 items-center">
                                    <guide.icon className="w-8 h-8 text-indigo-400 mb-4" />
                                    <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Advanced Section */}
                <div>
                    <div className='mb-8 border-b border-gray-300 dark:border-gray-700 pb-4'>
                        <h2 className="text-3xl font-bold mb-2">Pro-Level Strategies</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Level up your farming game with advanced techniques from the pros.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {advancedStrategies.map((guide, index) => (
                            <Link href={guide.href} key={index} className="h-full flex flex-col items-center gap-4 bg-light dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-gray-800/10">
                                <div className="flex gap-4 items-center">
                                    <guide.icon className="w-8 h-8 text-indigo-400 mb-4" />
                                    <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}