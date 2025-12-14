import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/#how-it-works', label: 'How it Works' },
    { path: '/custom-request', label: 'Custom Project' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-accent/20">
      <div className="max-w-[120rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold text-accent hover:text-accent/80 transition-colors">
            ProjectHubX
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-accent'
                    : 'text-foreground/70 hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-20 h-10 bg-accent/10 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={actions.logout} variant="default" className="bg-accent text-primary-foreground hover:bg-accent/90">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={actions.login} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                  Sign In
                </Button>
                <Button onClick={actions.login} variant="default" className="bg-accent text-primary-foreground hover:bg-accent/90">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-accent p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-accent/20 pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                    isActive(link.path)
                      ? 'text-accent'
                      : 'text-foreground/70 hover:text-accent'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {isLoading ? (
                  <div className="w-full h-10 bg-accent/10 animate-pulse" />
                ) : isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                        Dashboard
                      </Button>
                    </Link>
                    <Button onClick={() => { actions.logout(); setMobileMenuOpen(false); }} variant="default" className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => { actions.login(); setMobileMenuOpen(false); }} variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                      Sign In
                    </Button>
                    <Button onClick={() => { actions.login(); setMobileMenuOpen(false); }} variant="default" className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
