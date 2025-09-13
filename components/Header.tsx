'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <EllipsisVertical className="w-6 h-6" />
              )}
            </button>
            <Link href="/" className="flex items-center">
              <div className="w-full rounded-t-lg bg-cover overflow-hidden h-9">
                <img
                  src="/header-logo.png"
                  alt="Frendi.web.id"
                  className="w-full h-full object-cover object-center"
                  style={{ aspectRatio: '16/3' }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
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
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs md:text-base rounded-md"
              size="sm"
            >
              Free Consultation
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/automation"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Automation
            </Link>
            <Link
              href="/mentoring"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentoring
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}