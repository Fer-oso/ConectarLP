import { useState, useCallback } from "react";

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle("menu-open", newState);
      return newState;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("menu-open");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    },
    [isMobileMenuOpen, toggleMobileMenu]
  );

  return { isMobileMenuOpen, toggleMobileMenu, closeMenu, handleKeyDown };
}
