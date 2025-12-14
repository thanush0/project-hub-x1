import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ReadyMadeProjects } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ReadyMadeProjects[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ReadyMadeProjects[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { items } = await BaseCrudService.getAll<ReadyMadeProjects>('readymadeprojects');
    setProjects(items);
    setFilteredProjects(items);

    const uniqueCategories = ['All', ...new Set(items.map(p => p.category).filter(Boolean) as string[])];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.techStack?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, projects]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-6">
              Project Marketplace
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl">
              Browse our collection of ready-made projects. Find the perfect solution for your needs.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
              <Input
                type="text"
                placeholder="Search projects by name, description, or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-14"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-foreground/70">
                <Filter size={20} />
                <span className="font-paragraph text-sm uppercase tracking-wider">Categories:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={
                    selectedCategory === category
                      ? 'bg-accent text-primary-foreground hover:bg-accent/90'
                      : 'border-accent/20 text-foreground/70 hover:border-accent hover:text-accent'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="font-paragraph text-sm text-foreground/50">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/projects/${project._id}`}>
                    <div className="bg-foreground/5 border border-accent/20 hover:border-accent transition-all group h-full flex flex-col">
                      {project.screenshot1 && (
                        <div className="h-64 overflow-hidden">
                          <Image
                            src={project.screenshot1}
                            alt={project.projectName || 'Project'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-paragraph text-xs uppercase tracking-wider text-accent">
                            {project.category}
                          </span>
                          {project.isFeatured && (
                            <span className="font-paragraph text-xs uppercase tracking-wider text-secondary">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {project.projectName}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70 line-clamp-3 mb-4 flex-1">
                          {project.description}
                        </p>
                        {project.techStack && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.split(',').slice(0, 3).map((tech, i) => (
                                <span
                                  key={i}
                                  className="font-paragraph text-xs px-2 py-1 bg-accent/10 text-accent border border-accent/20"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-accent/20">
                          <span className="font-paragraph text-sm text-accent font-bold">
                            View Details
                          </span>
                          <ArrowRight className="text-accent group-hover:translate-x-2 transition-transform" size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-paragraph text-lg text-foreground/50">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
