'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-full rounded-t-lg bg-cover overflow-hidden h-9">
              <img
                src="/header-logo.png"
                alt="Frendi.web.id"
                className="w-full h-full object-cover object-center"
                style={{ aspectRatio: '16/3' }}
              />
            </div>
            {/* <Code className="w-6 h-6 text-blue-500" /> */}
            {/* <span className="text-xl font-bold text-white">Frendi.web.id</span> */}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/automation" className="text-slate-300 hover:text-white transition-colors">
              Automation
            </Link>
            <Link href="/mentoring" className="text-slate-300 hover:text-white transition-colors">
              Mentoring
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
              Blog
            </Link>
          </div>

          <Link href="https://tawk.to/frendi" target="_blank" className="block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Free Consultation
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}