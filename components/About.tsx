export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-slate-800/20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <p className="text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            A Passionate Engineer
          </h2>
        </div>
        
        <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
          I'm a passionate software engineer with a proven track record of delivering high-quality 
          solutions. I specialize in automation and love helping others grow through mentoring. My 
          goal is to empower individuals and businesses with efficient and effective technology.
        </p>
      </div>
    </section>
  );
}