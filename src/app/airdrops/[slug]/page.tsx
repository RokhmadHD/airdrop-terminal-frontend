// src/app/(airdrops)/[slug]/page.tsx

import { getAirdropBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Zap, Network, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CommentSection } from "@/components/section/CommentSection";
import { FollowButton } from "@/components/page/airdrop/FollowButton.tsx";

// Fungsi untuk generate metadata dinamis (bagus untuk SEO)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const airdrop = await getAirdropBySlug(slug);

  if (!airdrop) {
    return {
      title: "Airdrop Not Found",
    };
  }

  return {
    title: `${airdrop.name} Airdrop Details`,
    description: airdrop.description || `Complete guide for the ${airdrop.name} airdrop.`,
  };
}

// Komponen untuk menampilkan satu info item
function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

// Halaman utama
export default async function AirdropDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const airdrop = await getAirdropBySlug(slug);

  // Jika airdrop tidak ditemukan (API mengembalikan null), tampilkan halaman 404
  if (!airdrop) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const status = !airdrop.is_active ? 'Finished' : airdrop.is_confirmed ? 'Confirmed' : 'Rumored';

  return (
    <div className="container mx-auto max-w-[90rem] py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Header Halaman */}
          <header className="mb-8 flex flex-col sm:flex-row items-start gap-6">
            {airdrop.image_url ? (
              <Image
                src={airdrop.image_url}
                alt={`${airdrop.name} logo`}
                width={128}
                height={128}
                className="rounded-xl border-4 border-background shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center font-bold text-4xl">
                {airdrop.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <Badge variant={status === 'Confirmed' ? "default" : "secondary"} className="mb-2">{status}</Badge>
              <div className="flex gap-3 my-2">
                <h1 className="text-4xl font-extrabold tracking-tight">{airdrop.name}</h1>
                <p className="mt-2 text-lg text-muted-foreground">${airdrop.token_symbol}</p>
              </div>
              <FollowButton airdropId={airdrop.id} />
              {airdrop.project_url && (
                <Button asChild variant="link" className="px-0">
                  <Link href={airdrop.project_url} target="_blank" rel="noopener noreferrer">
                    Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </header>

          {/* Grid Informasi Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoItem icon={Network} label="Network" value={airdrop.network} />
            <InfoItem icon={Zap} label="Difficulty" value={airdrop.difficulty} />
            <InfoItem icon={CheckCircle} label="Value (USD)" value={airdrop.estimated_value_usd ? `$${airdrop.estimated_value_usd}` : 'N/A'} />
            <InfoItem icon={Calendar} label="Start Date" value={formatDate(airdrop.start_date)} />
            <InfoItem icon={Clock} label="End Date" value={formatDate(airdrop.end_date)} />
            <InfoItem icon={Badge} label="Category" value={airdrop.category} />
          </div>

          {/* Deskripsi dan Langkah-langkah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About this Airdrop</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>{airdrop.description || "No detailed description available."}</p>
                  {airdrop.token_contract_address && (
                    <p><strong>Token Contract:</strong> <code>{airdrop.token_contract_address}</code></p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Participation Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  {airdrop.participation_steps && airdrop.participation_steps.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-4">
                      {airdrop.participation_steps.map((step) => (
                        <li key={step.step} className="text-sm">
                          <span>{step.instruction}</span>
                          {step.link && (
                            <Button asChild variant="link" size="sm" className="px-1">
                              <Link href={step.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific steps provided.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="container max-w-4xl mx-auto">
          <CommentSection target={{ airdropId: airdrop.id }} />
        </div>
      </div>
    </div>
  );
}