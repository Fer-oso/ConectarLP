import { Award, Play, TrendingUp, Users } from "lucide-react";

  interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: {
    desktop: string;
    mobile: string;
  };
  stats?: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
  cta?: string;
  type: string;
}
  
  export const slides: SlideData[] = [
    {
      id: 1,
      title: "Conectá con profesionales de la construcción",
      subtitle: "Plataforma líder en el sector",
      description:
        "Más de 1,250 profesionales confían en nuestra plataforma para generar leads calificados y hacer crecer sus negocios.",
      image:
        { desktop: "./sliderimages/slideimg1.webp",
          mobile: "./sliderimages/slideimg1mobile.gif"
        },
      stats: [
        { icon: <Users size={20} />, value: "1,250+", label: "Profesionales" },
        { icon: <TrendingUp size={20} />, value: "85%", label: "Más leads" },
        { icon: <Award size={20} />, value: "4.8★", label: "Valoración" },
      ],
      cta: "Únete ahora",
      type:"promotional"
    },
    {
      id: 2,
      title: "Proyectos que transforman espacios",
      subtitle: "Inspiración y resultados reales",
      description:
        "Descubrí cómo nuestros colaboradores han transformado espacios y generado oportunidades de negocio exitosas.",
      image:
        { desktop: "./sliderimages/slideimg2.webp",
          mobile: "./sliderimages/slideimg2mobile.webp"
        },
      stats: [
        { icon: <Play size={20} />, value: "500+", label: "Proyectos" },
        {
          icon: <TrendingUp size={20} />,
          value: "120%",
          label: "ROI promedio",
        },
        { icon: <Users size={20} />, value: "2,800", label: "Clientes" },
      ],
      cta: "Ver proyectos",
      type:"promotional"
    },
    {
      id: 3,
      title: "Herramientas y materiales de calidad",
      subtitle: "Proveedores verificados",
      description:
        "Conectamos con los mejores proveedores del sector. Materiales de calidad, precios competitivos y entregas puntuales.",
      image:
         { desktop: "./sliderimages/slideimg3.webp",
          mobile: "./sliderimages/slideimg3mobile.webp"
        },
      stats: [
        { icon: <Award size={20} />, value: "150+", label: "Proveedores" },
        { icon: <TrendingUp size={20} />, value: "98%", label: "Satisfacción" },
        { icon: <Users size={20} />, value: "24/7", label: "Soporte" },
      ],
      cta: "Explorar catálogo",
      type:"promotional"
    },

 {
      id: 4,
      title: "Conectá con profesionales de la construcción",
      subtitle: "Plataforma líder en el sector",
      description:
        "Más de 1,250 profesionales confían en nuestra plataforma para generar leads calificados y hacer crecer sus negocios.",
      image:{
        desktop:"https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        mobile:" https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      },
      
      stats: [
        { icon: <Users size={20} />, value: "1,250+", label: "Profesionales" },
        { icon: <TrendingUp size={20} />, value: "85%", label: "Más leads" },
        { icon: <Award size={20} />, value: "4.8★", label: "Valoración" },
      ],
      cta: "Únete ahora",
        type:"informational"
    },
    {
      id: 5,
      title: "Proyectos que transforman espacios",
      subtitle: "Inspiración y resultados reales",
      description:
        "Descubrí cómo nuestros colaboradores han transformado espacios y generado oportunidades de negocio exitosas.",
      image:{
        desktop:"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        mobile:"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      },

      stats: [
        { icon: <Play size={20} />, value: "500+", label: "Proyectos" },
        {
          icon: <TrendingUp size={20} />,
          value: "120%",
          label: "ROI promedio",
        },
        { icon: <Users size={20} />, value: "2,800", label: "Clientes" },
      ],
      cta: "Ver proyectos",
        type:"informational"
    },
    {
      id: 6,
      title: "Herramientas y materiales de calidad",
      subtitle: "Proveedores verificados",
      description:
        "Conectamos con los mejores proveedores del sector. Materiales de calidad, precios competitivos y entregas puntuales.",
      image:{
        desktop:"https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        mobile:"https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      }
        ,
      stats: [
        { icon: <Award size={20} />, value: "150+", label: "Proveedores" },
        { icon: <TrendingUp size={20} />, value: "98%", label: "Satisfacción" },
        { icon: <Users size={20} />, value: "24/7", label: "Soporte" },
      ],
      cta: "Explorar catálogo",
        type:"informational"
    },


  ];





   

