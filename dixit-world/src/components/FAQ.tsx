import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQS = [
  {
    q: 'Can you build a website for a small business?',
    a: 'Yes. We build clean, responsive websites that explain your business and make it easy for customers to contact you. Every site is mobile-friendly and built to load quickly.',
  },
  {
    q: 'Can you add an AI chatbot to an existing website?',
    a: 'Yes. We can integrate an AI chatbot or knowledge assistant into your existing website, trained on your business information and FAQs.',
  },
  {
    q: 'Can you automate my current workflow?',
    a: 'Yes. We review your current process and build practical automation that connects your existing tools and reduces repetitive manual work.',
  },
  {
    q: 'How is project pricing decided?',
    a: 'Pricing depends on the scope of your project — the features, complexity, and time required. We discuss pricing after understanding your needs. Hosting, domain, and third-party service costs are discussed separately.',
  },
  {
    q: 'How long will a project take?',
    a: 'Timelines depend on the scope. A simple website may take a few weeks, while a custom web application or automation project could take longer. We provide an estimated timeline after discussing your requirements.',
  },
  {
    q: 'Can you help with hosting and domain setup?',
    a: 'Yes. We can assist with launching your website, configuring hosting, and setting up your domain. The actual costs for hosting, domain registration, and third-party services are discussed separately and paid by you directly to the providers.',
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-24 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-navy-700">
            Have a different question? Reach out on WhatsApp or email.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.q;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.q)}
                  className="flex w-full items-center justify-between p-6 text-left transition-all focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <h3 className="text-lg font-bold text-navy-900">
                    {faq.q}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-400" />
                  )}
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={cn(
                    'border-t border-slate-100 pb-6 pt-4 text-navy-600 text-sm leading-relaxed',
                    isOpen ? 'block' : 'hidden',
                  )}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}