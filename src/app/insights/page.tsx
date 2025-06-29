// src/app/guides/page.tsx

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/api"; // <-- Import fungsi API kita
import Image from "next/image"; // Untuk menampilkan gambar

export const metadata: Metadata = {
  title: "Guides & Tools | Airdrop Terminal",
  description: "Learn the best strategies and use the right tools to maximize your airdrop rewards.",
};

export default async function GuidesPage() {
  // Ambil data langsung dari backend API kita
  const guides = await getGuides();

  return (
    <section className="container mx-auto py-12">
      {/* Header Halaman (tidak berubah) */}
      <div className="text-center py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Community Insights
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          News, strategies, and deep-dives from our research team.
        </p>
      </div>

      {/* Grid untuk semua panduan */}
      {guides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link href={`/insights/${guide.slug}`} key={guide.id} className="group">
              <Card className="h-full flex flex-col border-0 hover:border py-0 pb-6 border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-xl dark:hover:shadow-indigo-500/10 transition-shadow duration-300">
                {guide.image_url && (
                  <div className="flex-shrink-0">
                    <Image
                      className="h-48 w-full object-cover"
                      src={guide.image_url || '/images/blog/mistakes.png'}
                      alt={guide.title}
                      width={400}
                      height={200}
                    />
                  </div>
                )}
                <CardHeader className="flex-grow">
                  {guide.category && (
                    <p className="text-sm font-semibold text-primary">{guide.category}</p>
                  )}
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No guides published yet. Check back soon!</p>
      )}
    </section>
  );
}