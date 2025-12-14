import { useState } from 'react';
import { submitContactForm } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      
      toast({
        title: 'Message Sent!',
        description: response.message || 'Thank you for contacting us. We will get back to you soon.',
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            className="mb-16 text-center"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Have a question or want to discuss a project? We're here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@projecthubx.com"
                      className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors"
                    >
                      contact@projecthubx.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Location
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/70">
                      123 Innovation Street<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-accent">
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 font-paragraph text-sm text-primary-foreground/80">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-primary-foreground hover:bg-accent/90 h-12 text-lg font-heading"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
