import { Play } from "lucide-react";

import "./styles/ConstructionGridStyles.css";
import { useState } from "react";
import InstagramModal from "../InstagramModal";
import { mockupInstagramModalData } from "../../data/mockupInstagramModalData";

interface ConstructionGridProps {
  onScrollToForm: () => void;
  openCollabModal: () => void;
}

const ConstructionGrid: React.FC<ConstructionGridProps> = ({
  openCollabModal,
  onScrollToForm,
}) => {
  const [instagramModal, setInstagramModal] = useState({
    isOpen: true,
    videoUrl: "",
    title: "",
    description: "",
  });

  const openInstagramModal = (
    videoUrl: string,
    title: string,
    description: string
  ) => {
    setInstagramModal({ isOpen: true, videoUrl, title, description });
  };

  const closeInstagramModal = () => {
    setInstagramModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="hero-grid">
      <div className="hero-left space-y-5">
        <div className="urgency" aria-label="Oferta especial de lanzamiento">
          🎯 Lanzamiento: primeras campañas la semana que viene — sumate ahora
        </div>
        <h1 id="hero-heading" className="text-4xl sm:text-5xl font-extrabold">
          Transformá tu contenido en oportunidades reales de negocio
        </h1>
        <p className="lead">
          Conectar es la plataforma que une profesionales y clientes del rubro
          construcción. Publicamos tu contenido como colaboración y te exponemos
          frente a una audiencia segmentada y real, sin costos ocultos.
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={openCollabModal}>
            Aplicar ahora
          </button>
          <button className="btn-secondary" onClick={onScrollToForm}>
            Ver requisitos
          </button>
        </div>

        <div className="small-note">
          Publicaciones colaborativas • Reels destacados • Audiencia segmentada
          del sector
        </div>
      </div>

      <div className="mockup">
        <div className="mockup-header">
          <div className="mockup-dot"></div>
          <div className="mockup-dot"></div>
          <div className="mockup-dot"></div>
          <div className="mockup-bar"></div>
        </div>

        <div className="screen">
          {mockupInstagramModalData.map((item) => (
            <div
              key={item.id}
              className="post"
              data-video={item.videoUrl}
              data-title={item.title}
              data-description={item.description}
            >
              <div className="thumb">
                <img src={item.image} />
              </div>
              <div className="meta">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <div className="play-overlay">
                <Play
                  size={48}
                  color="white"
                  onClick={() =>
                    openInstagramModal(
                      item.videoUrl,
                      item.title,
                      item.description
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <InstagramModal
        isOpen={instagramModal.isOpen}
        onClose={closeInstagramModal}
        videoUrl={instagramModal.videoUrl}
        title={instagramModal.title}
        description={instagramModal.description}
      />
    </div>
  );
};

export default ConstructionGrid;
