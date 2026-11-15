import { Phone } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919905105846?text=Hi%20Dixit%20World%2C%20I%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        <Phone className="w-7 h-7 text-white" />
      </div>
    </a>
  );
}