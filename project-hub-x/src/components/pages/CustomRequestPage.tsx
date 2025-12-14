import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CustomProjectRequests } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CustomRequestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    projectDescription: '',
    projectType: '',
    desiredFeatures: '',
    preferredTechStack: '',
    budgetRange: '',
    deadline: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      await BaseCrudService.create<CustomProjectRequests>('customprojectrequests', {
        _id: crypto.randomUUID(),
        ...formData,
        requestStatus: 'Pending',
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
      });

      setSubmitted(true);
      toast({
        title: 'Request Submitted!',
        description: 'We will review your request and get back to you soon.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.clientName && formData.clientEmail && formData.projectTitle;
    }
    if (step === 2) {
      return formData.projectDescription && formData.projectType;
    }
    return true;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="pt-32 pb-24 px-8 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
          >
            <div className="w-24 h-24 bg-accent mx-auto mb-8 flex items-center justify-center">
              <CheckCircle size={48} className="text-primary-foreground" />
            </div>
            <h1 className="font-heading text-5xl font-bold text-foreground mb-6">
              Request Submitted!
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              Thank you for your custom project request. Our team will review your requirements and get back to you within 24-48 hours with a detailed quotation.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg font-heading"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Custom Project Request
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Tell us about your project and we'll create a tailored solution for you
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border-2 ${
                      step >= s ? 'bg-accent border-accent text-primary-foreground' : 'border-accent/20 text-foreground/50'
                    }`}
                  >
                    <span className="font-heading text-lg font-bold">{s}</span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-accent' : 'bg-accent/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-paragraph text-xs uppercase tracking-wider text-foreground/70">
                Basic Info
              </span>
              <span className="font-paragraph text-xs uppercase tracking-wider text-foreground/70">
                Project Details
              </span>
              <span className="font-paragraph text-xs uppercase tracking-wider text-foreground/70">
                Requirements
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="clientName" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Your Name *
                  </Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="clientEmail" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="projectTitle" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Project Title *
                  </Label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="projectType" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Project Type *
                  </Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="e.g., Web Application, Mobile App, Desktop Software"
                    required
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="projectDescription" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Project Description *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe your project in detail..."
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph"
                  />
                </div>

                <div>
                  <Label htmlFor="desiredFeatures" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Desired Features
                  </Label>
                  <Textarea
                    id="desiredFeatures"
                    name="desiredFeatures"
                    value={formData.desiredFeatures}
                    onChange={handleChange}
                    rows={4}
                    placeholder="List the key features you want..."
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Requirements */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="preferredTechStack" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Preferred Technology Stack
                  </Label>
                  <Input
                    id="preferredTechStack"
                    name="preferredTechStack"
                    value={formData.preferredTechStack}
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js, MongoDB"
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="budgetRange" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Budget Range
                  </Label>
                  <Input
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    placeholder="e.g., $5000 - $10000"
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline" className="font-paragraph text-sm uppercase tracking-wider text-foreground mb-2 block">
                    Expected Deadline
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="bg-foreground/5 border-accent/20 focus:border-accent text-foreground font-paragraph h-12"
                  />
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="border-accent/20 text-foreground/70 hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-accent text-primary-foreground hover:bg-accent/90 ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent text-primary-foreground hover:bg-accent/90 ml-auto"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
