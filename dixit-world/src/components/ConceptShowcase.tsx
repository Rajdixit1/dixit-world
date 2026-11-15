import * as React from 'react';

React.useEffect(() => {
  const style = document.createElement('style');
  style.textContent = `
    .dark-mode {
      background-color: #1a1a1a !important;
      color: #ffffff !important;
    }
    .dark-mode .bg-slate-50 {
      background-color: #2d2d2d !important;
    }
    .dark-mode .border-slate-100 {
      border-color: #4a4a4a !important;
    }
    .dark-mode text-navy-900,
    .dark-mode text-navy-600,
    .dark-mode text-navy-700 {
      color: #ccc !important;
    }
    .dark-mode text-white {
      color: #ffffff !important;
    }
  `;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);

interface Concept {
  title: string;
  subtitle: string;
  preview: React.ReactNode;
}

const CONCEPTS: Concept[] = [
  {
    title: 'Service Business Website',
    subtitle: 'A clean, responsive site for local businesses',
    preview: (
      <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden relative bg-white">
        <div className="absolute inset-0 bg-slate-50/50" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">D</div>
            <span className="text-sm font-medium text-navy-900">Acme Co.</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-navy-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <h3 className="text-3xl font-bold text-navy-900 mb-2">Professional Services</h3>
          <p className="text-navy-600 mb-6 max-w-md mx-auto">Helping local businesses grow online with clean, fast websites that convert visitors into customers.</p>
          <div className="flex gap-3 justify-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
              onClick={handleGetStarted}
              type="button"
            >
              Get Started
            </button>
            <button
              className="px-6 py-2 bg-white text-navy-900 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              onClick={handleLearnMore}
              type="button"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs font-medium text-navy-700">Concept Preview — Illustrative Only</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'AI Customer Support Interface',
    subtitle: 'Chatbot interface for customer inquiries',
    preview: (
      <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden relative bg-white flex flex-col h-full">
        <div className="bg-navy-900 p-4">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-[10px]">AI</div>
            <span className="text-sm font-medium">Support Assistant</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-blue-600 text-white text-sm p-3 rounded-xl rounded-tr-none">Hi! I can help you with our services and pricing.</div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-white border border-slate-200 text-sm p-3 rounded-xl rounded-tl-none text-navy-900">Do you have AI chatbot solutions?</div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-blue-600 text-white text-sm p-3 rounded-xl rounded-tr-none">What are your pricing plans?</div>
          </div>
        </div>
        {/* Card 2: Chat input area */}
        <div className="p-4 pt-0 border-t border-slate-200 bg-white" id="ai-chat-container">
          <div className="flex gap-2">
            <input
              type="text"
              id="chat-input"
              className="flex-1 bg-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors"
              onClick={handleSendClick}
              type="button"
            >
              Send
            </button>
          </div>
        </div>-600 text-white text-sm p-3 rounded-xl rounded-tr-none">Yes, we build custom AI chatbots.</div>
          </div>
        </div>
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors disabled:opacity-50">Send</button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs font-medium text-navy-700">Concept Preview — Illustrative Only</span>
          </div>
        </div>
      </div>
    ),
  },  {
    title: 'Business Operations Dashboard',
    subtitle: 'Dashboard for managing business operations',
    preview: (
      <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden relative bg-white flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 bg-warm-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">B</div>
            <span className="text-sm font-bold text-navy-900">Ops Dashboard</span>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-navy-600 hover:bg-slate-100 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-navy-600 hover:bg-slate-100 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2.032 2.032 0 011.405-1.405M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          </div>
        </div>
        <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-xs font-semibold text-navy-600 mb-1">Metric {i}</div>
              <div className="text-2xl font-bold text-navy-900">—</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs font-medium text-navy-700">Concept Preview — Illustrative Only</span>
          </div>
        </div>
      </div>
    ),
  },
];
function handleGetStarted() {
  const text = "Hi, I am interested in your Professional Services.";
  window.open(`https://wa.me/919905105846?text=${encodeURIComponent(text)}`, '_blank');
}

function handleLearnMore() {
  alert('This is a demo for a Service Business Website.');
}

function handleSendClick() {
  const input = document.getElementById('chat-input') as HTMLInputElement;
  const chatBox = document.querySelector('#ai-chat-container .flex-1.overflow-y-auto.p-4.space-y-4') as HTMLElement;
  const message = input.value;

  if (message.trim() === '') return;

  // Append user message on the right side
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'max-w-[80%] bg-blue-600 text-white text-sm p-3 rounded-xl rounded-tr-none';
  userMsgDiv.style.marginLeft = 'auto';
  userMsgDiv.style.marginRight = '0';
  userMsgDiv.style.textAlign = 'right';
  userMsgDiv.innerHTML = message;

  // Clear input field
  input.value = '';

  // Append user message to chat box
  chatBox.appendChild(userMsgDiv);

  // Simulate AI response after 1-second delay
  setTimeout(() => {
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'max-w-[80%] bg-white border border-slate-200 text-sm p-3 rounded-xl rounded-tl-none';
    aiMsgDiv.style.marginLeft = '0';
    aiMsgDiv.style.marginRight = 'auto';
    aiMsgDiv.style.textAlign = 'left';
    aiMsgDiv.innerHTML = 'This is an automated demo response. In a real scenario, I would answer your query.';

    chatBox.appendChild(aiMsgDiv);

    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

function handleKeyDown(event: React.KeyboardEvent) {
  if (event.key === 'Enter') {
    handleSendClick();
    event.preventDefault();
  }
}

function handleRefreshClick(event: React.MouseEvent) {
  const icon = event.currentTarget.querySelector('svg') as SVGElement;
  icon.style.transition = "transform 0.5s";
  icon.style.transform = "rotate(360deg)";

  setTimeout(() => {
    icon.style.transition = "none";
    icon.style.transform = "rotate(0deg)";
  }, 500);
}

function handleThemeToggle(event: React.MouseEvent) {
  const card = event.currentTarget.closest('.aspect-video') as HTMLElement;
  card.classList.toggle('dark-mode');
}

export function ConceptShowcase() {

export function ConceptShowcase() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Concept Previews
          </h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
            Sample interface concepts showing how your digital product could
            look. These are illustrative designs, not live client projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CONCEPTS.map((concept) => (
            <div key={concept.title} className="group">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-warm-white shadow-sm hover:shadow-medium transition-shadow mb-4">
                {concept.preview}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-tighter">Concept Preview</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-navy-900">{concept.title}</h3>
              <p className="text-sm text-navy-600">{concept.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-navy-500">
            All previews are built with HTML/CSS and use demo data. They are
            not functional products.
          </p>
        </div>
      </div>
    </section>
  );
}
