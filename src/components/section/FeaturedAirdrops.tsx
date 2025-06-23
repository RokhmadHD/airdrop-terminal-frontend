type AirdropStatus = 'RUMORED' | 'CONFIRMED' | 'LIVE' | 'TESTNET';

interface Airdrop {
    name: string;
    status: AirdropStatus;
    potential: string;
    network: string;
}
const airdrops = [
    { name: 'LayerZero', status: 'RUMORED', potential: 'High', network: 'Omnichain' },
    { name: 'ZkSync', status: 'CONFIRMED', potential: 'High', network: 'Ethereum L2' },
    { name: 'Starknet', status: 'LIVE', potential: 'Medium', network: 'Ethereum L2' },
    { name: 'Fuel', status: 'TESTNET', potential: 'High', network: 'Modular' },
] as Airdrop[];

const statusColors = {
    RUMORED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    LIVE: 'bg-green-500/10 text-green-400 border-green-500/20',
    TESTNET: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export function FeaturedAirdrops() {
    return (
        <section id="airdrops" className="py-20 md:py-24 bg-light dark:bg-dark/80">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Featured Airdrops
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                        A sneak peek at the alpha we&#39;re tracking.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {airdrops.map((airdrop) => (
                        <div key={airdrop.name} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all transform hover:-translate-y-2">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">{airdrop.name}</h3>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[airdrop.status]}`}>
                                        {airdrop.status}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <p>Potential: <span className="font-semibold text-light dark:text-white">{airdrop.potential}</span></p>
                                    <p>Network: <span className="font-semibold text-light dark:text-white">{airdrop.network}</span></p>
                                </div>
                            </div>
                            <button className="w-full mt-6 px-4 py-2 text-sm font-medium border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-colors">
                                View Guide
                            </button>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <p className="text-gray-500">And 50+ more inside... <a href="#" className="text-indigo-400 font-semibold hover:underline">Join to get full access</a>.</p>
                </div>
            </div>
        </section>
    );
}