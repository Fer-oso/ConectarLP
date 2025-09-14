import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useMobileMenu } from "../../hooks/useMobileMenu";
import { useResponsive } from "../../hooks/useResponsive";
import { DesktopNav } from "./DesktopNav";
import { MenuMobile } from "./MenuMobile";
import { ButtonGhost } from "../buttons/ButtonGhost";
import { Button } from "../buttons/Button";

import "./styles/HeaderStyles.css";

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMenu, handleKeyDown } =
    useMobileMenu();

  const isScrolled = useScrollPosition(10);

  useResponsive(() => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });

  return (
    <>
      <header
        id="main-header"
        className={` ${isScrolled ? "scrolled" : ""}`}
        onKeyDown={handleKeyDown}
      >
        <div className="flex justify-between items-center mx-auto w-[1280px]">
          <img src="/logo2.png" alt="Conectar Logo" className="h-12 w-auto" />

          <DesktopNav />

          <div className="flex items-center gap-2">
            <ButtonGhost
              className="btn-ghost"
              to="https://www.instagram.com/conectar_construccion/"
              target="_blank"
              children={<FaInstagram />}
            />

            <ButtonGhost
              className="btn-ghost"
              to={"/wa"}
              target="_blank"
              children={<FaWhatsapp />}
            />

            <Button className="btn-primary" onClick={onOpenModal}>
              Únete ahora
            </Button>
          </div>

          <MenuMobile
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
