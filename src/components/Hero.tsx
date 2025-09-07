import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onOpenModal: () => void;
  onOpenInstagram: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToForm, onOpenModal, onOpenInstagram }) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counterEl = counterRef.current;
    if (!counterEl) return;

    const target = parseInt(counterEl.textContent?.replace(/\D/g, '') || '0', 10) || 0;
    counterEl.textContent = '0';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const duration = prefersReduced ? 0 : 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            const value = Math.floor(target * (duration ? ease : 1));
            counterEl.textContent = value.toLocaleString('es-AR');
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(counterEl);
    return () => observer.disconnect();
  }, []);

  return (
   <section className="hero" id="inicio" aria-labelledby="hero-heading">
    <div className="hero-grid">
      <div className="hero-left space-y-5">
        <div className="urgency" aria-label="Oferta especial de lanzamiento">🎯 Lanzamiento: primeras campañas la semana que viene — sumate ahora</div>
        <h1 id="hero-heading" className='text-4xl sm:text-5xl font-extrabold'>Transformá tu contenido en oportunidades reales de negocio</h1>
        <p className="lead">Conectar es la plataforma que une profesionales y clientes del rubro construcción. Publicamos tu contenido como colaboración y te exponemos frente a una audiencia segmentada y real, sin costos ocultos.</p>
          
          <div className="hero-cta">
            <button className="btn-primary" onClick={onOpenModal}>
              Aplicar ahora
            </button>
            <button className="btn-secondary" onClick={onScrollToForm}>
              Ver requisitos
            </button>
          </div>
          
          <p className="small-note">
            Ya somos <strong><span id="counter" ref={counterRef}>2847</span></strong> creadores 
            conectando con marcas. ¿Te sumás?
          </p>
        </div>

        <div className="mockup">
          <div className="mockup-header">
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
            <div className="mockup-bar"></div>
          </div>
          
          <div className="screen">
            <div className="post" data-video="https://www.instagram.com/reel/example1">
              <div className="thumb">📱</div>
              <div className="meta">
                <h4 className='font-bold'>Colaboración con Nike</h4>
                <p>Reel sobre zapatillas deportivas - $45.000</p>
              </div>
              <div className="play-overlay">
                <Play size={48} color="white"/>
              </div>
            </div>
            
            <div className="post" data-video="https://www.instagram.com/reel/example2">
              <div className="thumb">🎨</div>
              <div className="meta">
                <h4>Campaña Coca-Cola</h4>
                <p>Story + Post sobre verano - $28.000</p>
              </div>
              <div className="play-overlay">
                <Play size={48} color="white" />
              </div>
            </div>
            
            <div className="post" data-video="https://www.instagram.com/reel/example3">
              <div className="thumb">💄</div>
              <div className="meta">
                <h4>Collab con Maybelline</h4>
                <p>Tutorial de maquillaje - $32.000</p>
              </div>
              <div className="play-overlay">
                <Play size={48} color="white" />
              </div>
            </div>
            
            <div className="post" data-video="https://www.instagram.com/reel/example4">
              <div className="thumb">🍔</div>
              <div className="meta">
                <h4>McDonald's Argentina</h4>
                <p>Reseña de nueva hamburguesa - $22.000</p>
              </div>
              <div className="play-overlay">
                <Play size={48} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;