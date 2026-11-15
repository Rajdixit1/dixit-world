import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useRef, useState, useEffect } from 'react';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    let particles: any[] = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors = [
      { r: 59, g: 130, b: 246, hue: 210 },
      { r: 37, g: 99, b: 235, hue: 215 },
      { r: 20, g: 184, b: 166, hue: 170 },
      { r: 160, g: 38, b: 183, hue: 300 },
    ];

    function initParticles() {
      particles = [];
      const count = reducedMotion ? 20 : (isMobile ? 30 : 50);
      for (let i = 0; i < count; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          hue: c.hue,
        });
      }
    }

    initParticles();

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseX = width / 2;
      mouseY = height / 2;
    });

    window.addEventListener('resize', () => {
      const newWidth = canvas.width = window.innerWidth;
      const newHeight = canvas.height = window.innerHeight;
      mouseX = newWidth / 2;
      mouseY = newHeight / 2;
      initParticles();
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      gradient.addColorStop(0, 'rgba(11, 15, 25, 0.8)');
      gradient.addColorStop(1, 'rgba(11, 15, 25, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;

      particles.forEach((p1: any, i: number) => {
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        p1.x = (p1.x + width) % width;
        p1.y = (p1.y + height) % height;

        const dx = p1.x - mouseX;
        const dy = p1.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 150;
          p1.x -= Math.cos(angle) * force * 3;
          p1.y -= Math.sin(angle) * force * 3;
        }

        particles.forEach((p2: any, j: number) => {
          if (i >= j) return;
          const dx2 = p1.x - p2.x;
          const dy2 = p1.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120 && !reducedMotion) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - dist2 / 120)})`;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, 0.5)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p1.hue}, 70%, 55%)`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvas.removeEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      canvas.removeEventListener('mouseleave', () => {
        mouseX = width / 2;
        mouseY = height / 2;
      });
      window.removeEventListener('resize', () => {
        const newWidth = canvas.width = window.innerWidth;
        const newHeight = canvas.height = window.innerHeight;
        mouseX = newWidth / 2;
        mouseY = newHeight / 2;
        initParticles();
      });
    };
  }, [canvasRef, isMobile]);
  return (
    <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Web Development • AI Solutions • Automation
            </span>

            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-tight mb-6 text-white break-normal">
              Your next big idea<span className="relative z-10 inline-block [&_span]:text-gradient-from-cyan-400 [&_span]:text-gradient-to-purple-400 [&_span]:text-transparent [&_span]:after:absolute [&_span]:after:left-0 [&_span]:after:w-full [&_span]:after:h-0.5 [&_span]:after:bg-gradient-to-r [&_span]:after:from-cyan-400 [&_span]:after:to-purple-400"> next big idea</span>.<br />
              Built for the real world.
            </h1>

            <p className="text-lg text-navy-700 max-w-lg leading-relaxed">
              We create fast websites, practical AI tools, and smart automation
              that help your business work better and serve customers with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                asChild
                href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project."
              >
                <ArrowRight className="w-5 h-5" /> Discuss Your Project
              </Button>
              <Button variant="outline" size="lg" asChild href="#services">
                Explore Services
              </Button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 text-sm text-navy-600">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy-900" />
                Mobile-first design
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy-900" />
                Business-focused solutions
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy-900" />
                Direct communication
              </div>
            </div>
          </div>

          <div className="relative h-[350px] lg:h-[450px] md:h-[500px] flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 rounded-lg opacity-30 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
}