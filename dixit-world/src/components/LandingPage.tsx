import React, { useState, useEffect, useRef } from 'react';

// === 1. PARTICLE NETWORK BACKGROUND COMPONENT ===
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Slow movement (0.3 speed)
        this.directionX = (Math.random() - 0.5) * 0.3;
        this.directionY = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2.5 + 1.5; // Bigger dots
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.8)'; // Brighter blue dots
        ctx.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        // Smooth Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            // Repel effect
            this.x -= forceDirectionX * force * 1.5;
            this.y -= forceDirectionY * force * 1.5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas!.height * canvas!.width) / 10000; // Slightly more particles
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas!.width;
        let y = Math.random() * canvas!.height;
        particlesArray.push(new Particle(x, y));
      }
    }

    function connect() {
      if (!ctx) return;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          
          // Bigger network distance
          if (distance < (canvas!.width / 7) * (canvas!.height / 7)) {
            let opacityValue = 1 - (distance / 30000);
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacityValue * 0.3})`; // Smooth lines
            ctx.lineWidth = 1.2; // Thicker professional lines
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // Fixed so it stays in background while scrolling
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, 
        pointerEvents: 'none',
        opacity: 0.7,
        // Professional fade-in effect
        animation: 'fadeIn 2s ease-in-out forwards' 
      }}
    />
  );
};

// === 2. MAIN LANDING PAGE ===
export function LandingPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', service: '', description: '' });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 0.7; } }
      .dark-input { background-color: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; }
      .dark-input:focus { outline: none; border-color: #3b82f6 !important; }
      .dark-input::placeholder { color: #71717a !important; }
      .dark-input option { background-color: #18181b; color: #fff; }
      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleSendClick = () => {
    const input = document.getElementById('chat-input') as HTMLInputElement | null;
    const chatBox = document.getElementById('chat-messages') as HTMLElement | null;
    if (!input || !chatBox) return;
    const message = input.value;
    if (message.trim() === '') return;

    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'flex justify-end mb-3';
    userMsgDiv.innerHTML = `<div style="max-width:80%; background:#3b82f6; color:white; padding:10px 14px; border-radius:12px; border-top-right-radius:0; font-size:14px;">${message}</div>`;
    
    input.value = '';
    chatBox.appendChild(userMsgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const aiMsgDiv = document.createElement('div');
      aiMsgDiv.className = 'flex justify-start';
      aiMsgDiv.innerHTML = `<div style="max-width:80%; background:rgba(255,255,255,0.1); color:#e4e4e7; padding:10px 14px; border-radius:12px; border-top-left-radius:0; font-size:14px;">This is an automated demo response. In a real scenario, I would answer your query.</div>`;
      chatBox.appendChild(aiMsgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendClick();
      event.preventDefault();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.service || !formData.description) {
      setErrors({ all: true });
      return;
    }
    const msg = `New Project Enquiry:\nName: ${formData.name}\nService: ${formData.service}\nDetails: ${formData.description}`;
    window.open(`https://wa.me/919905105846?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const servicesList = [
    { title: 'Business Websites', desc: 'Clean, responsive websites that explain your business and convert visitors.', icon: '💻' },
    { title: 'Custom Web Apps', desc: 'Dashboards, portals, and tools designed around your specific workflow.', icon: '⚙️' },
    { title: 'AI Chatbots', desc: 'Help customers find answers and teams use business information efficiently.', icon: '🤖' },
    { title: 'Workflow Automation', desc: 'Reduce repetitive manual work with practical automated processes.', icon: '⚡' },
    { title: 'API Integrations', desc: 'Connect existing tools and services into a smoother workflow.', icon: '🔗' },
    { title: 'Deployment & Support', desc: 'Assistance with launching, configuring, and maintaining digital products.', icon: '🚀' },
  ];

  return (
    <div style={{ backgroundColor: '#09090b', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative' }}>
      
      {/* Background Network Animation */}
      <ParticleBackground />

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Dixit<span style={{ color: '#3b82f6' }}>World</span></div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#a1a1aa' }}>
          <a href="#services" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Services</a>
          <a href="#concepts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Concepts</a>
          <a href="#contact" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contact</a>
        </div>
        <a href="https://wa.me/919905105846" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '10px 24px', borderRadius: '999px', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
          Let's Talk
        </a>
      </nav>

      {/* Hero Section with Image Background */}
      <div style={{ 
        position: 'relative', 
        backgroundImage: 'url("/hero-bg.webp")', // Make sure the image is in the public folder
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        borderRadius: '0 0 40px 40px',
        overflow: 'hidden',
        margin: '0 20px'
      }}>
        {/* Dark Overlay so text is readable over the image */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(9, 9, 11, 0.75)', zIndex: 1 }} />
        
        <main style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '120px', paddingBottom: '140px', textAlign: 'center', position: 'relative', zIndex: 10, paddingLeft: '24px', paddingRight: '24px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#93c5fd', fontSize: '14px', marginBottom: '32px', backdropFilter: 'blur(5px)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 10px #3b82f6' }} /> Available for new projects
          </div>
          <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', margin: '0 0 24px 0', color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            Build Digital Products <br />
            <span style={{ background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              That Actually Work.
            </span>
          </h1>
          <p style={{ fontSize: '18px', color: '#d4d4d8', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            We create fast websites, practical AI tools, and smart automation that help your business work better and serve customers with confidence.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="#contact" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)', transition: 'transform 0.2s' }}>
              Discuss Your Project
            </a>
          </div>
        </main>
      </div>

      {/* Services Section */}
      <section id="services" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Technology that works for you.</h2>
          <p style={{ color: '#a1a1aa' }}>Choose the solution that fits your goals.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {servicesList.map((s, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(24, 24, 27, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '32px', marginBottom: '20px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#ffffff' }}>{s.title}</h3>
              <p style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concept Previews (Chatbot & Dashboard) */}
      <section id="concepts" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Interactive Previews</h2>
          <p style={{ color: '#a1a1aa' }}>Try our live chatbot demo below.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          
          {/* Chatbot Mockup */}
          <div style={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', height: '380px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>AI</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Support Assistant</div>
            </div>
            <div id="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
               <div className="flex justify-start mb-3">
                  <div style={{ maxWidth: '80%', backgroundColor: 'rgba(255,255,255,0.1)', color: '#e4e4e7', padding: '10px 14px', borderRadius: '12px', borderTopLeftRadius: '0', fontSize: '14px' }}>
                    Hi! I am an AI assistant. How can I help you today?
                  </div>
              </div>
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#18181b' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" id="chat-input" className="dark-input" style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', fontSize: '14px' }} placeholder="Type a message..." onKeyDown={handleKeyDown} />
                <button onClick={handleSendClick} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Send</button>
              </div>
            </div>
          </div>

          {/* Solution Explorer Mockup */}
          <div style={{ backgroundColor: 'rgba(24, 24, 27, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '24px' }}>
             <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#ffffff' }}>What would you like to improve?</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {["Bring my business online", "Answer customer questions", "Automate repetitive work"].map((opt) => (
                  <button key={opt} onClick={() => setSelectedOption(opt)} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '10px', backgroundColor: selectedOption === opt ? '#3b82f6' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px' }}>
                    {opt}
                  </button>
                ))}
             </div>
             <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: '14px', color: '#93c5fd', minHeight: '80px' }}>
               {selectedOption ? `We will build a custom solution to help you ${selectedOption.toLowerCase()}.` : 'Select an option above to see the solution.'}
             </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>Let's build something useful.</h2>
          <p style={{ color: '#a1a1aa' }}>Tell us what you have in mind.</p>
        </div>

        <form onSubmit={handleContactSubmit} style={{ backgroundColor: 'rgba(24, 24, 27, 0.8)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#a1a1aa' }}>Name</label>
            <input type="text" className="dark-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', fontSize: '14px' }} placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
             <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#a1a1aa' }}>Service</label>
             <select className="dark-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', appearance: 'none' }} value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
               <option value="">Select a service</option>
               {servicesList.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
             </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#a1a1aa' }}>Project Details</label>
            <textarea className="dark-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', minHeight: '100px', resize: 'vertical' }} placeholder="Tell us about your project..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          {errors.all && <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>Please fill all fields.</p>}
          <button type="submit" style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
            Continue on WhatsApp
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#71717a', fontSize: '14px', position: 'relative', zIndex: 10 }}>
        © {new Date().getFullYear()} Dixit World. All rights reserved.
      </footer>

    </div>
  );
}