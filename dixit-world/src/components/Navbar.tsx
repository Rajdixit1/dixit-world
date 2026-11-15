import { useState } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { Button } from './Button';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Process', href: '#process' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="bg-warm-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <span className="font-heading font-bold text-xl tracking-tight text-navy-900">
                Dixit World
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-navy-700 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="ghost" size="sm" asChild href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project.">
                <Phone className="w-4 h-4 mr-2" /> Let&rsquo;s Talk
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-warm-white border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium text-navy-700 hover:text-blue-600 py-3 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  variant="primary"
                  asChild
                  href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  className="w-full"
                >
                  Let&rsquo;s Talk on WhatsApp
                </Button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-6 top-6"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-navy-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}