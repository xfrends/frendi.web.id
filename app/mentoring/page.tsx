'use client';

import { Trophy, Code2, Users, TrendingUp, Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface CurriculumItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Testimonial {
    name: string;
    role: string;
    image: string;
    rating: number;
    comment: string;
}

export default function MentoringPage() {
    const curriculum: CurriculumItem[] = [
        {
            icon: <Trophy className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Identifikasi Tujuan Karir",
            description: "Sesi 1: Analisis Kebutuhan dan Tujuan"
        },
        {
            icon: <Code2 className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Penguasaan Teknologi",
            description: "Sesi 2: Pengembangan Keterampilan Teknis"
        },
        {
            icon: <Users className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Simulasi Wawancara",
            description: "Sesi 3: Persiapan Wawancara Kerja"
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Perencanaan Karir",
            description: "Sesi 4: Strategi Pengembangan Karir"
        }
    ];

    const testimonials: Testimonial[] = [
        {
            name: "Robi",
            role: "Mahasiswa Tingkat Akhir",
            image: "/testimoni/skripsi.png",
            rating: 4.5,
            comment: "Mentoring dengan Frendi sangat membantu saya dalam mempersiapkan sidang skripsi. Saya berhasil membuat program dan sidang dengan percaya diri berkat bimbingannya!"
        },
        {
            name: "Budi",
            role: "Junior Developer",
            image: "/testimoni/laravel.png",
            rating: 5,
            comment: "Frendi memberikan panduan yang jelas dan terstruktur. Saya sangat merekomendasikan program mentoring ini kepada siapa pun yang ingin belajar Laravel."
        },
        {
            name: "Jason",
            role: "Junior Programmer",
            image: "/testimoni/meet.png",
            rating: 5,
            comment: "Sesi mentoringnya sangat membantu. Frendi menjelaskan konsep yang rumit jadi mudah dipahami. Sangat direkomendasikan!"
        },
        {
            "name": "Andi Pratama",
            "role": "UI/UX Designer",
            "image": "/testimoni/uiux.png",
            "rating": 5,
            "comment": "Mentoring dari Frendi membuka wawasan saya dalam memahami kebutuhan pengguna. Sekarang saya bisa merancang tampilan aplikasi yang lebih intuitif dan menarik!"
        }
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
        }

        return stars;
    };

    return (
        <main className="min-h-screen bg-[var(--background-color)]">
            <Header />
            <div className="flex-1 mt-0">

                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <div className="mx-auto max-w-3xl space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Mentoring One-on-One
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] md:text-xl">
                                Program mentoring intensif untuk membantu Anda mencapai tujuan karir di bidang software engineering. Dapatkan bimbingan personal dari Frendi, seorang software engineer berpengalaman.
                            </p>
                            <div className="flex justify-center pt-6">
                                <Link href="https://tawk.to/frendi" target="_blank" className="block">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Free Consultation
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum Section */}
                <section className="w-full bg-[var(--secondary-color)]/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Kurikulum Mentoring
                            </h2>
                            <p className="mt-4 mx-auto max-w-2xl text-[var(--text-secondary)]">
                                Rencana belajar terstruktur, disesuaikan dengan tujuan karier Anda.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {curriculum.map((item, index) => (
                                <div key={index} className="flex items-start gap-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                    <div className="flex items-center justify-center rounded-full bg-gray-700/50 shrink-0 size-14">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                        <p className="text-gray-400 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full bg-[var(--secondary-color)]/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Apa Kata Mereka?
                            </h2>
                            <p className="mt-4 mx-auto max-w-2xl text-[var(--text-secondary)]">
                                Cerita nyata dari para mentee yang telah berkembang bersama Frendi.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="testimonial-card border-slate-700 p-6 group hover:scale-105 transition-all duration-300">
                                    <CardContent className="p-0">
                                        <p className="text-slate-300 mb-6 leading-relaxed italic">
                                            "{testimonial.comment}"
                                        </p>
                                        <div className="flex items-center space-x-4 justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={testimonial.image}
                                                    alt={`Foto ${testimonial.name}`}
                                                    className="rounded-full w-12 h-12 border-2 border-[var(--primary-color)] shadow-md object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full bg-[var(--secondary-color)]/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <Link href="https://tawk.to/frendi" target="_blank" className="block">
                            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white">
                                Free Consult Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}