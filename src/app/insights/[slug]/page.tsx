// src/app/guides/[slug]/page.tsx

import { getGuideBySlug, getGuides } from "@/lib/api"; // <-- Import dari API
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Guide } from "@/lib/types";
import { CommentSection } from "@/components/section/CommentSection";


// generateStaticParams sekarang mengambil data dari API
export async function generateStaticParams() {
    const guides = await getGuides();
    return guides.map((guide: Guide) => ({
        slug: guide.slug

    }));
}

type Params =Promise<{ slug: string }>

// generateMetadata sekarang mengambil data dari API
export async function generateMetadata(context: { params: Params }): Promise<Metadata> {
    const { slug } = await context.params;

    const guide = await getGuideBySlug(slug);
    return {
        title: guide?.title || 'Blog',
        description: guide?.description || 'Detail blog guide',
    };
}


type GuideDetailPageProps = {
    params: Promise<{ slug: string }>
};

export default async function GuideDetailPage(props: GuideDetailPageProps) {
    const { slug } = await props.params;
    const guide = await getGuideBySlug(slug);

    if (!guide) {
        notFound();
    }

    console.log(guide)

    return (
        <div className="pb-16">
            <article className="container max-w-3xl mx-auto py-12">
                <div className="mb-8">
                    <Link href="/insights" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Insights
                    </Link>
                    {guide.category && <p className="text-base text-primary font-semibold">{guide.category}</p>}
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {guide.title}
                    </h1>
                    {/* <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                        <Image className="h-10 w-10 rounded-full" src={post.author_image || ''} alt={post.author || ''} width={40} height={40} />
                        <span>{post.author}</span>
                    </div>
                </div> */}
                    {guide.published_at && (
                        <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <p className="text-sm">
                                Published on {new Date(guide.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <div className="flex items-center gap-2 ml ml-1">
                                <span>by </span>
                                {/* <Image className="h-8 w-8 rounded-full border border-indigo-600" src={guide.author_id?.avatar_url || ''} alt={guide.author_id?.full_name || ''} width={40} height={40} /> */}
                                <span>{guide.author_id?.full_name}</span>
                            </div>
                        </div>
                    )}
                </div>
                {guide.image_url && (
                    <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                        <Image src={guide.image_url} alt={guide.title} fill className="object-cover" />
                    </div>
                )}

                {/* Konten Artikel */}
                {guide.content && (
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none 
                     prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                     prose-a:text-indigo-500 hover:prose-a:text-indigo-400
                     prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                // Opsi kustomisasi: Ganti cara rendering elemen tertentu
                                // Contoh: membuat semua link terbuka di tab baru
                                a: ({ ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer" />
                                ),
                                // Contoh: menambahkan styling khusus untuk gambar
                                img: ({ ...props }) => (
                                    <img {...props} className="rounded-lg border shadow-md" />
                                )
                            }}
                        >
                            {guide.content}
                        </ReactMarkdown>
                    </div>
                )}
            </article>
            <div className="container max-w-3xl mx-auto">
                <CommentSection target={{guideId: guide.id}} />
            </div>
        </div>
    );
}