import { useState } from "react";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Section from "./components/Section";
import StickyBanner from "./components/StickyBanner";
import CollaborationModal from "./components/CollaborationModal";
import Footer from "./components/Footer";
import "./App.css";
import ConstructionGrid from "./components/hero/ConstructionGrid";

function App() {
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  const scrollToForm = () => {
    const formSection = document.getElementById("colabora");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const nameInput = document.getElementById("name") as HTMLInputElement;
        if (nameInput) nameInput.focus();
      }, 600);
    }
  };

  const openInstagram = () => {
    window.open("https://instagram.com/conectar", "_blank");
  };

  const openCollabModal = () => {
    setIsCollabModalOpen(true);
  };

  const closeCollabModal = () => {
    setIsCollabModalOpen(false);
  };

  const downloadGuide = () => {
    const blob = new Blob(
      [
        "Guía rápida para colaboraciones exitosas en @conectar.\n1) Reel educativo.\n2) CTA claro.\n3) Medí tus leads.",
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Guia-Colaboraciones-Conectar.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen mx-auto flex flex-col justify-center items-center w-[1280px] ">
      <Header onScrollToForm={scrollToForm} onOpenModal={openCollabModal} />

      <main>
        <Hero
          onScrollToForm={scrollToForm}
          openCollabModal={openCollabModal}
          onOpenInstagram={openInstagram}
        />

        <ConstructionGrid
          openCollabModal={openCollabModal}
          onScrollToForm={scrollToForm}
        />

        <Section id="que-es" title="">
          <div className="section-flex">
            <div className="text-content appear">
              <h2 className="">¿Qué es Conectar?</h2>
              <p>
                Conectar es una plataforma CRM + comunidad que agiliza la
                gestión de presupuestos y facilita las colaboraciones entre
                marcas, profesionales y consumidores del sector construcción.
                Generamos audiencias reales mediante contenido de valor y
                publicaciones colaborativas.
              </p>
            </div>
            <div className="cards-container">
              <div className="cards">
                <div className="card appear">
                  <h3>🚀 Gestión ágil</h3>
                  <p>
                    Centralizá consultas y presupuestos en un solo lugar — menos
                    fricción, más conversiones.
                  </p>
                </div>
                <div className="card appear">
                  <h3>🤝 Comunidad real</h3>
                  <p>
                    Seguidores reales, profesionales relevantes y consumidores
                    genuinos.
                  </p>
                </div>
                <div className="card appear">
                  <h3>🛠️ Conexiones confiables</h3>
                  <p>
                    Recomendaciones verificadas: conectamos con proveedores de
                    calidad para proyectos reales.
                  </p>
                </div>
                <div className="card appear">
                  <h3>📈 Crecimiento real</h3>
                  <p>
                    Campañas orgánicas y colaboraciones para visibilidad
                    sostenida sin costos ocultos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="como-funciona"
          title="¿Cómo funciona?"
          subtitle="En 4 simples pasos comenzás a recibir leads calificados"
          className=" bg-[radial-gradient(circle,rgba(39,211,169,0.1)_0%,transparent_50%)]"
        >
          <div className="steps">
            <div className="step appear">
              <div className="num">1</div>
              <h4>1 Envíanos tu reel</h4>
              <p>
                Completá el formulario con tus datos y el link a tu contenido.
              </p>
            </div>
            <div className="step appear">
              <div className="num">2</div>
              <h4>Co-creamos la publicación</h4>
              <p>
                Adaptamos el contenido para maximizar su impacto en nuestra
                audiencia
              </p>
            </div>
            <div className="step appear">
              <div className="num">3</div>
              <h4>Publicamos como colaboración</h4>
              <p>Tu contenido aparece destacado en nuestro feed y stories.</p>
            </div>
            <div className="step appear">
              <div className="num">4</div>
              <h4>Recibís consultas directas</h4>
              <p>
                Los leads llegan a tu perfil o mediante el link en nuestra bio.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="beneficios"
          title="¿Por qué elegir Conectar?"
          subtitle="Los beneficios que solo nuestra comunidad exclusiva puede ofrecerte"
          className=" bg-[radial-gradient(circle,rgba(39,211,169,0.1)_0%,transparent_50%)] "
        >
          <div className="benefits">
            <div className="benefits-visual appear">
              <img
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                alt="Creadores colaborando"
              />
            </div>
            <div className="benefits-list">
              <div className="benefit-item appear">
                <div className="badge">💎 Premium</div>
                <h4>Audiencia segmentada del sector construcción</h4>
                <p>
                  Llegá a profesionales, contratistas y clientes reales
                  interesados en tus servicios.
                </p>
              </div>
              <div className="benefit-item appear">
                <div className="badge">🚀 Growth</div>
                <h4>Posicionamiento como experto</h4>
                <p>
                  Tu contenido educa e inspira, estableciendo tu autoridad en el
                  rubro.
                </p>
              </div>
              <div className="benefit-item appear">
                <div className="badge">🤝 Support</div>
                <h4>Pagás solo por resultados</h4>
                <p>
                  No hay suscripciones ni cargos fijos. Solo invertís cuando
                  obtenés leads reales.
                </p>
              </div>
              <div className="benefit-item appear">
                <div className="badge">📊 Analytics</div>
                <h4>Métricas y reportes</h4>
                <p>
                  Accedé a análisis detallados del performance de tus
                  colaboraciones y su impacto.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="testimonios"
          title="Lo que dicen nuestros creadores"
          subtitle="Historias reales de éxito en nuestra comunidad"
        >
          <div className="testimonials">
            <div className="testimonial appear">
              <div className="testimonial-header">
                <div className="testimonial-avatar">M</div>
                <div>
                  <div className="testimonial-author">María González</div>
                  <div className="testimonial-role">
                    @mariag_lifestyle • Arquitecta
                  </div>
                </div>
              </div>
              <div className="testimonial-content">
                Gracias a Conectar conseguí 3 clientes nuevos en el primer mes.
                La audiencia es realmente del rubro y con intención de compra."
              </div>
            </div>

            <div className="testimonial appear">
              <div className="testimonial-header">
                <div className="testimonial-avatar">J</div>
                <div>
                  <div className="testimonial-author">Juan Pérez</div>
                  <div className="testimonial-role">
                    @juanfitness • Contratista
                  </div>
                </div>
              </div>
              <div className="testimonial-content">
                La mejor inversión en marketing que hice este año. Las
                colaboraciones me dieron visibilidad frente a clientes ideales.
              </div>
            </div>

            <div className="testimonial appear">
              <div className="testimonial-header">
                <div className="testimonial-avatar">S</div>
                <div>
                  <div className="testimonial-author">Sofia Martín</div>
                  <div className="testimonial-role">
                    @sofiabeauty • Diseñadora de Interiores
                  </div>
                </div>
              </div>
              <div className="testimonial-content">
                Finalmente una plataforma que entiende las necesidades de
                nuestro sector. El proceso es simple y los resultados tangibles.
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer onOpenInstagram={openInstagram} onDownloadGuide={downloadGuide} />

      <StickyBanner onScrollToForm={scrollToForm} />

      <CollaborationModal
        isOpen={isCollabModalOpen}
        onClose={closeCollabModal}
      />
    </div>
  );
}

export default App;
