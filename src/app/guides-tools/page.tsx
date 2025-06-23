import type { Metadata } from 'next';
import { ToolsSection } from '@/components/section/ToolsSection';
import { GuidesSection } from '@/components/section/GuidesSection';

export const metadata: Metadata = {
    title: 'Guides & Tools | Airdrop Terminal',
    description: 'Master airdrop hunting with our expert guides and essential tools. Your knowledge base for success in Web3.',
};




export default function GuidesAndToolsPage() {
    return (
        <div className="relative container mx-auto max-w-7xl px-4 py-12">
            {/* <div className="absolute top-0 -left-2/4 -translate-x-1/2 -translate-y-1/2 w-2/3 h-3/4 bg-purple-600/20 dark:bg-indigo-900/50 rounded-full blur-3xl -z-10"></div> */}
            <div className="absolute top-0 -right-5/12 -translate-x-1/2 -translate-y-1/2 w-96  h-96 bg-purple-600/20 dark:bg-indigo-900/50 rounded-full blur-3xl -z-10 "></div>
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                    Knowledge Base
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Your essential resource hub for guides, strategies, and tools to succeed in airdrop hunting.
                </p>
            </div>
            <GuidesSection />

            {/* Bagian TOOLS */}
            <ToolsSection />
        </div>
    );
}