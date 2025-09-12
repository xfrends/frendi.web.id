import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Kevin Wijaya",
    role: "Project Manajer",
    content: "Script otomatisasi dari Frendi membuat alur kerja tim kami jauh lebih efisien. Pengerjaan cepat dan hasilnya sangat rapi.",
    avatar: "KW"
  },
  {
    name: "Jason Sutanto",
    role: "Junior Programmer",
    content: "Sesi mentoringnya sangat membantu. Frendi menjelaskan konsep yang rumit jadi mudah dipahami. Sangat direkomendasikan!",
    avatar: "JS"
  },
  {
    name: "Leonardo Tanujaya",
    role: "Startup Founder",
    content: "Berkolaborasi dengan Frendi benar-benar meningkatkan produktivitas tim kami. Tools khusus yang ia buat kini menjadi bagian penting dari operasional harian kami.",
    avatar: "LT"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-10 md:py-16 lg:py-20 bg-slate-800/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What My Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card border-slate-700 p-6 group hover:scale-105 transition-all duration-300">
              <CardContent className="p-0">
                <p className="text-slate-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}