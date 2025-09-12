import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Image as ImageIcon } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import Link from "next/link";

export default async function BlogList() {
  const blogPosts = await getAllPosts();
  return (
    <section id="blog" className="full bg-[var(--secondary-color)]/20 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="block">
              <Card key={index} className="blog-card border-slate-700 group hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-slate-700 rounded-t-lg flex items-center justify-center">
                    {post.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        loading="lazy"
                      />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-slate-500" />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}