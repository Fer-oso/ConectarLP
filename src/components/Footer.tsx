import React from 'react';

interface FooterProps {
  onOpenInstagram: () => void;
  onDownloadGuide: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenInstagram, onDownloadGuide }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo.jpg" alt="Conectar" height="40" />
    
        </div>
        
        <p>
          La plataforma que conecta creadores de contenido con las mejores marcas de Argentina. 
          Monetizá tu talento y hacé crecer tu audiencia con colaboraciones auténticas.
        </p>
        
        <div className="footer-actions" style={{ marginBottom: '1rem' }}>
          <button className="btn-ghost" onClick={onOpenInstagram}>
            Seguinos en Instagram
          </button>
          <button className="btn-ghost" onClick={onDownloadGuide}>
            Descargar guía gratuita
          </button>
        </div>
        
        <div className="copyright">
          <p>&copy; <span id="year">{currentYear}</span> Conectar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;