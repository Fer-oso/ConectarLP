import { useEffect } from "react";

export function useResponsive(onResize: () => void) {
  useEffect(() => {
    const handleResize = () => onResize();

    window.addEventListener("resize", handleResize);
    handleResize(); // ejecuta al montar
    return () => window.removeEventListener("resize", handleResize);
  }, [onResize]);
}
