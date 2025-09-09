import { useState, useEffect } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({  onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.classList.toggle('menu-open', newState);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <header 
        id="main-header" 
        className={`${isScrolled ? 'scrolled' : ''}`}
        onKeyDown={handleKeyDown}
      >
        <div className='flex justify-between items-center mx-auto w-[1350px]'>  
          
          <div className="logo-row">
          <img src="/logo2.png" alt="Conectar Logo" />
        </div>
        <nav className="desktop-nav ">
          <ul>
          
            <li><a href="#que-es">Qué es</a></li>
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><a href="#colabora">Colaborá</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link className="btn-ghost" to='https://www.instagram.com/conectar_construccion/' target='_blank'>
            <FaInstagram/>
          </Link>
          <Link className='btn-ghost' to='/wa' target='_blank'><FaWhatsapp/></Link>
          <button className="btn-primary" onClick={onOpenModal}>
            Únete ahora
          </button>
        </div>
<button
          id="mobile-menu-btn"
          className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav 
          id="main-menu" 
          className={`mobile ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClick}
        >
          <a href="#inicio">Inicio</a>
          <a href="#que-es">Qué es</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#testimonios">Testimonios</a>
          <a href="#colabora">Colaborá</a>
        </nav></div>
      
      </header>
    </>
  );
};

export default Header;