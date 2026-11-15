import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface SolutionOption {
  id: string;
  label: string;
  recommendedSolution: string;
  deliverables: string[];
  whatsAppMessage: string;
}

const SOLUTIONS: SolutionOption[] = [
  {
    id: 'online',
    label: 'Bring my business online',
    recommendedSolution:
      'A professional, mobile-responsive website that introduces your business, shares your services, and makes it easy for customers to contact you.',
    deliverables: [
      'Custom website design (up to 5 pages)',
      'Contact form and business details',
      'Mobile-optimized layout',
    ],
    whatsAppMessage:
      'Hi Dixit World, I want to bring my business online. Please share website options.',
  },
  {
    id: 'answer',
    label: 'Answer customer questions',
    recommendedSolution:
      'An AI chatbot or knowledge assistant trained on your business information, available 24/7 to answer common customer questions.',
    deliverables: [
      'AI chatbot trained on your FAQs and documents',
      'Website integration',
      'Escalation to human support when needed',
    ],
    whatsAppMessage:
      'Hi Dixit World, I want to add an AI chatbot to answer customer questions.',
  },
  {
    id: 'automate',
    label: 'Automate repetitive work',
    recommendedSolution:
      'Practical workflow automation that connects your existing tools and removes manual, repetitive tasks from your team’s day.',
    deliverables: [
      'Workflow audit and automation plan',
      'Tool integrations (email, sheets, CRM, etc.)',
      'Automated notifications and reports',
    ],
    whatsAppMessage:
      'Hi Dixit World, I want to automate repetitive work in my business.',
  },
  {
    id: 'application',
    label: 'Build a custom application',
    recommendedSolution:
      'A custom web application (dashboard, portal, or internal tool) designed around your specific workflow and business logic.',
    deliverables: [
      'Custom dashboard or portal',
      'User roles and permissions',
      'Deployment and launch support',
    ],
    whatsAppMessage:
      'Hi Dixit World, I want to build a custom web application.',
  },
];

export function SolutionExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = SOLUTIONS.find((s) => s.id === selectedId);

  return (
    <section id="solutions" className="py-20 lg:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            What would you like to improve?
          </h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
            Select an area to see a recommended solution and example
            deliverables.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 min-h-[500px]">
          <div className="lg:col-span-4 space-y-4">
            {SOLUTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedId(option.id)}
                className={cn(
                  'w-full py-5 px-6 rounded-xl border text-left transition-all',
                  selectedId === option.id
                    ? 'border-blue-500 bg-blue-50 text-navy-900 shadow-sm'
                    : 'border-slate-200 bg-white text-navy-700 hover:border-blue-300 hover:bg-blue-50',
                )}
              >
                <span className="text-base font-semibold">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            {selected ? (
              <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Recommended Solution
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  {selected.recommendedSolution}
                </h3>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-3">
                    Example Deliverables
                  </h4>
                  <ul className="space-y-3">
                    {selected.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-navy-600">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <p className="leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  asChild
                  className="w-full md:w-auto"
                  href={`https://wa.me/919905105846?text=${encodeURIComponent(selected.whatsAppMessage)}`}
                >
                  <ArrowRight className="w-4 h-4" /> Discuss This Solution
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <span className="text-slate-400 text-xl">?</span>
                </div>
                <p className="text-navy-600">
                  Select an option to see a recommended solution
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}