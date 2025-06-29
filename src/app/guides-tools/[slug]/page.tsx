import { getGuideBySlug, getGuides } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, User, Eye } from "lucide-react";

// Menggunakan ReactMarkdown untuk merender konten
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/section/CommentSection"; // Import seksi komentar

// generateStaticParams sudah benar, mengambil data dari API
export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

// generateMetadata sudah benar, mengambil data dari API
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} | Airdrop Terminal`,
    description: guide.description,
    openGraph: {
        images: guide.image_url ? [guide.image_url] : [],
    },
  };
}

// Komponen Halaman Detail
export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  // Helper untuk format tanggal
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  return (
    <>
      <article className="container max-w-3xl mx-auto py-8 sm:py-12">
        {/* Header Artikel */}
        <header className="mb-8">
          <Link 
            href="/guides-tools" // Arahkan kembali ke halaman Knowledge Base
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Knowledge Base
          </Link>
          
          {guide.category && <Badge variant="secondary">{guide.category}</Badge>}
          
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {guide.title}
          </h1>
          
          <p className="mt-4 text-lg text-muted-foreground">
            {guide.description}
          </p>

          {/* Metadata Penulis dan Tanggal */}
          <div className="mt-6 flex items-center space-x-4 text-sm text-muted-foreground">
            {guide.author_id && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={guide.author_id.avatar_url} />
                  <AvatarFallback>{guide.author_id.full_name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <span>{guide.author_id.full_name || 'Anonymous'}</span>
              </div>
            )}
            {guide.published_at && (
              <>
                <Separator orientation="vertical" className="h-5" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(guide.published_at)}</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Gambar Utama Artikel */}
        {guide.image_url && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden border">
            <Image src={guide.image_url} alt={guide.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Konten Utama (Markdown) */}
        {guide.content && (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />,
                img: ({node, ...props}) => <img {...props} className="rounded-lg border" />,
                h2: ({node, ...props}) => <h2 {...props} className="text-2xl font-bold mt-8 mb-4 border-b pb-2" />,
                h3: ({node, ...props}) => <h3 {...props} className="text-xl font-bold mt-6 mb-3" />,
              }}
            >
              {guide.content}
            </ReactMarkdown>
          </div>
        )}
      </article>

      {/* Seksi Komentar */}
      <div className="container max-w-3xl mx-auto pb-12">
        <CommentSection target={{guideId: guide.id}} />
      </div>
    </>
  );
}