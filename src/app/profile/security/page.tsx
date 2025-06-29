// src/app/profile/security/page.tsx

import { Separator } from "@/components/ui/separator";
import { ProfileSidebarNav } from "@/components/profile/ProfileSidebarNav";
import { UpdatePasswordCard } from "@/components/profile/UpdatePasswordCard";

export default function SecurityPage() {
  return (
    <div className="container space-y-6 p-10 pb-16 md:block mx-auto">
      {/* Header Halaman */}
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
        <div className="flex-1 lg:max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Bagian Update Password */}
            <div>
              <h3 className="text-lg font-medium">Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password here. Please choose a strong one.
              </p>
            </div>
            <UpdatePasswordCard />

            {/* Di sini Anda bisa menambahkan bagian lain seperti
                - Multi-Factor Authentication (MFA)
                - Active Sessions / Perangkat yang Login
            */}
          </div>
        </div>
      </div>
    </div>
  );
}