import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ReadyMadeProjects, DeveloperProfiles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, CheckCircle, Code, Users, Play, Download } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ReadyMadeProjects | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    try {
      const projectData = await BaseCrudService.getById<ReadyMadeProjects>(
        'readymadeprojects',
        id,
        ['assigneddevelopers']
      );
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="pt-32 pb-24 px-8 flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="pt-32 pb-24 px-8">
          <div className="max-w-[120rem] mx-auto text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            <Link to="/projects">
              <Button className="bg-accent text-primary-foreground hover:bg-accent/90">
                <ArrowLeft className="mr-2" size={20} />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const features = project.features?.split('\n').filter(Boolean) || [];
  const techStack = project.techStack?.split(',').map(t => t.trim()).filter(Boolean) || [];
  const deliverables = project.deliverables?.split('\n').filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          {/* Back Button */}
          <Link to="/projects">
            <Button variant="outline" className="mb-8 border-accent/20 text-foreground/70 hover:border-accent hover:text-accent">
              <ArrowLeft className="mr-2" size={20} />
              Back to Projects
            </Button>
          </Link>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-paragraph text-sm uppercase tracking-wider text-accent">
                {project.category}
              </span>
              {project.isFeatured && (
                <span className="font-paragraph text-sm uppercase tracking-wider text-secondary">
                  Featured Project
                </span>
              )}
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
              {project.projectName}
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-4xl">
              {project.description}
            </p>
          </motion.div>

          {/* Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {project.screenshot1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="border-4 border-accent/20 overflow-hidden"
              >
                <Image
                  src={project.screenshot1}
                  alt={`${project.projectName} Screenshot 1`}
                  className="w-full h-auto"
                  width={800}
                />
              </motion.div>
            )}
            {project.screenshot2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-4 border-accent/20 overflow-hidden"
              >
                <Image
                  src={project.screenshot2}
                  alt={`${project.projectName} Screenshot 2`}
                  className="w-full h-auto"
                  width={800}
                />
              </motion.div>
            )}
          </div>

          {/* Demo Video */}
          {project.demoVideoLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Play className="text-accent" size={32} />
                Demo Video
              </h2>
              <div className="aspect-video bg-foreground/5 border-4 border-accent/20 flex items-center justify-center">
                <a
                  href={project.demoVideoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-paragraph text-accent hover:text-accent/80 underline"
                >
                  Watch Demo Video
                </a>
              </div>
            </motion.div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-foreground/5 border border-accent/20 p-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                    <span className="font-paragraph text-sm text-foreground/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Code className="text-accent" size={32} />
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="font-paragraph text-sm px-4 py-2 bg-accent/10 text-accent border-2 border-accent/20 hover:border-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Download className="text-accent" size={32} />
                What You'll Get
              </h2>
              <div className="space-y-3">
                {deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-3 bg-foreground/5 border border-accent/20 p-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                    <span className="font-paragraph text-sm text-foreground/80">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Developers */}
          {project.assigneddevelopers && project.assigneddevelopers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="text-accent" size={32} />
                Development Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.assigneddevelopers.map((dev) => (
                  <div key={dev._id} className="bg-foreground/5 border border-accent/20 p-6">
                    {dev.profilePicture && (
                      <Image
                        src={dev.profilePicture}
                        alt={dev.displayName || 'Developer'}
                        className="w-20 h-20 object-cover mb-4"
                        width={80}
                      />
                    )}
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {dev.displayName}
                    </h3>
                    <p className="font-paragraph text-sm text-accent mb-2">
                      {dev.role}
                    </p>
                    {dev.skills && (
                      <p className="font-paragraph text-xs text-foreground/70">
                        {dev.skills}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-accent p-12 text-center"
          >
            <h2 className="font-heading text-4xl font-bold text-primary-foreground mb-6">
              Interested in This Project?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get in touch with us to discuss pricing, customization options, and delivery timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-background text-accent hover:bg-background/90 px-8 py-6 text-lg font-heading">
                  Contact Us
                </Button>
              </Link>
              <Link to="/custom-request">
                <Button variant="outline" className="border-background text-background hover:bg-background hover:text-accent px-8 py-6 text-lg font-heading">
                  Request Customization
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
