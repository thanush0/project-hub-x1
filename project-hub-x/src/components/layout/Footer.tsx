import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-accent/20 mt-32">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-accent mb-4">ProjectHubX</h3>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
              Your gateway to academic and real-world projects. Unleash your potential with our innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4 uppercase">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/custom-request" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Custom Project
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4 uppercase">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="font-paragraph text-sm text-foreground/70 hover:text-accent transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4 uppercase">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@projecthubx.com"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/50">
              © {currentYear} ProjectHubX. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-foreground/50">
              Built with innovation and passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
