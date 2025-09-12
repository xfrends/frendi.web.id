'use client';

import Image from 'next/image';
import { Settings, Link2, Code2, Headphones, PiggyBank, Timer, CheckSquare, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface ServiceCard {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface CaseStudy {
    title: string;
    description: string;
    imageUrl: string;
}

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function AutomationPage() {
    const services: ServiceCard[] = [
        {
            icon: <Settings className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Otomatisasi Proses Bisnis",
            description: "Otomatiskan tugas berulang seperti entri data, pemrosesan pesanan, dan pelaporan."
        },
        {
            icon: <Link2 className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Integrasi Sistem",
            description: "Hubungkan berbagai sistem dan aplikasi Anda untuk alur kerja yang lancar dan data yang tersinkronisasi."
        },
        {
            icon: <Code2 className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Pengembangan Skrip & Bot",
            description: "Buat skrip dan bot kustom untuk menangani tugas-tugas spesifik yang unik untuk bisnis Anda."
        },
        {
            icon: <Headphones className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Otomatisasi Layanan Pelanggan",
            description: "Implementasikan chatbot dan sistem respons otomatis untuk meningkatkan layanan pelanggan."
        }
    ];

    const caseStudies: CaseStudy[] = [
        {
            title: "Otomatisasi Invoice via WhatsApp ke ERP",
            description: "Customer kirim invoice ke WhatsApp ➜ otomatis tercatat di ERP/Accounting ➜ muncul laporan keuangan.",
            imageUrl: "/ilustration/data-entry.png"
        },
        {
            title: "Auto post artikel by AI",
            description: "AI bantu client auto-post artikel tiap hari + SEO naik. Client rileks ➜ AI nulis artikel ➜ auto-post ke website ➜ SEO makin naik",
            imageUrl: "/ilustration/auto-post.png"
        }
    ];

    const benefits: Benefit[] = [
        {
            icon: <PiggyBank className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Penghematan Biaya",
            description: "Kurangi biaya operasional dengan mengotomatiskan tugas-tugas manual dan berulang."
        },
        {
            icon: <Timer className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Peningkatan Efisiensi",
            description: "Bebaskan tim Anda dari tugas rutin agar dapat fokus pada pekerjaan yang lebih produktif dan strategis."
        },
        {
            icon: <CheckSquare className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Peningkatan Akurasi",
            description: "Minimalkan kesalahan manusia dan tingkatkan keandalan data Anda secara signifikan."
        },
        {
            icon: <Rocket className="h-8 w-8 text-[var(--primary-color)]" />,
            title: "Fokus pada Pertumbuhan",
            description: "Alihkan sumber daya Anda untuk inovasi, pengembangan bisnis, dan tugas-tugas strategis."
        }
    ];

    return (
        <main className="min-h-screen bg-[var(--background-color)]">
            <Header />
            <div className="flex-1 mt-0">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <div className="mx-auto max-w-3xl space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Otomatiskan Proses Bisnis Anda
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] md:text-xl">
                                Tingkatkan efisiensi, hemat waktu, dan minimalkan kesalahan dengan solusi otomatisasi yang dirancang khusus untuk kebutuhan bisnis Anda.
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

                {/* Services Section */}
                <section className="w-full bg-[var(--secondary-color)]/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Apa yang Saya Tawarkan
                            </h2>
                            <p className="mt-4 mx-auto max-w-2xl text-[var(--text-secondary)]">
                                Saya menyediakan layanan otomatisasi komprehensif, mulai dari analisis kebutuhan hingga implementasi dan pemeliharaan.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {services.map((service, index) => (
                                <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 transition hover:scale-105 hover:shadow-x">
                                    {service.icon}
                                    <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section className="w-full bg-[var(--secondary-color)]/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Studi Kasus Keberhasilan
                            </h2>
                            <p className="mt-4 mx-auto max-w-2xl text-[var(--text-secondary)]">
                                Lihat bagaimana saya telah membantu klien mencapai hasil luar biasa melalui otomatisasi.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {caseStudies.map((study, index) => (
                                <div key={index} className="flex flex-col overflow-hidden">
                                    <div className="relative w-full aspect-[16/9] bg-gray-800/50 rounded-xl border border-gray-700/50 transition hover:scale-105 hover:shadow-x">
                                        <Image
                                            src={study.imageUrl}
                                            alt={study.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-center"
                                            priority={index === 0}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="text-lg font-bold">{study.title}</h3>
                                        <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">
                                            {study.description}
                                        </p>
                                        <Link href="https://tawk.to/frendi" target="_blank" className="block">
                                            <Button variant="secondary" className="mt-4 w-fit">
                                                Terapkan Sekarang
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="w-full py-10 md:py-16 lg:py-20 bg-[var(--secondary-color)]/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Manfaat Otomatisasi untuk Bisnis Anda
                            </h2>
                            <p className="mt-4 mx-auto max-w-2xl text-[var(--text-secondary)]">
                                Otomatisasi bukan hanya tentang teknologi, ini tentang membuka potensi pertumbuhan bisnis Anda.
                            </p>
                        </div>
                        <div className="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 transition hover:scale-105 hover:shadow-xl"
                                >
                                    {benefit.icon}
                                    <h3 className="mt-4 text-lg font-bold">{benefit.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Siap Mengubah Bisnis Anda?
                            </h2>
                            <p className="mt-4 text-lg text-[var(--text-secondary)]">
                                Mari diskusikan bagaimana otomatisasi dapat membantu Anda mencapai tujuan bisnis Anda. Jadwalkan konsultasi gratis hari ini.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link href="https://tawk.to/frendi" target="_blank" className="block">
                                    <Button size="lg" className="h-12 px-8 font-bold bg-blue-600 hover:bg-blue-700 text-white">
                                        Free Consultation
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}