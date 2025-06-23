import { Button } from "../ui/button";

export function HeroSection() {
    return (
        <section className="relative py-20 md:py-32 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-purple-600/20 dark:bg-indigo-900/50 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 animate-gradient-text bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Your Ultimate Airdrop Terminal
                </h1>
                <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 dark:text-gray-300">
                    Get curated alpha, step-by-step guides, and powerful tools to maximize your airdrop rewards. Never miss a potential gem again.
                </p>
                <Button>
                    Start Farming Now
                </Button>
            </div>
        </section>
    );
}

export default HeroSection
