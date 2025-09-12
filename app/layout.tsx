import './globals.css';
import type { Metadata } from 'next';
import TawkChat from '@/components/TawkChat';

export const metadata: Metadata = {
  title: 'Frendi.web.id - Software Engineer & Automation Specialist',
  description: 'A software engineer with 5+ years of experience specializing in automation and one-on-one mentoring. Let\'s build something amazing together.',
  keywords: 'software engineer, automation, mentoring, web development, python, programming',
  authors: [{ name: 'Frendi' }],
  creator: 'Frendi',
  openGraph: {
    title: 'Frendi.web.id - Software Engineer & Automation Specialist',
    description: 'A software engineer with 5+ years of experience specializing in automation and one-on-one mentoring.',
    url: 'https://frendi.web.id',
    siteName: 'Frendi.web.id',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frendi.web.id - Software Engineer & Automation Specialist',
    description: 'A software engineer with 5+ years of experience specializing in automation and one-on-one mentoring.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-900 text-white">
        {children}
        <TawkChat />
      </body>
    </html>
  );
}