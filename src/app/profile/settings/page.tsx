// src/app/profile/page.tsx

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/api";
import { UpdateProfileForm } from "@/components/profile/UpdateProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileSidebarNav } from "@/components/profile/ProfileSidebarNav";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const profile = await getProfile(user.id);
    const getInitials = (name?: string) => {
        if (!name) return user.email?.charAt(0).toUpperCase() || "U";
        const names = name.split(' ');
        if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };
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
                        {/* <div className="flex items-center gap-6 mb-8">
                            <Avatar className="h-24 w-24 border-2 rounded-full relative overflow-hidden">
                                <AvatarImage src={profile.avatar_url || user.user_metadata.avatar_url} className="absolute" />
                                <AvatarFallback className="text-3xl">{getInitials(profile.full_name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold">{profile.full_name || 'Anonymous User'}</h1>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                        </div> */}

                        {/* Form Edit Profil diletakkan di sini */}
                        <UpdateProfileForm profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
}