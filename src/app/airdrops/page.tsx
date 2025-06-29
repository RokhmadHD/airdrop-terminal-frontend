// src/app/(airdrops)/page.tsx

import {AirdropPageComponent} from "@/components/page/airdrop/airdrop";
import { getAirdrops } from "@/lib/api";

// import { ExternalLink } from "lucide-react";



// Halaman Utama Daftar Airdrop
export default async function AirdropsPage() {
  const airdrops = await getAirdrops();

  return (
    <>
            <div className="relative text-center py-16 md:py-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-purple-600/20 dark:bg-indigo-900/50 rounded-full blur-3xl -z-10"></div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Airdrop Opportunities
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    Search, filter, and find your next big airdrop.
                </p>
            </div>
            <AirdropPageComponent initialAirdrops={airdrops}/>
        </>
  );
}