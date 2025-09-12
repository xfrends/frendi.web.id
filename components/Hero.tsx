import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 z-10" />
        <div className="w-full h-full bg-slate-800" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Hi, I'm Frendi
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          A software engineer with 8+ years of experience in building software and 2+ years in designing, I have a strong background in developing scalable and maintainable software solutions. Let's build something amazing together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="https://tawk.to/frendi" className='block'>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Free Consultation
            </Button>
          </Link>
          <Link href="/about" className='block'>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 text-lg"
            >
              View Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Plants/Objects */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 z-20">
        <div className="w-full h-full bg-gradient-to-tl from-green-500/20 to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-15 z-20">
        <div className="w-full h-full bg-gradient-to-tr from-green-400/20 to-transparent rounded-full" />
      </div>
    </section >
  );
}