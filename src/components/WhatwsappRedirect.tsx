import { useEffect } from "react";

export default function WhatsAppRedirect() {
  useEffect(() => {
    const phone = "1130586473"; // tu número con código de país
    const text = "Hola, quiero más información"; // mensaje inicial
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.location.href = url; // redirige automáticamente
  }, []);

  return <p>Redirigiendo a WhatsApp...</p>;
}