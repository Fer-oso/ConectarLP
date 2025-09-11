import "./styles/MenuMobileStyles.css";

export function MenuMobile({
  isMobileMenuOpen,
  toggleMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}) {
  return (
    <>
      <button
        id="mobile-menu-btn"
        className={`menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
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
        className={`mobile ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
      >
        <a href="#inicio">Inicio</a>
        <a href="#que-es">Qué es</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#testimonios">Testimonios</a>
        <a href="#colabora">Colaborá</a>
      </nav>
    </>
  );
}
