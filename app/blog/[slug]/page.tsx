import { getPostDetail } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Blog Detail - Frendi.web.id',
    description: 'Read detailed articles about software development, automation, and tech insights.',
    openGraph: {
        title: 'Blog Detail - Frendi.web.id',
        description: 'Read detailed articles about software development, automation, and tech insights.',
        images: [
            {
                url: '/logo.png',
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
        title: post.metaTitle ?? post.title,
        description: post.metaDescription ?? post.description,
        openGraph: {
            title: post.metaTitle ?? post.title,
            description: post.metaDescription ?? post.description,
            images: [
                {
                    url: post.coverImage || post.thumbnail || '/logo.png',
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
                            <div>
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-300 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-strong:text-white prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

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
        </main>
    );
}
