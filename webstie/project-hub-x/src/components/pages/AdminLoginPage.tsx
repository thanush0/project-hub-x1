/**
 * Admin Login Page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthService } from '@/integrations/cms-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await AdminAuthService.login(email, password);
      
      if (!session) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // Save session
      AdminAuthService.saveSession(session);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-foreground/5 border border-accent/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Admin Login
          </h1>
          <p className="font-paragraph text-foreground/60">
            Content Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="font-paragraph text-sm text-foreground/70">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@projecthubx.com"
              required
              className="bg-background border-accent/20 focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="font-paragraph text-sm text-foreground/70">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-background border-accent/20 focus:border-accent"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-background hover:bg-accent/90 h-12"
          >
            {loading ? (
              'Logging in...'
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Login to Admin Panel
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded">
          <p className="font-paragraph text-xs text-foreground/60 text-center">
            <strong>Default Credentials:</strong><br />
            Email: admin@projecthubx.com<br />
            Password: admin123
          </p>
        </div>
      </Card>
    </div>
  );
}
