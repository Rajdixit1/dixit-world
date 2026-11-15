import { Mail, Phone, ArrowRight } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-900 text-navy-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#0f172a" />
                  <path d="M16 4C10.477 4 6 8.477 6 14C6 16.477 7.696 18.602 10.121 19.793L13.536 16.379C12.345 15.188 12 13.683 12 12C12 9.243 14.243 7 17 7C19.757 7 22 9.243 22 12C22 13.683 21.655 15.188 20.464 16.379L23.879 19.793C26.304 18.602 28 16.477 28 14C28 8.477 23.523 4 16 4Z" fill="#3b82f6" />
                  <circle cx="16" cy="16" r="2" fill="#14b8a6" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Dixit World</span>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed">
              Websites. AI. Automation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <a href="https://wa.me/919905105846" className="text-sm text-navy-400 hover:text-white transition-colors">
                    +91 9905105846
                  </a>
                  <p className="text-xs text-navy-500 mt-0.5">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:sunil7557724933@gmail.com" className="text-sm text-navy-400 hover:text-white transition-colors">
                    sunil7557724933@gmail.com
                  </a>
                  <p className="text-xs text-navy-500 mt-0.5">Email</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  className="flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" /> Let&rsquo;s Talk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-navy-500">
            {CURRENT_YEAR} Dixit World. All rights reserved.
          </p>
          <p className="text-xs text-navy-500">
            No database. No tracking. Just direct communication.
          </p>
        </div>
      </div>
    </footer>
  );
}