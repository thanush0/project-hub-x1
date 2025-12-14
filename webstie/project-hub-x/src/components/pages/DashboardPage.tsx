import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { CustomProjectRequests } from '@/entities';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Mail, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { member } = useMember();
  const [requests, setRequests] = useState<CustomProjectRequests[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserRequests();
  }, [member]);

  const loadUserRequests = async () => {
    if (!member?.loginEmail) {
      setLoading(false);
      return;
    }

    try {
      const { items } = await BaseCrudService.getAll<CustomProjectRequests>('customprojectrequests');
      const userRequests = items.filter(req => req.clientEmail === member.loginEmail);
      setRequests(userRequests.sort((a, b) => {
        const dateA = a._createdDate ? new Date(a._createdDate).getTime() : 0;
        const dateB = b._createdDate ? new Date(b._createdDate).getTime() : 0;
        return dateB - dateA;
      }));
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Approved':
        return 'text-accent';
      case 'Pending':
        return 'text-secondary';
      case 'Rejected':
        return 'text-destructive';
      default:
        return 'text-foreground/50';
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
            className="mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Dashboard
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'User'}
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 bg-foreground/5 border border-accent/20 p-8"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <User className="text-accent" size={24} />
                <div>
                  <p className="font-paragraph text-xs uppercase tracking-wider text-foreground/50 mb-1">
                    Name
                  </p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-accent" size={24} />
                <div>
                  <p className="font-paragraph text-xs uppercase tracking-wider text-foreground/50 mb-1">
                    Email
                  </p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.loginEmail || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="text-accent" size={24} />
                <div>
                  <p className="font-paragraph text-xs uppercase tracking-wider text-foreground/50 mb-1">
                    Member Since
                  </p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?._createdDate ? format(new Date(member._createdDate), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Your Project Requests
              </h2>
              <Button
                onClick={() => window.location.href = '/custom-request'}
                className="bg-accent text-primary-foreground hover:bg-accent/90"
              >
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent animate-spin" />
              </div>
            ) : requests.length > 0 ? (
              <div className="space-y-6">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-foreground/5 border border-accent/20 p-6 hover:border-accent transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                          {request.projectTitle}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70">
                          {request.projectType}
                        </p>
                      </div>
                      <span className={`font-paragraph text-sm uppercase tracking-wider ${getStatusColor(request.requestStatus)}`}>
                        {request.requestStatus || 'Pending'}
                      </span>
                    </div>

                    <p className="font-paragraph text-sm text-foreground/80 mb-4 line-clamp-2">
                      {request.projectDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-accent/20">
                      <div className="flex items-center gap-2">
                        <Clock className="text-accent" size={16} />
                        <span className="font-paragraph text-xs text-foreground/70">
                          Submitted: {request._createdDate ? format(new Date(request._createdDate), 'MMM dd, yyyy') : 'N/A'}
                        </span>
                      </div>
                      {request.budgetRange && (
                        <div className="flex items-center gap-2">
                          <FileText className="text-accent" size={16} />
                          <span className="font-paragraph text-xs text-foreground/70">
                            Budget: {request.budgetRange}
                          </span>
                        </div>
                      )}
                      {request.deadline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="text-accent" size={16} />
                          <span className="font-paragraph text-xs text-foreground/70">
                            Deadline: {format(new Date(request.deadline), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      )}
                    </div>

                    {request.quotationAmount && (
                      <div className="mt-4 p-4 bg-accent/10 border border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="text-accent" size={20} />
                          <span className="font-heading text-base font-bold text-accent">
                            Quotation Received
                          </span>
                        </div>
                        <p className="font-paragraph text-sm text-foreground/80">
                          Amount: {request.quotationCurrency || '$'}{request.quotationAmount}
                        </p>
                        {request.quotationDate && (
                          <p className="font-paragraph text-xs text-foreground/70 mt-1">
                            Date: {format(new Date(request.quotationDate), 'MMM dd, yyyy')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-foreground/5 border border-accent/20">
                <FileText className="mx-auto mb-4 text-foreground/30" size={48} />
                <p className="font-paragraph text-lg text-foreground/50 mb-4">
                  No project requests yet
                </p>
                <Button
                  onClick={() => window.location.href = '/custom-request'}
                  className="bg-accent text-primary-foreground hover:bg-accent/90"
                >
                  Submit Your First Request
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
