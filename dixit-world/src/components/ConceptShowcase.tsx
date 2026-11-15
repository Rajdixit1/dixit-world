import React, { useEffect } from 'react';

interface Concept {
  title: string;
  subtitle: string;
  preview: React.ReactNode;
}

function handleGetStarted() {
  const text = "Hi, I am interested in your Professional Services.";
  window.open(`https://wa.me/919905105846?text=${encodeURIComponent(text)}`, '_blank');
}

function handleLearnMore() {
  alert('This is a demo for a Service Business Website.');
}

function handleSendClick() {
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  const chatBox = document.getElementById('chat-messages') as HTMLElement | null;

  if (!input || !chatBox) return;
  const message = input.value;
  if (message.trim() === '') return;

  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'flex justify-end mb-3';
  userMsgDiv.innerHTML = `<div class="max-w-[80%] bg-white border border-slate-200 text-sm p-3 rounded-xl rounded-tl-none text-navy-900 shadow-sm">${message}</div>`;

  input.value = '';
  chatBox.appendChild(userMsgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'flex justify-start';
    aiMsgDiv.innerHTML = `<div class="max-w-[80%] bg-blue-600 text-white text-sm p-3 rounded-xl rounded-tr-none shadow-sm">This is an automated demo response.</div>`;
    chatBox.appendChild(aiMsgDiv);
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
  const icon = event.currentTarget.querySelector('svg') as SVGElement | null;
  if (icon) {
    icon.style.transition = "transform 0.5s";
    icon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      icon.style.transition = "none";
      icon.style.transform = "rotate(0deg)";
    }, 500);
  }
}

function handleThemeToggle(event: React.MouseEvent) {
  const card = event.currentTarget.closest('.concept-card') as HTMLElement | null;
  if (card) {
    card.classList.toggle('dark-mode');
  }
}

export function ConceptShowcase() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dark-mode { background-color: #1a1a1a !important; color: #ffffff !important; }
      .dark-mode .bg-slate-50 { background-color: #2d2d2d !important; }
      .dark-mode .bg-white { background-color: #1a1a1a !important; }
      .dark-mode .border-slate-200 { border-color: #4a4a4a !important; }
      .dark-mode .text-navy-900 { color: #ffffff !important; }
      .dark-mode .text-navy-600, .dark-mode .text-navy-700 { color: #cccccc !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const CONCEPTS: Concept[] = [
    {
      title: 'Service Business Website',
      subtitle: 'A clean, responsive site for local businesses',
      preview: (
        <div className="concept-card flex flex-col h-[300px] w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">D</div>
              <span className="text-sm font-bold text-navy-900">Acme Co.</span>
            </div>
            <div className="hidden sm:flex gap-4 text-xs font-medium text-navy-600">
              <span>Services</span><span>About</span><span>Contact</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold text-navy-900 mb-2">Professional Services</h3>
            <p className="text-sm text-navy-600 mb-5 max-w-sm">Helping local businesses grow online with clean, fast websites.</p>
            <div className="flex gap-3">
              <button onClick={handleGetStarted} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-500 transition-colors">Get Started</button>
              <button onClick={handleLearnMore} className="px-4 py-2 bg-white text-navy-900 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors">Learn More</button>
            </div>
          </div>

          <div className="mt-auto px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-[10px] font-semibold text-navy-700 uppercase tracking-wide">Illustrative Only</span>
          </div>
        </div>
      ),
    },
    {
      title: 'AI Customer Support Interface',
      subtitle: 'Chatbot interface for customer inquiries',
      preview: (
        <div className="concept-card flex flex-col h-[300px] w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="bg-navy-900 p-3 flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-bold">AI</div>
            <span className="text-xs font-medium">Support Assistant</span>
          </div>
          
          <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            <div className="flex justify-start mb-3">
              <div className="max-w-[80%] bg-blue-600 text-white text-xs p-2.5 rounded-xl rounded-tr-none">Hi! How can I help you today?</div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-white border border-slate-200 text-xs p-2.5 rounded-xl rounded-tl-none text-navy-900 shadow-sm">Do you build AI chatbots?</div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input type="text" id="chat-input" className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Type a message..." onKeyDown={handleKeyDown} />
              <button onClick={handleSendClick} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-500 transition-colors">Send</button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Business Operations Dashboard',
      subtitle: 'Dashboard for managing business operations',
      preview: (
        <div className="concept-card flex flex-col h-[300px] w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">B</div>
              <span className="text-xs font-bold text-navy-900">Ops Dashboard</span>
            </div>
            <div className="flex gap-1.5">
              <button onClick={handleRefreshClick} className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-navy-600 hover:bg-slate-100 bg-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button onClick={handleThemeToggle} className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-navy-600 hover:bg-slate-100 bg-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 grid grid-cols-2 gap-3 overflow-y-auto bg-white">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <div className="text-[10px] font-semibold text-navy-600 mb-1">Metric {i}</div>
                <div className="text-lg font-bold text-navy-900">—</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-navy-900">Concept Previews</h2>
          <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">Sample interface concepts showing how your digital product could look.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {CONCEPTS.map((concept) => (
            <div key={concept.title} className="flex flex-col w-full">
              <div className="mb-4 w-full">
                {concept.preview}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Concept Preview</span>
              </div>
              <h3 className="text-lg font-bold text-navy-900">{concept.title}</h3>
              <p className="text-sm text-navy-600">{concept.subtitle}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}