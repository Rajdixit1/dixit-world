import * as React from 'react';
import { Layout, Code, Bot, GitBranch, Share2, Rocket } from 'lucide-react';
import { Button } from './Button';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  whatsAppMessage: string;
}

const SERVICES: Service[] = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Business Websites',
    description: 'Clean, responsive websites that explain your business and make it easy for customers to contact you.',
    benefit: 'Establish credibility and give customers a clear way to reach you.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss a Business Website project.',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Custom Web Applications',
    description: 'Dashboards, portals, and tools designed around your workflow.',
    benefit: 'Tailored software that fits how your team already works.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss a Custom Web Application project.',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'AI Chatbots & Knowledge Assistants',
    description: 'Help customers find answers and help teams use their business information.',
    benefit: '24/7 customer support and instant access to internal knowledge.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss an AI Chatbot project.',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Workflow Automation',
    description: 'Reduce repetitive manual work with practical automated processes.',
    benefit: 'Free up your team to focus on higher-value work.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss Workflow Automation.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'API Integrations',
    description: 'Connect existing tools and services into a smoother workflow.',
    benefit: 'Eliminate manual data entry between systems.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss API Integrations.',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Deployment & Technical Support',
    description: 'Assistance with launching, configuring, and maintaining digital products.',
    benefit: 'Launch with confidence and keep your product running smoothly.',
    whatsAppMessage: 'Hi Dixit World, I would like to discuss Deployment & Support.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Technology that works for your business.
          </h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
            Choose the solution that fits your goals. Each service includes a
            focused conversation about your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-xl border border-slate-200 bg-warm-white hover:border-blue-300/50 hover:shadow-medium transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">
                {service.title}
              </h3>
              <p className="text-navy-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-start gap-2 mt-6 pt-6 border-t border-slate-100">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full shrink-0 mt-1" />
                <span className="text-sm font-medium text-navy-800 leading-tight">
                  {service.benefit}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                href={`https://wa.me/919905105846?text=${encodeURIComponent(service.whatsAppMessage)}`}
                className="mt-6 w-full text-xs md:text-sm"
              >
                Discuss this service
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}