import { Play } from "lucide-react";

interface ConstructionGridProps {
  onScrollToForm: () => void;
  onOpenModal: () => void;
  counterRef: any;
}


const ConstructionGrid: React.FC<ConstructionGridProps>=({onOpenModal,onScrollToForm,counterRef})=>{

    return(
        <div className="hero-grid">
              <div className="hero-left space-y-5">
                <div className="urgency " aria-label="Oferta especial de lanzamiento">🎯 Lanzamiento: primeras campañas la semana que viene — sumate ahora</div>
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
    )
}

export default ConstructionGrid;