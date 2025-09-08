import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, TrendingUp, Award } from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats?: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
  cta?: string;
}

interface ConstructionSliderProps {
  onScrollToForm: () => void;
  onOpenModal: () => void;
  counterRef: any;
}

const ConstructionSlider: React.FC<ConstructionSliderProps> = ({onOpenModal,onScrollToForm,counterRef}) => {
    
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Conectá con profesionales de la construcción",
      subtitle: "Plataforma líder en el sector",
      description: "Más de 1,250 profesionales confían en nuestra plataforma para generar leads calificados y hacer crecer sus negocios.",
      image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      stats: [
        { icon: <Users size={20} />, value: "1,250+", label: "Profesionales" },
        { icon: <TrendingUp size={20} />, value: "85%", label: "Más leads" },
        { icon: <Award size={20} />, value: "4.8★", label: "Valoración" }
      ],
      cta: "Únete ahora"
    },
    {
      id: 2,
      title: "Proyectos que transforman espacios",
      subtitle: "Inspiración y resultados reales",
      description: "Descubrí cómo nuestros colaboradores han transformado espacios y generado oportunidades de negocio exitosas.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      stats: [
        { icon: <Play size={20} />, value: "500+", label: "Proyectos" },
        { icon: <TrendingUp size={20} />, value: "120%", label: "ROI promedio" },
        { icon: <Users size={20} />, value: "2,800", label: "Clientes" }
      ],
      cta: "Ver proyectos"
    },
    {
      id: 3,
      title: "Herramientas y materiales de calidad",
      subtitle: "Proveedores verificados",
      description: "Conectamos con los mejores proveedores del sector. Materiales de calidad, precios competitivos y entregas puntuales.",
      image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      stats: [
        { icon: <Award size={20} />, value: "150+", label: "Proveedores" },
        { icon: <TrendingUp size={20} />, value: "98%", label: "Satisfacción" },
        { icon: <Users size={20} />, value: "24/7", label: "Soporte" }
      ],
      cta: "Explorar catálogo"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <>
      {/* Slider como elemento principal */}
        <div className="hero-slider-section">
        
        
     <div className="construction-slider">
      <div className="slider-container">
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide">
              <div className="slide-content">
                <div className="slide-text">
                  <div className="slide-badge">
                    {slide.subtitle}
                  </div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  
                  {slide.stats && (
                    <div className="slide-stats">
                      {slide.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="stat-item">
                          <div className="stat-icon">{stat.icon}</div>
                          <div className="stat-content">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="slide-image">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          className="slider-nav slider-nav-prev" 
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          className="slider-nav slider-nav-next" 
          onClick={nextSlide}
          aria-label="Siguiente slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots indicator */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="slider-progress">
          <div 
            className="progress-bar"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>

    {/* Contenido de texto debajo del slider */}
        <div className="hero-content-section">
          <div className="hero-content-wrapper">
            <div className="urgency">
              🔥 Últimas 48 horas para aplicar
            </div>
            
            <h1 className='text-4xl font-bold m-auto'>Conectá con marcas que buscan tu talento</h1>
            <p className="lead mx-auto">
              Únete a la comunidad de creadores más exclusiva de Argentina. 
              Accede a colaboraciones pagadas con las mejores marcas del país.
            </p>
            
            <div className="hero-cta justify-center">
              <button className="btn-primary" onClick={onOpenModal}>
                Aplicar ahora
              </button>
              <button className="btn-secondary" onClick={onScrollToForm}>
                Ver requisitos
              </button>
            </div>
            
            <p className="small-note m-auto">
              Ya somos <strong><span id="counter" ref={counterRef}>2847</span></strong> creadores 
              conectando con marcas. ¿Te sumás?
            </p>
          </div>
        </div>

</div>
       
    </>

   
  );
};

export default ConstructionSlider;