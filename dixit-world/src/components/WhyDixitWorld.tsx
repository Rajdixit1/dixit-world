import { ShieldCheck, Zap, MessageCircle, Brain } from 'lucide-react';

const THEMES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Solutions shaped around your business',
    description: 'We design websites, apps, and automation around your actual workflow — not the other way around.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Clear and direct communication',
    description: 'No jargon, no hidden fees. You talk directly with us about your project, every step of the way.',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Attention to speed and usability',
    description: 'Fast-loading, mobile-friendly websites and tools that your customers will actually enjoy using.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Practical use of AI and automation',
    description: 'We apply AI where it genuinely helps — answering questions, reducing repetitive work, and connecting your tools.',
  },
];

export function WhyDixitWorld() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Why Dixit World
          </h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
            What sets us apart — in plain language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {THEMES.map((theme, idx) => (
            <div key={idx} className="p-8 rounded-xl border border-slate-200 bg-warm-white hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                {theme.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">{theme.title}</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {theme.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}