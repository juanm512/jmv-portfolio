export const projects = [
  {
    slug: "sistema-gestion-inventario",
    year: "2024",
    client: "Logistics Corp",
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
    links: {
      live: "https://example.com",
      repo: "https://github.com"
    },
    hero: {
      type: "image",
      src: "/projects/inventory/hero.jpg",
    },
    locales: {
      en: {
        title: "Inventory Management System",
        description: "A complete inventory management system with real-time reporting and stock prediction.",
        role: "Full Stack Developer",
        content: [
          {
            type: "text",
            title: "The Challenge",
            text: "A distribution company needed to modernize its manual inventory system. The process was error-prone, lacked real-time visibility, and caused order delays. They required a solution that could handle thousands of SKUs and predict demand to optimize stock levels."
          },
          {
            type: "grid",
            items: [
              { src: "/projects/inventory/dashboard.jpg", caption: "Real-time Dashboard" },
              { src: "/projects/inventory/mobile.jpg", caption: "Mobile Scanner App" }
            ]
          },
          {
            type: "text",
            title: "The Approach",
            text: "We designed a microservices architecture to ensure scalability. The core system was built with Node.js and PostgreSQL, while the frontend utilized React for a responsive dashboard. We implemented a predictive algorithm using historical data to suggest reorder points."
          },
          {
            type: "full-width-image",
            src: "/projects/inventory/architecture.jpg",
            caption: "System Architecture Diagram"
          },
          {
            type: "text",
            title: "The Solution",
            text: "The new system includes:\n\n- Real-time dashboard with key metrics\n- Automated low-stock alerts\n- Demand prediction based on history\n- Multi-supplier integration\n- REST API for external integrations"
          },
          {
            type: "stats",
            items: [
              { value: "60%", label: "Faster Processing" },
              { value: "85%", label: "Error Reduction" },
              { value: "40%", label: "Better Accuracy" }
            ]
          }
        ]
      },
      es: {
        title: "Sistema de Gestión de Inventario",
        description: "Un sistema completo de gestión de inventario con reportes en tiempo real y predicción de stock.",
        role: "Desarrollador Full Stack",
        content: [
          {
            type: "text",
            title: "El Desafío",
            text: "Una empresa de distribución necesitaba modernizar su sistema manual de inventario. El proceso era propenso a errores, carecía de visibilidad en tiempo real y causaba retrasos en los pedidos. Necesitaban una solución capaz de manejar miles de SKUs y predecir la demanda para optimizar los niveles de stock."
          },
          {
            type: "grid",
            items: [
              { src: "/projects/inventory/dashboard.jpg", caption: "Dashboard en Tiempo Real" },
              { src: "/projects/inventory/mobile.jpg", caption: "App de Escaneo Móvil" }
            ]
          },
          {
            type: "text",
            title: "El Enfoque",
            text: "Diseñamos una arquitectura de microservicios para garantizar la escalabilidad. El sistema central se construyó con Node.js y PostgreSQL, mientras que el frontend utilizó React para un dashboard responsivo. Implementamos un algoritmo predictivo utilizando datos históricos para sugerir puntos de reorden."
          },
          {
            type: "full-width-image",
            src: "/projects/inventory/architecture.jpg",
            caption: "Diagrama de Arquitectura del Sistema"
          },
          {
            type: "text",
            title: "La Solución",
            text: "El nuevo sistema incluye:\n\n- Dashboard en tiempo real con métricas clave\n- Alertas automáticas de bajo stock\n- Predicción de demanda basada en historial\n- Integración multi-proveedor\n- API REST para integraciones externas"
          },
          {
            type: "stats",
            items: [
              { value: "60%", label: "Procesamiento Más Rápido" },
              { value: "85%", label: "Reducción de Errores" },
              { value: "40%", label: "Mejor Precisión" }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "e-commerce-platform",
    year: "2023",
    client: "Retail Brand",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Stripe"],
    hero: {
      type: "image",
      src: "/projects/ecommerce/hero.jpg",
    },
    links: {
      repo: "https://github.com"
    },
    locales: {
      en: {
        title: "E-commerce Platform",
        description: "Modern e-commerce platform with Next.js 14.",
        role: "Frontend Lead",
        content: [
          {
            type: "text",
            title: "Overview",
            text: "Building a high-performance e-commerce store with server-side rendering and streamlined checkout."
          }
        ]
      },
      es: {
        title: "Plataforma E-commerce",
        description: "Plataforma moderna de comercio electrónico con Next.js 14.",
        role: "Frontend Lead",
        content: [
          {
            type: "text",
            title: "Resumen",
            text: "Construcción de una tienda de alto rendimiento con renderizado del lado del servidor y proceso de pago optimizado."
          }
        ]
      }
    }
  },
  {
    slug: "portfolio-v1",
    year: "2022",
    client: "Personal",
    stack: ["Gatsby", "Styled Components"],
    hero: {
      type: "image",
      src: "/projects/portfolio/hero.jpg",
    },
    links: {
      repo: "https://github.com"
    },
    locales: {
      en: {
        title: "Portfolio V1",
        description: "Previous version of my personal portfolio.",
        role: "Designer & Developer",
        content: [
          {
            type: "text",
            title: "Design",
            text: "Focusing on minimalism and typography."
          }
        ]
      },
      es: {
        title: "Portafolio V1",
        description: "Versión anterior de mi portafolio personal.",
        role: "Diseñador y Desarrollador",
        content: [
          {
            type: "text",
            title: "Diseño",
            text: "Enfocado en el minimalismo y la tipografía."
          }
        ]
      }
    }
  }
]
