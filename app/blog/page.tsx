import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export const metadata = {
    title: 'Blog - Frendi.web.id',
    description: 'Explore articles and case studies on automation, software engineering, and personal growth.',
};

export default async function BlogPage() {

    return (
        <main className="min-h-screen bg-[var(--background-color)]">
            <Header />
            <div className="flex-1 mt-0">

                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <div className="mx-auto max-w-3xl space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                From the Blog
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] md:text-xl">
                                Explore articles and case studies on automation, software engineering, and personal growth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <BlogList />

            </div>
            <Footer />
        </main>
    );
}