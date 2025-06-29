// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserProvider";
import { getFollowedAirdrops } from "@/lib/api";
import { Airdrop } from "@/lib/types";
import { useRouter } from "next/navigation";
import { AirdropPageComponent } from "@/components/page/airdrop/airdrop"; // Gunakan ulang komponen ini!
import Link from "next/link";

export default function ProfilePage() {
    const { user, session, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const [followedAirdrops, setFollowedAirdrops] = useState<Airdrop[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isUserLoading) return;
        if (!user) {
            router.push("/auth/login");
            return;
        }

        async function loadFollowedAirdrops() {
            if (session) {
                try {
                    const data = await getFollowedAirdrops(session.access_token);
                    setFollowedAirdrops(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        loadFollowedAirdrops();
    }, [user, session, isUserLoading, router]);

    return (
        <div className="container py-8 mx-auto">
            <header className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="">
                    <h1 className="text-3xl font-bold mb-2">My Followed Airdrops</h1>
                    <p className="text-muted-foreground mb-8">
                        Here are all the airdrops you are currently tracking.
                    </p>
                </div>
                <div className="">
                    <Link href='/settings' target="_blank" rel="noopener noreferrer">Settings</Link>
                </div>
            </header>

            {/* Kita bisa gunakan ulang komponen daftar airdrop yang sudah ada! */}
            <AirdropPageComponent initialAirdrops={followedAirdrops} isLoading={isLoading || isUserLoading}/>
        </div>
    );
}