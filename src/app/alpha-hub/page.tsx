import { CheckCircle, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Join the Alpha Hub | AirdropFarm',
    description: 'Get exclusive access to real-time alpha, premium guides, and a community of elite airdrop hunters.',
};

const benefits = [
    {
        icon: Zap,
        title: "Real-Time Alpha & Alerts",
        description: "Receive instant notifications for new opportunities, snapshot warnings, and claim announcements directly in our private channels."
    },
    {
        icon: CheckCircle,
        title: "Vetted Premium Guides",
        description: "Access our full library of detailed, step-by-step video and text guides that are updated regularly by our research team."
    },
    {
        icon: ShieldCheck,
        title: "Private Community Access",
        description: "Collaborate with fellow elite hunters, ask questions, and share strategies in a scam-free, members-only environment."
    },
];

export default function AlphaHubPage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative text-center py-20 md:py-28 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-50 -z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark to-transparent z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <span className="px-4 py-1 text-sm font-semibold text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/30">
                        Exclusive Access
                    </span>
                    <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
                        You&apos;re One Step Away from <br /> <span className="text-indigo-400">the Inner Circle</span>.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                        The Alpha Hub is our private, members-only space where the real magic happens. Stop hunting alone and start farming with an edge.
                    </p>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-dark py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-white">What You&apos;ll Get Inside:</h2>
                        <div className="space-y-10">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-500 text-white">
                                            <benefit.icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                                        <p className="mt-1 text-gray-400">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Final CTA */}
                        <div className="mt-16 text-center p-8 bg-gray-900/50 border border-indigo-500/30 rounded-lg">
                            <h3 className="text-2xl font-bold text-white">Ready to Join the Elite?</h3>
                            <p className="mt-2 text-gray-400">Your next 100x airdrop could be waiting on the other side.</p>
                            <div className="mt-6">
                                {/* Ganti '#' dengan link Discord/Telegram Anda yang sebenarnya */}
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full md:w-auto text-lg px-8 py-4">
                                        Join the Discord Now
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}