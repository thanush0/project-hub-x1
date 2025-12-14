import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const { items } = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faq');
    const published = items.filter(faq => faq.isPublished).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setFaqs(published);
    setFilteredFaqs(published);

    const uniqueCategories = ['All', ...new Set(published.map(f => f.category).filter(Boolean) as string[])];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    let filtered = faqs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(f =>
        f.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory, faqs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-6">
              FAQ
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Find answers to commonly asked questions
            </p>
          </motion.div>

          <div className="mb-12 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-14"
              />
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`font-paragraph text-sm px-4 py-2 border transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-primary-foreground border-accent'
                        : 'bg-foreground/5 text-foreground/70 border-accent/20 hover:border-accent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AccordionItem value={faq._id} className="bg-foreground/5 border border-accent/20 px-6">
                    <AccordionTrigger className="font-heading text-lg font-bold text-foreground hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-foreground/50">
                No FAQs found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
