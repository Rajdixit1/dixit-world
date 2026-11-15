const STEPS = [
  { number: '01', title: 'Discuss your goal', description: 'We listen to your ideas, understand your business, and identify the right solution together.' },
  { number: '02', title: 'Define scope and design', description: 'We outline the features, create a simple design, and agree on what will be built.' },
  { number: '03', title: 'Build and review', description: 'We build your solution step by step, sharing progress and incorporating your feedback.' },
  { number: '04', title: 'Launch and support', description: 'We help you launch, then provide ongoing support to keep everything running smoothly.' },
];

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            From your idea to a working solution.
          </h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
            A simple, transparent process designed for nontechnical customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">
                {step.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

