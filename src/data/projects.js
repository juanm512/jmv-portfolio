export const projects = [
  {
    slug: "atlas-3d",
    year: "2023",
    client: "Personal / Research",
    stack: ["Next.js", "threejs", "react-three-fiber", "framer-motion"],
    links: {
      repo: "",
      live: "https://atlas3d.vercel.app/"
    },
    hero: { type: "image", src: "/Atlas3d/index.jpg" },
    locales: {
      en: {
        title: "Atlas 3D",
        description: "Interactive 3D anatomy atlas built with Three.js and React — real-time rendering and model annotations.",
        role: "Frontend / 3D Engineer",
        content: [
          { type: "text", title: "Overview", text: "Interactive 3D atlas for exploring anatomical models with zoom, rotate and annotations. Built with react-three-fiber and optimized for smooth interaction." },
          { type: "grid", items: [ { src: "/Atlas3d/home.gif", caption: "Interactive viewer" }, { src: "/Atlas3d/bonePage.gif", caption: "Detailed bone view" } ] },
          { type: "text", title: "Highlights", text: "Rendered bone models with optimized performance across devices; multiple reworks to improve usability and loading times." }
        ]
      },
      es: {
        title: "Atlas 3D",
        description: "Atlas de anatomía 3D interactivo construido con Three.js y React — renderizado en tiempo real y anotaciones.",
        role: "Frontend / Ingeniero 3D",
        content: [
          { type: "text", title: "Resumen", text: "Visualización de huesos optimizada para distintos dispositivos y facilidad de uso para estudiantes y profesionales." },
          { type: "grid", items: [ { src: "/Atlas3d/index.jpg", caption: "Visor interactivo" }, { src: "/Atlas3d/annotations.gif", caption: "Capas de anotaciones" } ] },
          { type: "text", title: "Responsabilidades", text: "Frontend optimizado, múltiples reworks de UX y optimización de rendimiento. No hay backend crítico." }
        ]
      }
    }
  },

  {
    slug: "donatelo",
    year: "2019",
    client: "Personal / Freelance",
    stack: ["React", "Node.js", "socket.io", "MongoDB"],
    links: { repo: "https://github.com/juanm512/streams-donations-realtime", live: "https://donatelo.netlify.app/" },
    hero: { type: "image", src: "/donatelo/donateloImg.png" },
    locales: {
      en: {
        title: "Donatelo",
        description: "Realtime donations platform with WebSocket alerts for streamers. Focused on fast notifications and multiple crypto payment options.",
        role: "Full Stack Developer",
        content: [
          { type: "text", title: "What it does", text: "Platform to accept donations in crypto with instant visual alerts for live streams and a user dashboard for donors and streamers." },
          { type: "text", title: "Highlights", text: "Realtime events with socket.io and secure payment flows. (Add quantifiable metrics if available.)" },
          { type: "text", title: "Responsibilities", text: "Frontend and backend implementation, realtime events wiring and deployment." }
        ]
      },
      es: {
        title: "Donatelo",
        description: "Plataforma de donaciones en tiempo real con alertas para streamers y soporte para criptomonedas.",
        role: "Full Stack Developer",
        content: [
          { type: "text", title: "Qué hace", text: "Acepta donaciones en criptomonedas con alertas instantáneas para transmisiones en vivo y paneles para donantes y streamers." },
          { type: "text", title: "Destacados", text: "Eventos en tiempo real con socket.io y flujos de pago seguros. (Agrega métricas cuantificables si las tienes.)" },
          { type: "text", title: "Responsabilidades", text: "Implementación de frontend y backend, wiring de eventos en tiempo real y despliegue." }
        ]
      }
    }
  },

  {
    slug: "vas-ecommerce",
    year: "2022",
    client: "Freelance",
    stack: ["Next.js", "TailwindCSS", "MongoDB"],
    links: { live: "https://vas-ecommerce.vercel.app/", repo: "" },
    hero: { type: "image", src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-48-56 Ventas a Services - Respuestos de refrigeracion y linea blanca.png" },
    locales: {
      en: {
        title: "Ventas A Services",
        description: "E-commerce platform with product management, admin pages and a tailored checkout flow. Includes an admin dashboard for order and inventory management.",
        role: "Full Stack / Frontend",
        content: [
          { type: "text", title: "Overview", text: "Complete e-commerce site with admin interface for inventory and order management. Emphasis on UX and reliable ops for a small retail client." },
          { type: "grid", items: [ { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-46-04 Admin Page.png", caption: "Admin dashboard" }, { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-49-06 Ventas a Services - Respuestos de refrigeracion y linea blanca.png", caption: "Product listing" } ] },
          { type: "text", title: "Why it matters", text: "Shows end-to-end product flows, order lifecycle and dashboard UX — valuable for roles focused on product & frontend-to-backend integration." }
        ]
      },
      es: {
        title: "Ventas A Services",
        description: "Plataforma de e-commerce con gestión de productos, panel de administración y flujo de checkout adaptado.",
        role: "Full Stack / Frontend",
        content: [
          { type: "text", title: "Resumen", text: "Sitio de e-commerce completo con panel de administración para inventario y pedidos. Enfocado en UX y operaciones confiables para un cliente minorista." },
          { type: "grid", items: [ { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-46-04 Admin Page.png", caption: "Panel de administración" }, { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-49-06 Ventas a Services - Respuestos de refrigeracion y linea blanca.png", caption: "Listado de productos" } ] },
          { type: "text", title: "Por qué importa", text: "Muestra flujos de producto de extremo a extremo, ciclo de vida de pedidos y UX del dashboard — valioso para roles centrados en producto e integración frontend-backend." }
        ]
      }
    }
  },

  {
    slug: "crafteadle",
    year: "2019",
    client: "Personal",
    stack: ["Next.js", "TailwindCSS", "React"],
    links: { repo: "https://github.com/juanm512/crafteadle-nextjs" },
    hero: { type: "image", src: "/crafteadle/home.png" },
    locales: {
      en: {
        title: "Crafteadle",
        description: "Wordle-like crafting game with custom API for recipes and inventory, demonstrating interactive gameplay and state management.",
        role: "Frontend",
        content: [
          { type: "text", title: "Gameplay", text: "A puzzle game that uses recipes and random inventories. Built with Next.js and a small API to serve game data." },
          { type: "grid", items: [ { src: "/crafteadle/home.png", caption: "Game UI" }, { src: "/crafteadle/Screenshot 2022-10-03 at 19-42-23 https __crafteadle-nextjs.vercel.app.png", caption: "Gameplay" } ] },
          { type: "text", title: "Responsibilities", text: "Frontend implementation, game logic and API design. (Add metrics or highlights if desired.)" }
        ]
      },
      es: {
        title: "Crafteadle",
        description: "Juego tipo Wordle con recetas y un API personalizada, demostrando lógica interactiva y manejo de estado.",
        role: "Frontend",
        content: [
          { type: "text", title: "Jugabilidad", text: "Juego de puzles que usa recetas e inventario aleatorio. Construido con Next.js y una API ligera para los datos del juego." },
          { type: "grid", items: [ { src: "/crafteadle/home.png", caption: "UI del juego" }, { src: "/crafteadle/Screenshot 2022-10-03 at 19-42-40 https __crafteadle-nextjs.vercel.app.png", caption: "Puzles" } ] },
          { type: "text", title: "Responsabilidades", text: "Implementación frontend, lógica del juego y diseño de la API. (Agrega métricas si las tienes.)" }
        ]
      }
    }
  },

  {
    slug: "single-resto",
    year: "2024",
    client: "Personal / Client",
    stack: ["Next.js", "TailwindCSS", "React", "Docker"],
    links: { live: "https://single-resto-website.vit.net.ar/", repo: "" },
    hero: { type: "image", src: "/single_resto_website/portada.png" },
    locales: {
      en: {
        title: "Single Resto — Web & Dashboard",
        description: "Restaurant website combined with an admin dashboard — demonstrates polished frontend UI and dashboard workflows.",
        role: "Lead Developer",
        content: [
          { type: "text", title: "Combined case study", text: "Grouped public website and admin dashboard to showcase customer-facing UI and internal management flows." },
          { type: "grid", items: [ { src: "/single_resto_website/portada.png", caption: "Public website" }, { src: "/single_resto_dashboard/portada.png", caption: "Admin dashboard" } ] },
          { type: "text", title: "Key achievements", text: "Implemented delivery mapping, order panel with ticket printing, WhatsApp messaging integration for quick actions, SSE-based near-realtime order notifications (polling every 30s) and MercadoPago payments." },
          { type: "text", title: "Responsibilities", text: "Development, Docker-based deployment to a VPS (Oracle), DB and custom WhatsApp container. Ongoing refactor to cloud-native deployment and white‑label support for customer themes." }
        ]
      },
      es: {
        title: "Single Resto — Web & Dashboard",
        description: "Web de restaurant combinada con dashboard de administración — muestra UI pulida y flujos de dashboard.",
        role: "Desarrollador Principal",
        content: [
          { type: "text", title: "Caso combinado", text: "Agrupa la web pública y el dashboard de administración para mostrar la UI orientada al cliente y los flujos internos de gestión." },
          { type: "grid", items: [ { src: "/single_resto_website/portada.png", caption: "Web pública" }, { src: "/single_resto_dashboard/portada.png", caption: "Dashboard admin" } ] },
          { type: "text", title: "Logros clave", text: "Implementé mapeo de entregas, panel de órdenes con impresión de tickets, integración con WhatsApp para acciones rápidas en el dashboard, notificaciones SSE de pedidos (cada 30s) y pagos con MercadoPago." },
          { type: "text", title: "Responsabilidades", text: "Desarrollo completo, despliegue en Docker sobre VPS (Oracle), base de datos y container custom para WhatsApp. Refactor en curso para despliegue en la nube y soporte white‑label." }
        ]
      }
    }
  },

  {
    slug: "tuerca",
    year: "2025",
    client: "In Development",
    stack: ["React", "React Native", "tRPC", "Monorepo"],
    links: { repo: "" },
    hero: { type: "image", src: "/projects/tuerca/hero.jpg" },
    locales: {
      en: {
        title: "TUERCA",
        description: "Professional routing and work management dashboard; monorepo with web and mobile (React Native) and tRPC for typesafe APIs.",
        role: "Lead Developer (in development)",
        content: [
          { type: "text", title: "Overview", text: "Dashboard for professionals to organise jobs, plan optimized routes and manage tasks across mobile and web. Monorepo approach with tRPC for end-to-end typesafety." },
          { type: "text", title: "Highlights", text: "Monorepo with typesafe communication using tRPC to reduce runtime errors and speed up development iterations." },
          { type: "text", title: "Responsibilities", text: "Sole developer: architecture, frontend, mobile app and API design. Project in active development; demos available on request." }
        ]
      },
      es: {
        title: "TUERCA",
        description: "Dashboard profesional para organizar trabajo, crear rutas optimizadas y gestionar tareas; monorepo con web y mobile y tRPC.",
        role: "Lead Developer (en desarrollo)",
        content: [
          { type: "text", title: "Resumen", text: "Monorepo con comunicación typesafe via tRPC para facilitar el desarrollo y mitigar errores." },
          { type: "text", title: "Logros", text: "Estrategia técnica que prioriza consistencia entre web y mobile; implementación inicial del flujo de rutas optimizadas." },
          { type: "text", title: "Responsabilidades", text: "Desarrollo completo por mi: arquitectura, frontend, app móvil y diseño de APIs. En desarrollo." }
        ]
      }
    }
  },

  {
    slug: "gsp",
    year: "2024",
    client: "Personal / Research",
    stack: ["Node.js", "Next.js", "Rendering Pipeline"],
    links: { repo: "https://github.com/juanm512/gsp", live: "" },
    hero: { type: "image", src: "/projects/gsp/thumbnail.png" },
    locales: {
      en: {
        title: "gsp",
        description: "Platform for uploading content to be rendered with Gaussian Splattings — includes an upload pipeline and rendering orchestration.",
        role: "Developer / Research",
        content: [
          { type: "text", title: "What it is", text: "Site and toolchain to upload content, queue render jobs and produce Gaussian Splattings output. See the repository for demos and details." },
          { type: "text", title: "Highlights", text: "GPU rental pipeline with retries, payment service for organisations, member invitations and R2 storage for assets; background job orchestration." },
          { type: "text", title: "Responsibilities", text: "Infrastructure and backend design for rendering pipeline, basic frontend with shadcn, storage and job orchestration." }
        ]
      },
      es: {
        title: "gsp",
        description: "Sitio para subir contenido y renderizar usando Gaussian Splattings — incluye pipeline de uploads y orquestación de renders.",
        role: "Desarrollador / Investigación",
        content: [
          { type: "text", title: "Qué es", text: "Herramienta para subir contenido, encolar trabajos de render y generar salidas de Gaussian Splattings. Revisa el repositorio para ejemplos." },
          { type: "text", title: "Destacados", text: "Pipeline de GPUs con reintentos, servicio de pago para organizaciones, invitaciones de miembros y uso de R2 para almacenamiento." },
          { type: "text", title: "Responsabilidades", text: "Diseño de infraestructura para trabajos en background, orquestación y frontend básico." },
          { type: "text", title: "Nota", text: `Arquitectura (diagrama): upload → preproc → queue → workers GPU → postproc → storage (R2) → entrega. Imagen SVG o captura de draw.io.
Flujo de usuario: screenshot/video corto del form de upload + progreso del job (barra/progreso en %).
Outputs finales: imágenes o video renderizado (before/after) — idealmente un par de comparativas.
Job queue UI: captura de la interfaz que muestra jobs encolados, retries y estado (pending/running/failed/success).
Métricas clave: tiempo medio de render, tasa de éxito, reintentos promedio, coste promedio por job (si tienes números).
Logs / retries: ejemplo de log que muestre reintento y manejo de fallos (o captura del panel de alertas).
Infra / ops: screenshot o lista corta de servicios (GPU rental, R2, worker pool, orquestador) y cómo se escalan.
Demo corto (opcional): video que muestre subir un archivo y la entrega del resultado.
Call-to-action: enlace al repo (ya tienes) y nota de cómo pedir demo o acceso.` }
        ]
      }
    }
  }
]
