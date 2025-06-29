'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Airdrop } from "@/lib/types";
import { getAirdrops } from "@/lib/api";
import { ChevronsRight, Network, Zap } from "lucide-react";
import Image from "next/image";


const statusColors: { [key: string]: string } = {
    RUMORED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    FINISHED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const difficultyColors: { [key: string]: string } = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
};

const getAirdropStatus = (airdrop: Airdrop): string => {
    if (!airdrop.is_active) return 'FINISHED';
    if (airdrop.is_confirmed) return 'CONFIRMED';
    return 'RUMORED';
};
export function FeaturedAirdrops() {

    const [airdrops, setAirdrops] = useState<Airdrop[]>([])

    useEffect(() => {
        if (airdrops.length > 0) return;
        const get = async () => {
            const airdrop = await getAirdrops()
            setAirdrops(airdrop)
        }
        get()
    })
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
                    {airdrops.map((airdrop) => {
                        // console.log(airdrop)
                        const status = getAirdropStatus(airdrop);
                        const difficulty = airdrop.difficulty || 'N/A';
                        const difficultyColor = difficultyColors[difficulty as keyof typeof difficultyColors] || 'text-muted-foreground';
                        // console.log(difficultyColor)
                        return (
                            <div key={airdrop.id} className="rounded-xl overflow-hidden flex flex-col group border bg-muted/40 text-card-foreground shadow-sm hover:border-indigo-500/60 transition-all duration-300">
                                {/* Bagian Konten Utama Kartu */}
                                <div className="p-6 flex-grow flex flex-col">
                                    {/* Header: Logo, Nama, Status */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {airdrop.image_url ? (
                                                <Image src={airdrop.image_url} alt={`${airdrop.name} logo`} width={40} height={40} className="rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">
                                                    {airdrop.name.charAt(0)}
                                                </div>
                                            )}
                                            <h3 className="text-md font-bold">{airdrop.name}</h3>
                                        </div>
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
                                            {status}
                                        </span>
                                    </div>

                                    {/* Deskripsi */}
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow truncate">
                                        {airdrop.description || "No description provided."}
                                    </p>

                                    {/* Footer: Network & Difficulty */}
                                    <div className="flex justify-between items-center text-sm border-t pt-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Network size={16} />
                                            <span>{airdrop.network || 'N/A'}</span>
                                        </div>
                                        <div className={`flex items-center gap-2 font-semibold ${difficultyColor}`}>
                                            <Zap size={16} />
                                            <span>{difficulty}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol "View Guide" di Bawah */}
                                <Link
                                    href={`/airdrops/${airdrop.slug}`}
                                    className="block  p-4 text-center font-semibold  border-t border-indigo-500/50 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        View Guide <ChevronsRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className="text-center mt-12">
                    <p className="text-gray-500">And 50+ more inside... <a href="#" className="text-indigo-400 font-semibold hover:underline">Join to get full access</a>.</p>
                </div>
            </div>
        </section>
    );
}