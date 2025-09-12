import { AtSign, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://www.threads.com/@frendi_ta"
              target="_blank"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="Threads"
            >
              <AtSign className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/frendi-triarista/"
              target="_blank"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://github.com/xfrends"
              target="_blank"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-slate-400 text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} Frendi Triarista.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}