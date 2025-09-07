import React, { useState, useEffect } from 'react';

interface StickyBannerProps {
  onScrollToForm: () => void;
}

const StickyBanner: React.FC<StickyBannerProps> = ({ onScrollToForm }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    const formSection = document.getElementById('colabora');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) {
            if (!entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          }
          if (entry.target === formSection) {
            if (entry.isIntersecting) {
              setIsVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (hero) observer.observe(hero);
    if (formSection) observer.observe(formSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="sticky-cta" className={`sticky-cta ${isVisible ? 'visible' : ''}`}>
      <div className="text">
        <strong>¿Listo para monetizar tu contenido?</strong>
        <p>Únete a +2800 creadores que ya están colaborando con marcas</p>
      </div>
      <button className="btn-primary" onClick={onScrollToForm}>
        Aplicar ahora
      </button>
    </div>
  );
};

export default StickyBanner;