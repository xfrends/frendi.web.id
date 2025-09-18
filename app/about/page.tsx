'use client';

import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    const skills = [
        // Frontend
        'JavaScript', 'TypeScript', 'Vue.js', 'React', 'HTML5', 'CSS3',

        // Backend
        'PHP', 'Laravel', 'Node.js', 'Java', 'Spring Boot',

        // Database & API
        'MySQL', 'PostgreSQL', 'MongoDB',
        'REST API', 'GraphQL', 'Microservices Architecture',

        // DevOps & Infra
        'Proxmox', 'Docker', 'Nginx', 'HAProxy', 'Linux Server Administration',
        'AWS (EC2, S3, RDS, CloudFront)', 'Git', 'GitLab CI', 'CI/CD',

        // Testing
        'Unit Testing', 'Integration Testing',

        // Product & Leadership
        'System Design', 'Scalable Architecture',
        'UI/UX Design', 'Design System', 'Product Management', 'Agile/Scrum'
    ]

    const experiences = [
        {
            title: 'Head of Software Engineer',
            company: 'Thrive - IT Consultant',
            period: 'Dec 2022 - Present',
            description: 'Lead software engineering team to build Keloola, an all-in-one SaaS ecosystem (Accounting, Inventory, HRM, CRM, E-Catalog, Automation). Responsible for high-level architecture, complex project delivery, and direct reporting to CEO & CTO. Successfully delivering enterprise-grade solutions for clients like Toyota, Sharp, and Astrido.'
        },
        {
            title: 'Software Engineer',
            company: 'Thrive - IT Consultant',
            period: 'Apr 2020 - Dec 2022',
            description: 'Developed and optimized enterprise digital platforms (Toyota, Astrido) using Laravel & Vue. Involved in key projects such as simulation tools, financial services, and corporate websites to boost clients’ digital strategy.'
        },
        {
            title: 'Founder & Technology Lead',
            company: 'Legotech Indonesia',
            period: 'Feb 2019 - Jul 2022',
            description: 'Founded and led tech development for Eatlah POS System and Belgio Birdnest eCommerce. Handle full-stack architecture, manage dev team, and ensure scalable & robust product delivery (web & mobile).'
        },
        {
            title: 'Full Stack Web Developer',
            company: 'Snapinn Global Asia',
            period: 'Mar 2019 - Mar 2020',
            description: 'Built property tech platform from scratch to production in 1 year. Responsible for both frontend & backend development while leading the web team to deliver a smooth and hotel-like rental experience.'
        },
        {
            title: 'Frontend Developer',
            company: 'PT Inovasi Cybertend Internasional',
            period: 'Aug 2018 - Feb 2019',
            description: 'Created engaging UI for Celhum Travel website and developed Android game “Guest What” with strong focus on user experience and interactivity.'
        },
        {
            title: 'Full Stack Java Developer',
            company: 'PT Samudera Anugerah',
            period: 'Feb 2018 - Jul 2018',
            description: 'Developed server monitoring dashboard and acted as frontend mentor for bootcamp students, strengthening their web development fundamentals.'
        },
        {
            title: 'Java Bootcamp Trainee',
            company: 'PT Samudera Anugerah (s4CampTech)',
            period: 'Oct 2017 - Jan 2018',
            description: 'Completed a 6-month intensive bootcamp (scholarship by Indosat) focused on Java & Spring Boot, gaining solid foundation for enterprise-grade software development.'
        }
    ];

    const portfolioItems = [
        {
            title: 'Keloola SaaS Ecosystem',
            description: 'Led development of Keloola, an all-in-one SaaS platform (Accounting, Inventory, HRM, CRM, E-Catalog, Automation). Solved scalability & multi-tenant challenges by implementing modular microservices architecture and centralized auth system.'
        },
        {
            title: 'Toyota Digital Platform Revamp',
            description: 'Developed multiple digital products for Toyota (Simulation, Trade-in, Finance, Gazoo Racing, ITFE) using Laravel + Vue stack. Improved system performance and UX consistency through component-based frontend architecture and optimized API integrations.'
        },
        {
            title: 'Eatlah POS System',
            description: 'Designed and built a POS ecosystem (Web dashboard for admin/finance and Android app for cashier/store supervisor). Integrated real-time sales tracking and multi-branch inventory sync to streamline operational workflow.'
        },
        {
            title: 'Belgio Birdnest eCommerce',
            description: 'Built custom eCommerce platform tailored for premium birdnest business. Implemented automated order processing, inventory tracking, and payment gateway to enable seamless customer experience and boost sales conversions.'
        },
        {
            title: 'Snapinn Property Management Platform',
            description: 'Delivered a full-stack property tech platform from scratch to production in 1 year. Orchestrated backend (Laravel) and frontend (Vue) architecture, creating a hotel-like booking experience with real-time room availability management.'
        },
        {
            title: 'Mentoring Program - PT Samudera Anugerah',
            description: 'Mentored bootcamp students on frontend fundamentals and project delivery. Successfully guided 10+ students to land their first developer jobs by applying real-world development standards and agile practices.'
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
                                About Me
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] md:text-xl">
                                My journey in technology and software engineering.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center pt-6">
                        <Link href="https://tawk.to/frendi" target="_blank" className="block">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Free Consultation
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="flex mx-auto max-w-[960px] flex-col items-center gap-6 rounded-lg bg-gray-800/50 p-8 mt-16">
                    <div
                        className="h-40 w-40 rounded-full border-4 border-gray-700 shadow-lg bg-center bg-cover"
                        style={{
                            backgroundImage: `url("/ilustrasi.png")`
                        }}
                    />
                    <div className="text-center">
                        <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em]">Frendi Triarista</h2>
                        <p className="text-lg font-medium leading-normal text-[var(--primary-color)]">
                            Software Engineer | Automation Specialist | Mentor
                        </p>
                    </div>
                </section>

                {/* Experience Section */}
                <section className="w-full py-10 md:py-16 lg:py-20 mt-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-6 text-3xl font-bold leading-tight tracking-[-0.015em]">Work Experience</h2>
                        <div className="relative border-l-2 border-[var(--primary-color)] pl-8">
                            {experiences.map((exp, index) => (
                                <div key={index} className="mb-8 last:mb-0">
                                    <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-[var(--primary-color)]"></div>
                                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                                    <p className="text-base text-gray-400">{exp.company} | {exp.period}</p>
                                    <p className="mt-2 text-gray-300">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="w-full py-10 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-6 text-3xl font-bold leading-tight tracking-[-0.015em]">Technical Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-md bg-gray-800 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="w-full py-10 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4 md:px-6 rounded-lg bg-gray-800/50 p-8">
                        <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.015em]">Philosophy</h2>
                        <blockquote className="border-l-4 border-[var(--primary-color)] pl-6 text-lg italic text-gray-300">
                            "I believe automation is not just about efficiency, but about freeing up time to focus on more strategic matters. In mentoring, I am dedicated to helping engineers reach their full potential by sharing my knowledge and experience."
                        </blockquote>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section className="w-full py-10 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-6 text-3xl font-bold leading-tight tracking-[-0.015em]">Portfolio Highlights</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
                            {portfolioItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 overflow-hidden rounded-lg bg-gray-800/50 transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="aspect-video w-full rounded-t-lg bg-gray-700 bg-cover overflow-hidden">
                                        <img
                                            src="/logo.png"
                                            alt={item.title}
                                            className="w-full h-full object-cover object-center"
                                            style={{ aspectRatio: '16/9' }}
                                        />
                                    </div>
                                    <div className="p-4 pt-0">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}