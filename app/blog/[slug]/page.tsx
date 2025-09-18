import { getPostDetail, getBlogStaticParams } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CopyButton } from '@/components/ui/copy-button';

const getEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
};

export async function generateStaticParams() {
    return getBlogStaticParams();
}

const FALLBACK_METADATA: Metadata = {
    title: 'Blog Detail - Frendi.web.id',
    description: 'Read detailed articles about software development, automation, and tech insights.',
    openGraph: {
        title: 'Blog Detail - Frendi.web.id',
        description: 'Read detailed articles about software development, automation, and tech insights.',
        images: [
            {
                url: 'https://frendi.web.id/og-image.png',
            },
        ],
    },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostDetail(params.slug);

    if (!post) {
        return FALLBACK_METADATA;
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: [
                {
                    url: post.thumbnail || 'https://frendi.web.id/logo.png',
                },
            ],
        },
    };
}

export default async function BlogPost({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostDetail(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--background-color)]">
            <Header />
            <div className="flex-1 px-4 py-16 md:px-40 mt-10">
                <div className="mx-auto flex max-w-[960px] flex-1 flex-col gap-12"></div>
                {/* Hero Section with Full-width Image */}
                {post.coverImage && (
                    <div className="relative w-full h-screen mb-8">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70" />
                    </div>
                )}

                {/* Main Content */}
                <section className="w-full py-20 md:py-32 lg:py-40">
                    <article className="container mx-auto px-4 md:px-6">
                        <div className="mx-auto -mt-32 relative">
                            {/* Author and Date */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex flex-col h-full w-auto p-2 bg-gray-800/50 rounded-xl border border-gray-700/50 transition hover:scale-105 hover:shadow-x">
                                    {/* <span className="text-sm font-semibold text-slate-400">Written by</span> */}
                                    <span className="text-white">{post.author}</span>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                <time className="text-slate-400 h-full w-auto p-2 bg-gray-800/50 rounded-xl border border-gray-700/50 transition hover:scale-105 hover:shadow-x" dateTime={post.publishedAt}>
                                    {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                                </time>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-8">
                                {post.title}
                            </h1>

                            {/* Content */}
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-300 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-strong:text-white prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline">
                                {post.content.map((block) => {
                                    const { type, id } = block;
                                    const value = block[type as keyof typeof block];

                                    if (type === 'video') {
                                        if (!value || typeof value !== 'object') {
                                            return null;
                                        }

                                        const videoUrl =
                                            (value as { external?: { url?: string }; file?: { url?: string } })?.external?.url ||
                                            (value as { external?: { url?: string }; file?: { url?: string } })?.file?.url;

                                        if (!videoUrl) {
                                            return null;
                                        }

                                        const embedUrl = getEmbedUrl(videoUrl);

                                        return (
                                            <div key={id} className="my-10">
                                                <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 pb-[56.25%]">
                                                    <iframe
                                                        className="absolute inset-0 h-full w-full"
                                                        src={embedUrl}
                                                        title="Embedded video"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (type === 'embed') {
                                        if (!value || typeof value !== 'object') {
                                            return null;
                                        }

                                        const embedUrl = getEmbedUrl((value as { url?: string }).url || '');

                                        if (!embedUrl) {
                                            return null;
                                        }

                                        return (
                                            <div key={id} className="my-10">
                                                <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 pb-[56.25%]">
                                                    <iframe
                                                        className="absolute inset-0 h-full w-full"
                                                        src={embedUrl}
                                                        title="Embedded content"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (
                                        !value ||
                                        typeof value !== 'object' ||
                                        !('rich_text' in value) ||
                                        !Array.isArray((value as any).rich_text)
                                    ) {
                                        return null;
                                    }

                                    const text = (value as { rich_text: any[] }).rich_text
                                        .map((item: any) => item.plain_text)
                                        .join('');

                                    switch (type) {
                                        case 'paragraph':
                                            return (
                                                <p key={id} className="text-lg leading-relaxed mb-6">
                                                    {text}
                                                </p>
                                            );
                                        case 'heading_1':
                                            return (
                                                <h1 key={id} className="text-3xl font-bold mt-12 mb-6">
                                                    {text}
                                                </h1>
                                            );
                                        case 'heading_2':
                                            return (
                                                <h2 key={id} className="text-2xl font-bold mt-10 mb-4">
                                                    {text}
                                                </h2>
                                            );
                                        case 'heading_3':
                                            return (
                                                <h3 key={id} className="text-xl font-bold mt-8 mb-4">
                                                    {text}
                                                </h3>
                                            );
                                        case 'bulleted_list_item':
                                            return (
                                                <li key={id} className="text-slate-300 mb-2 mx-4">
                                                    {text}
                                                </li>
                                            );
                                        case 'numbered_list_item':
                                            return (
                                                <li key={id} className="text-slate-300 mb-2 mx-4">
                                                    {text}
                                                </li>
                                            );
                                        case 'code':
                                            // Handle code block
                                            if (typeof value === 'object' && value !== null && 'language' in value) {
                                                const codeLanguage = (value.language as string) || 'bash';
                                                return (
                                                    <pre key={id} className="relative group">
                                                        <div className="absolute right-4 top-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-slate-500">
                                                                    {codeLanguage}
                                                                </span>
                                                                <CopyButton text={text} />
                                                            </div>
                                                        </div>
                                                        <code className={`language-${codeLanguage} block bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed mb-6`}>
                                                            {text}
                                                        </code>
                                                    </pre>
                                                );
                                            }
                                            return null;
                                        default:
                                            return null;
                                    }
                                })}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-slate-800">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-sm bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                </section>
            </div>
            <Footer />
        </main >
    );
}
