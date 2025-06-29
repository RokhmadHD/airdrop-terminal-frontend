// src/app/profile/page.tsx

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/api";
import { UpdateProfileForm } from "@/components/profile/UpdateProfileForm";
import { Separator } from "@/components/ui/separator";
import { ProfileSidebarNav } from "@/components/profile/ProfileSidebarNav";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const profile = await getProfile(user.id);
    // Jika profil belum ada karena trigger belum berjalan, tampilkan pesan.
    if (!profile) {
        return (
            <div className="container py-12 text-center">
                <p className="text-muted-foreground">Profile data is being created. Please check back in a moment.</p>
            </div>
        );
    }

    return (
        <div className="container space-y-6 p-10 pb-16 md:block mx-auto">
            {/* Header Halaman Profil */}
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and profile information.
                </p>
            </div>

            <Separator className="my-6" />

            {/* Konten Utama dengan Layout Dua Kolom */}
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">

                {/* Kolom Kiri: Navigasi */}
                <aside className="-mx-4 lg:w-1/5">
                    <ProfileSidebarNav />
                </aside>

                {/* Kolom Kanan: Konten */}
                <div className="flex-1 mx-auto lg:max-w-2xl">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium">Profile</h3>
                            <p className="text-sm text-muted-foreground">
                                This is how others will see you on the site.
                            </p>
                        </div>
                        <Separator />
                        <UpdateProfileForm profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
}