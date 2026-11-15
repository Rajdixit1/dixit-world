import * as React from 'react';
import { useState } from 'react';
import { Mail, Phone, Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', service: '', description: '' });
  const [errors, setErrors] = useState<{ name?: boolean; service?: boolean; description?: boolean }>({});
  const [clipboardFeedback, setClipboardFeedback] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: boolean; service?: boolean; description?: boolean } = {};
    let valid = true;
    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!formData.service) {
      newErrors.service = true;
      valid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('sunil7557724933@gmail.com');
      setClipboardFeedback('success');
      setTimeout(() => setClipboardFeedback(null), 2000);
    } catch {
      setClipboardFeedback('error');
      setTimeout(() => setClipboardFeedback(null), 2000);
    }
  };

  const services = [
    'Business Websites',
    'Custom Web Applications',
    'AI Chatbots & Knowledge Assistants',
    'Workflow Automation',
    'API Integrations',
    'Deployment & Technical Support',
  ];

  const buildMessage = (): string => {
    return `New project enquiry from Dixit World website:

Name: ${formData.name}
Service Interested: ${formData.service}
Project Description: ${formData.description}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = buildMessage();
    const whatsAppUrl = `https://wa.me/919905105846?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab â€” visitor sends it themselves
    window.open(whatsAppUrl, '_blank');
  };

  const handleOpenEmail = () => {
    if (!validateForm()) return;

    const message = buildMessage();
    const emailUrl = `mailto:sunil7557724933@gmail.com?subject=Project Enquiry from Dixit World Website&body=${encodeURIComponent(message)}`;

    // Open email draft in the visitor's email application
    window.location.href = emailUrl;
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Let&rsquo;s build something useful.
          </h2>
          <p className="mt-4 text-lg text-navy-700">
            Tell us what you have in mind. We&rsquo;ll discuss the right next step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-700">WhatsApp</p>
                <a
                  href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  className="text-lg font-bold text-navy-900 hover:text-blue-600 transition-colors"
                >
                  +91 9905105846
                </a>
                <p className="text-sm text-navy-600 mt-1">
                  Tap to open WhatsApp conversation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-700">Email</p>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:sunil7557724933@gmail.com"
                    className="text-lg font-bold text-navy-900 hover:text-blue-600 transition-colors truncate"
                  >
                    sunil7557724933@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label={clipboardFeedback ? 'Copied!' : 'Copy email address'}
                  >
                    {clipboardFeedback === 'success' ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : clipboardFeedback === 'error' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-navy-600 mt-1">
                  Opens your email application
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-navy-600 leading-relaxed">
                This opens WhatsApp or your email app. Nothing is sent
                automatically. You review and send the message yourself.
              </p>
            </div>
          </div>          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1">
                  Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white',
                  )}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-navy-700 mb-1">
                  Service Interested In <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    errors.service ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white',
                  )}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-navy-700 mb-1">
                  Project Description <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    errors.description ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white',
                  )}
                  placeholder="Tell us about your project..."
                />
              </div>

              <p className="text-xs text-navy-500">
                This opens WhatsApp or your email app. Nothing is sent
                automatically. We do not store your data.
              </p>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
              >
                Continue on WhatsApp
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleOpenEmail}
                  const message = `New project enquiry from Dixit World website:

Name: ${formData.name}
Service Interested: ${formData.service}
Project Description: ${formData.description}`;
                  window.location.href = `mailto:sunil7557724933@gmail.com?subject=Project Enquiry from Dixit World Website&body=${encodeURIComponent(message)}`;
                }}
                className="w-full py-3"
              >
                Open Email Draft
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

