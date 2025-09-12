import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export const metadata = {
    title: 'Blog - Frendi.web.id',
    description: 'Explore articles and case studies on automation, software engineering, and personal growth.',
};

export default async function BlogPage() {

    return (
        <main className="min-h-screen bg-slate-900">
            <Header />
            <div className="flex-1 px-4 py-16 md:px-40 mt-20">
                <div className="mx-auto flex max-w-[960px] flex-1 flex-col gap-12">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight">From the Blog</h1>
                        <p className="mt-2 text-lg text-gray-400">Explore articles and case studies on automation, software engineering, and personal growth.</p>
                    </div>

                    {/* Blog Section */}
                    <BlogList />
                </div>
            </div>
            <Footer />
        </main>
    );
}