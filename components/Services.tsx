import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Users } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  return (
    <section id="services" className="w-full py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
            My Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What I Can Do For You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Automation Solutions */}
          <Card className="service-card border-slate-700 p-8 group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Automation Solutions
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Streamline your workflows and boost productivity with custom automation
                    scripts and tools.
                  </p>
                  <Link href="/automation">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Code Preview */}
              <div className="mt-8 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-sm text-slate-400">
                  <div className="text-blue-400">def</div>
                  <div className="ml-4 text-slate-300">automate_workflow():</div>
                  <div className="ml-8 text-slate-400"># Your automation here</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* One-on-One Mentoring */}
          <Card className="service-card border-slate-700 p-8 group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    One-on-One Mentoring
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Get personalized guidance and support to level up your software engineering
                    skills.
                  </p>
                  <Link href="/mentoring">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mentoring Image Placeholder */}
              <div className="mt-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-600 rounded mb-2"></div>
                    <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}