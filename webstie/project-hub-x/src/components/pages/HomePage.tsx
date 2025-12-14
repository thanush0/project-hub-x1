// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { ReadyMadeProjects, HowItWorksSteps, ClientTestimonials } from '@/entities';
import { ArrowRight, Code, Zap, Shield, Users, Star, Terminal, Cpu, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// --- MANDATORY ANIMATED ELEMENT COMPONENT ---
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = '0ms' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`animate-reveal ${className || ''}`}
      style={{ transitionDelay: delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// --- UTILITY COMPONENTS ---

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all duration-100 select-none" aria-hidden="true">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-100 select-none" aria-hidden="true">{text}</span>
    </div>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
  />
);

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  // --- DATA FIDELITY PROTOCOL ---
  const [featuredProjects, setFeaturedProjects] = useState<ReadyMadeProjects[]>([]);
  const [howItWorksSteps, setHowItWorksSteps] = useState<HowItWorksSteps[]>([]);
  const [testimonials, setTestimonials] = useState<ClientTestimonials[]>([]);
  
  // Scroll progress for global parallax
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // CANONICAL DATA SOURCES
    const { items: projects } = await BaseCrudService.getAll<ReadyMadeProjects>('readymadeprojects');
    const featured = projects.filter(p => p.isFeatured).slice(0, 6);
    setFeaturedProjects(featured);

    const { items: steps } = await BaseCrudService.getAll<HowItWorksSteps>('howitworkssteps');
    setHowItWorksSteps(steps.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));

    const { items: reviews } = await BaseCrudService.getAll<ClientTestimonials>('clienttestimonials');
    setTestimonials(reviews.slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-accent selection:text-background overflow-x-clip relative">
      <style>{`
        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        .text-stroke-accent {
          -webkit-text-stroke: 1px #64FFDA;
          color: transparent;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-chevron {
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
        }
      `}</style>

      <NoiseOverlay />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="container max-w-[120rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
            <div className="col-span-12 lg:col-span-8 relative">
              <AnimatedElement>
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/30 rounded-full bg-accent/5 mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-mono text-accent tracking-widest uppercase">System Online v2.0</span>
                </div>
              </AnimatedElement>
              
              <AnimatedElement delay="100ms">
                <h1 className="font-heading text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] font-black tracking-tighter mb-8 text-foreground mix-blend-difference">
                  PROJECT<br />
                  <span className="text-accent">HUB</span><span className="text-stroke">X</span>
                </h1>
              </AnimatedElement>

              <AnimatedElement delay="200ms">
                <p className="font-paragraph text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed mb-10 border-l-2 border-accent pl-6">
                  The definitive marketplace for academic excellence and real-world software solutions. 
                  We bridge the gap between theoretical concepts and production-grade execution.
                </p>
              </AnimatedElement>

              <AnimatedElement delay="300ms">
                <div className="flex flex-wrap gap-4">
                  <Link to="/projects">
                    <Button className="bg-accent text-background hover:bg-white hover:text-black rounded-none h-14 px-8 text-lg font-bold tracking-wide transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                      EXPLORE VAULT <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/custom-request">
                    <Button variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background rounded-none h-14 px-8 text-lg font-bold tracking-wide transition-all duration-300">
                      INITIATE REQUEST
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            </div>

            {/* Hero Visual - Abstract 3D Representation */}
            <div className="col-span-12 lg:col-span-4 relative h-[50vh] lg:h-auto flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 border border-accent/20 rotate-3 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-secondary/20 -rotate-6 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="https://static.wixstatic.com/media/9bded3_922e5e5d2d5b444b8614250845ab3e7e~mv2.png?originWidth=576&originHeight=576"
                    alt="Digital Architecture Abstract"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover mix-blend-lighten opacity-80 grayscale contrast-125"
                  />
                </div>
                {/* Floating Code Snippets */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 bg-background border border-accent/30 p-4 shadow-2xl hidden md:block"
                >
                  <Code className="text-accent mb-2" />
                  <div className="space-y-1">
                    <div className="h-2 w-24 bg-foreground/20 rounded" />
                    <div className="h-2 w-16 bg-foreground/20 rounded" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to Initialize</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* --- STATS TICKER (BRUTALIST) --- */}
      <section className="border-y border-foreground/10 bg-foreground/5 backdrop-blur-sm overflow-hidden py-8">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-8">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-heading font-bold text-transparent text-stroke-accent">500+</span>
                <span className="text-sm font-mono uppercase tracking-wider text-foreground/60">Projects<br/>Deployed</span>
              </div>
              <div className="w-px h-12 bg-foreground/20 rotate-12" />
              <div className="flex items-center gap-4">
                <span className="text-5xl font-heading font-bold text-transparent text-stroke-accent">98%</span>
                <span className="text-sm font-mono uppercase tracking-wider text-foreground/60">Success<br/>Rate</span>
              </div>
              <div className="w-px h-12 bg-foreground/20 rotate-12" />
              <div className="flex items-center gap-4">
                <span className="text-5xl font-heading font-bold text-transparent text-stroke-accent">24/7</span>
                <span className="text-sm font-mono uppercase tracking-wider text-foreground/60">Active<br/>Support</span>
              </div>
              <div className="w-px h-12 bg-foreground/20 rotate-12" />
              <div className="flex items-center gap-4">
                <span className="text-5xl font-heading font-bold text-transparent text-stroke-accent">1K+</span>
                <span className="text-sm font-mono uppercase tracking-wider text-foreground/60">Happy<br/>Clients</span>
              </div>
              <div className="w-px h-12 bg-foreground/20 rotate-12" />
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PROJECTS (THE VAULT) --- */}
      {featuredProjects.length > 0 && (
        <section className="py-32 relative">
          <div className="container max-w-[120rem] mx-auto px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <AnimatedElement>
              <h2 className="font-heading text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter">
                The <span className="text-accent">Vault</span>
              </h2>
              <p className="font-paragraph text-foreground/60 mt-4 max-w-md">
                Curated selection of production-ready systems available for immediate deployment.
              </p>
            </AnimatedElement>
            <AnimatedElement delay="200ms">
              <Link to="/projects">
                <Button variant="ghost" className="text-xl hover:bg-transparent hover:text-accent p-0 group">
                  VIEW ALL ARCHIVES <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </AnimatedElement>
          </div>

          <div className="w-full overflow-x-auto pb-12 px-4 md:px-8 scrollbar-hide">
            <div className="flex gap-8 w-max">
              {featuredProjects.map((project, index) => (
                <AnimatedElement key={project._id} delay={`${index * 100}ms`} className="w-[85vw] md:w-[600px] group relative">
                  <Link to={`/projects/${project._id}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden bg-foreground/5 border border-foreground/10 group-hover:border-accent/50 transition-colors duration-500">
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                      {project.screenshot1 ? (
                        <Image
                          src={project.screenshot1}
                          alt={project.projectName || 'Project Preview'}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                          <Terminal className="w-16 h-16 text-foreground/20" />
                        </div>
                      )}
                      
                      {/* Tech Stack Tags Overlay */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2 flex-wrap">
                        {project.techStack?.split(',').slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-black/80 border border-foreground/20 text-xs font-mono text-accent backdrop-blur-md">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start border-t border-foreground/10 pt-4 group-hover:border-accent/30 transition-colors">
                      <div>
                        <span className="text-xs font-mono text-accent mb-1 block uppercase tracking-widest">{project.category}</span>
                        <h3 className="text-3xl font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                          {project.projectName}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- HOW IT WORKS (STICKY STACK) --- */}
      {howItWorksSteps.length > 0 && (
        <section className="py-32 bg-foreground text-background relative">
          <div className="container max-w-[120rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Sticky Header */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <AnimatedElement>
                    <h2 className="font-heading text-6xl md:text-7xl font-black mb-8 leading-none">
                      SYSTEM<br />PROTOCOL
                    </h2>
                    <p className="font-paragraph text-lg opacity-70 mb-12 max-w-sm">
                      Our standardized execution framework ensures consistent, high-quality delivery for every engagement.
                    </p>
                    <Link to="/custom-request">
                      <Button className="bg-background text-foreground hover:bg-accent hover:text-black border-2 border-transparent hover:border-black rounded-none h-14 px-8 text-lg font-bold">
                        START PROTOCOL
                      </Button>
                    </Link>
                  </AnimatedElement>
                </div>
              </div>

              {/* Steps List */}
              <div className="lg:col-span-8 space-y-32">
                {howItWorksSteps.map((step, index) => (
                  <AnimatedElement key={step._id} className="relative group">
                    <div className="absolute -left-4 md:-left-12 top-0 text-9xl font-heading font-black text-background opacity-10 select-none pointer-events-none text-stroke-black">
                      0{step.stepNumber}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <h3 className="text-3xl font-heading font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="font-paragraph text-lg opacity-70 leading-relaxed mb-6">
                          {step.description}
                        </p>
                        {step.ctaText && step.ctaUrl && (
                          <a href={step.ctaUrl} className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
                            {step.ctaText} <ChevronRight className="ml-1 w-4 h-4" />
                          </a>
                        )}
                      </div>
                      
                      <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/3] overflow-hidden border-2 border-black/10 group-hover:border-black transition-colors">
                        {step.illustration ? (
                          <Image
                            src={step.illustration}
                            alt={step.title || 'Process Step'}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-black/5 flex items-center justify-center">
                            <Cpu className="w-20 h-20 opacity-20" />
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES GRID (STATIC CONTENT) --- */}
      <section className="py-32 border-b border-foreground/10">
        <div className="container max-w-[120rem] mx-auto px-4 md:px-8">
          <AnimatedElement>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-20 text-center">
              CORE <span className="text-accent">CAPABILITIES</span>
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/20 border border-foreground/20">
            {[
              { title: "Custom Development", icon: <Code className="w-8 h-8" />, desc: "Bespoke software solutions tailored to specific business logic and architectural requirements." },
              { title: "Academic Projects", icon: <Terminal className="w-8 h-8" />, desc: "Comprehensive research and implementation support for complex academic undertakings." },
              { title: "System Integration", icon: <Zap className="w-8 h-8" />, desc: "Seamlessly connecting disparate subsystems into a unified, performant whole." },
              { title: "Cloud Architecture", icon: <Shield className="w-8 h-8" />, desc: "Scalable, secure, and resilient infrastructure design on AWS, Azure, or GCP." },
              { title: "AI Implementation", icon: <Cpu className="w-8 h-8" />, desc: "Integrating cutting-edge machine learning models to automate and enhance workflows." },
              { title: "Consultancy", icon: <Users className="w-8 h-8" />, desc: "Expert technical guidance to navigate complex digital transformation journeys." }
            ].map((service, i) => (
              <AnimatedElement key={i} delay={`${i * 50}ms`} className="bg-background p-12 hover:bg-foreground/5 transition-colors group h-full">
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mb-8 text-accent group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{service.title}</h3>
                <p className="font-paragraph text-foreground/60 leading-relaxed">
                  {service.desc}
                </p>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (MARQUEE GRID) --- */}
      {testimonials.length > 0 && (
        <section className="py-32 overflow-hidden">
          <div className="container max-w-[120rem] mx-auto px-4 md:px-8 mb-16">
            <AnimatedElement>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-right">
                CLIENT <span className="text-transparent text-stroke">FEEDBACK</span>
              </h2>
            </AnimatedElement>
          </div>

          <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex gap-8 animate-[marquee_40s_linear_infinite] w-max px-8 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={`${testimonial._id}-${index}`} 
                  className="w-[400px] bg-foreground/5 border border-foreground/10 p-8 flex flex-col justify-between hover:border-accent transition-colors duration-300"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < (testimonial.rating || 5) ? 'fill-accent text-accent' : 'fill-foreground/10 text-foreground/10'}`} 
                        />
                      ))}
                    </div>
                    <p className="font-paragraph text-lg leading-relaxed mb-8">
                      "{testimonial.testimonialText}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 border-t border-foreground/10 pt-6">
                    {testimonial.clientPhoto ? (
                      <Image
                        src={testimonial.clientPhoto}
                        alt={testimonial.clientName || 'Client'}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover grayscale"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-foreground/10" />
                    )}
                    <div>
                      <p className="font-heading font-bold">{testimonial.clientName}</p>
                      <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wider">{testimonial.clientRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- CTA SECTION (THE TERMINAL) --- */}
      <section className="py-32 px-4 md:px-8">
        <div className="container max-w-[120rem] mx-auto">
          <div className="relative bg-accent text-background overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 p-12 md:p-24 items-center">
              <div>
                <h2 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-[0.9]">
                  READY TO<br />DEPLOY?
                </h2>
                <p className="font-paragraph text-xl md:text-2xl font-bold opacity-80 mb-12 max-w-lg">
                  Transform your concept into a production-ready reality. The future is built here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/projects">
                    <Button className="bg-black text-white hover:bg-white hover:text-black h-16 px-10 text-lg font-bold rounded-none w-full sm:w-auto transition-all">
                      BROWSE CATALOG
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white h-16 px-10 text-lg font-bold rounded-none w-full sm:w-auto transition-all">
                      CONTACT SALES
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block relative h-full min-h-[400px] border-l-2 border-black/10 pl-16">
                <div className="absolute top-1/2 -translate-y-1/2 left-16 right-0">
                  <div className="font-mono text-sm opacity-60 mb-4">
                    &gt; System Status: READY<br/>
                    &gt; Resources: AVAILABLE<br/>
                    &gt; Awaiting Input...<span className="animate-pulse">_</span>
                  </div>
                  <div className="text-9xl font-heading font-black opacity-5 select-none">
                    GO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}