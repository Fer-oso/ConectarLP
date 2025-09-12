import { useEffect, useRef, useState } from "react";

import ConstructionSlider from "./ConstructionSlider";

import "./styles/HeroStyles.css";

interface HeroProps {
  onScrollToForm: () => void;
  openCollabModal: () => void;
  onOpenInstagram: () => void;
}

const Hero: React.FC<HeroProps> = ({
  onScrollToForm,
  openCollabModal,
  onOpenInstagram,
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  const [changeView, setChangeView] = useState(true);

  useEffect(() => {
    const counterEl = counterRef.current;
    if (!counterEl) return;

    const target =
      parseInt(counterEl.textContent?.replace(/\D/g, "") || "0", 10) || 0;
    counterEl.textContent = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          const duration = prefersReduced ? 0 : 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            const value = Math.floor(target * (duration ? ease : 1));
            counterEl.textContent = value.toLocaleString("es-AR");
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
    <section
      className="hero flex flex-col items-center justify-center relative overflow-hidden gap-3 w-[1280px] "
      id="inicio"
      aria-labelledby="hero-heading"
    >
      <ConstructionSlider
        openCollabModal={openCollabModal}
        onScrollToForm={onScrollToForm}
        counterRef={counterRef}
      />

      {/*
   <button onClick={()=>setChangeView(!changeView)}><EyeIcon /></button>
    {changeView ? <>
    
         <ConstructionSlider onOpenModal={onOpenModal} onScrollToForm={onScrollToForm} counterRef={counterRef}/>

    </> : <>
     <ConstructionGrid onOpenModal={onOpenModal} onScrollToForm={onScrollToForm} counterRef={counterRef}/>
    </>
    
    }
*/}
    </section>
  );
};

export default Hero;
