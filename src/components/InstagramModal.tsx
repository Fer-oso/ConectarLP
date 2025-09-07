import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
}

const InstagramModal: React.FC<InstagramModalProps> = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title, 
  description 
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown as any);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown as any);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      id="video-modal"
      className={`modal instagram-modal ${isOpen ? 'show' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className="instagram-modal-content">
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h3 id="video-modal-title">{title}</h3>
          <p>{description}</p>
        </div>
        
        <div className="video-container">
          {/* Nota: Instagram no permite embeber videos directamente */}
          {/* En producción necesitarías usar su API oficial */}
          <iframe
            id="instagram-video"
            src={videoUrl}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            title={title}
          />
        </div>
        
        <div className="modal-footer">
          <p className="text-sm text-gray-400">
            💡 Este es un ejemplo de colaboración exitosa en nuestra comunidad
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramModal;