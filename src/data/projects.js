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
        description: "Interactive 3D anatomy atlas built with Three.js and React — real-time rendering, zoom, rotation and model annotations for medical students.",
        role: "Frontend / 3D Engineer",
        content: [
          { type: "text", title: "Overview", text: "Full-featured 3D atlas that lets users explore human bones with zoom, rotate and annotation overlays. Built on react-three-fiber for declarative 3D scenes and optimized for smooth 60 fps interaction across desktop and mobile." },
          { type: "grid", items: [ { src: "/Atlas3d/home.gif", caption: "Interactive 3D viewer" }, { src: "/Atlas3d/bonePage.gif", caption: "Detailed bone exploration" } ] },
          { type: "text", title: "Technical Highlights", text: "• Implemented GPU-accelerated model loading with progressive LOD for faster initial render.\n• Annotation system that binds metadata to 3D coordinates — persistent across camera rotations.\n• Multiple UX iterations to improve loading times and touch-gesture support on mobile.\n• Performance profiled and optimized draw calls to maintain interactive frame rates on mid-range hardware." }
        ]
      },
      es: {
        title: "Atlas 3D",
        description: "Atlas de anatomía 3D interactivo con Three.js y React — renderizado en tiempo real, zoom, rotación y anotaciones sobre modelos para estudiantes de medicina.",
        role: "Frontend / Ingeniero 3D",
        content: [
          { type: "text", title: "Resumen", text: "Atlas 3D completo que permite explorar huesos humanos con zoom, rotación y capas de anotaciones. Construido sobre react-three-fiber para escenas 3D declarativas y optimizado para interacción fluida a 60 fps en desktop y mobile." },
          { type: "grid", items: [ { src: "/Atlas3d/home.gif", caption: "Visor 3D interactivo" }, { src: "/Atlas3d/bonePage.gif", caption: "Exploración detallada de huesos" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Carga de modelos acelerada por GPU con LOD progresivo para renderizado inicial rápido.\n• Sistema de anotaciones vinculadas a coordenadas 3D — persistentes durante rotaciones de cámara.\n• Múltiples iteraciones de UX para mejorar tiempos de carga y soporte de gestos táctiles en mobile.\n• Perfilado de rendimiento y optimización de draw calls para mantener frame rates interactivos en hardware de gama media." }
        ]
      }
    }
  },

  {
    slug: "donatelo",
    year: "2022",
    client: "Personal / Open Source",
    stack: ["React", "Node.js", "socket.io", "MongoDB", "ethers.js", "Express"],
    links: { repo: "https://github.com/juanm512/streams-donations-realtime", live: "https://donatelo.netlify.app/" },
    hero: { type: "image", src: "/donatelo/Screenshot 2022-05-02 at 12-03-58 Donatelo.png" },
    locales: {
      en: {
        title: "Donatelo",
        description: "Real-time crypto donation platform for live streamers — multi-chain payments, WebSocket-driven on-screen alerts and a full donor/streamer dashboard.",
        role: "Full Stack Developer",
        content: [
          { type: "text", title: "What it does", text: "Donatelo enables viewers to send cryptocurrency donations during live streams. Streamers get customizable on-screen alerts powered by WebSockets, while donors can track their history via a dedicated dashboard. Supports multiple blockchains and tokens through ethers.js." },
          { type: "video", src: "/donatelo/donatelo_video_breve_funcionalidad.mp4", title: "Platform Demo", caption: "Quick walkthrough of the core functionality" },
          { type: "text", title: "Technical Architecture", text: "• Node.js + Express backend with JWT authentication and one-click MetaMask login.\n• Real-time event pipeline: blockchain transaction confirmation → server webhook → socket.io broadcast → overlay render in < 2 s.\n• MongoDB for user profiles, donation history and streamer settings.\n• Multi-chain support: custom RPC provider selection and contract ABI abstraction for ERC-20 tokens.\n• Frontend built in React with daisyUI + TailwindCSS and Three.js animations for the landing page." },
          { type: "text", title: "Why it matters", text: "Demonstrates end-to-end real-time architecture, blockchain integration, and event-driven systems — core skills for any backend or full-stack role requiring low-latency data flows." }
        ]
      },
      es: {
        title: "Donatelo",
        description: "Plataforma de donaciones crypto en tiempo real para streamers — pagos multi-cadena, alertas en pantalla vía WebSocket y un dashboard completo para donantes y streamers.",
        role: "Full Stack Developer",
        content: [
          { type: "text", title: "Qué hace", text: "Donatelo permite a los espectadores enviar donaciones en criptomonedas durante transmisiones en vivo. Los streamers reciben alertas personalizables en pantalla potenciadas por WebSockets, mientras que los donantes pueden rastrear su historial desde un dashboard dedicado. Soporta múltiples blockchains y tokens a través de ethers.js." },
          { type: "video", src: "/donatelo/donatelo_video_breve_funcionalidad.mp4", title: "Demo de la Plataforma", caption: "Recorrido rápido de la funcionalidad principal" },
          { type: "text", title: "Arquitectura Técnica", text: "• Backend en Node.js + Express con autenticación JWT y login one-click con MetaMask.\n• Pipeline de eventos en tiempo real: confirmación de transacción blockchain → webhook al servidor → broadcast socket.io → render del overlay en < 2 s.\n• MongoDB para perfiles de usuario, historial de donaciones y configuración de streamers.\n• Soporte multi-cadena: selección de proveedor RPC personalizado y abstracción de ABI de contratos para tokens ERC-20.\n• Frontend en React con daisyUI + TailwindCSS y animaciones Three.js para la landing page." },
          { type: "text", title: "Por qué importa", text: "Demuestra arquitectura en tiempo real de punta a punta, integración blockchain y sistemas event-driven — habilidades clave para roles backend o full-stack que requieren flujos de datos de baja latencia." }
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
        description: "Production e-commerce platform with product catalogue, admin dashboard, inventory management and WhatsApp-based order notifications for a retail client.",
        role: "Full Stack / Frontend",
        content: [
          { type: "text", title: "Overview", text: "Built a complete e-commerce solution for a small retail business selling refrigeration and appliance parts. Includes a public storefront with search, filters and cart, plus a private admin dashboard for inventory and order management." },
          { type: "grid", items: [ { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-46-04 Admin Page.png", caption: "Admin dashboard" }, { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-49-06 Ventas a Services - Respuestos de refrigeracion y linea blanca.png", caption: "Product catalogue" } ] },
          { type: "text", title: "Technical Highlights", text: "• Server-side rendering with Next.js for SEO-optimised product pages and fast initial loads.\n• Admin CRUD interface with role-based access, image uploads to AWS S3 and real-time inventory tracking.\n• Shopping cart without payment gateway (per client request) — orders trigger WhatsApp notifications for manual processing.\n• JWT-based authentication with bcrypt password hashing and MongoDB for flexible document storage." },
          { type: "text", title: "Impact", text: "Delivered a production-ready platform that digitized the client's catalogue and streamlined their order workflow — showcasing end-to-end product development from requirements to deployment." }
        ]
      },
      es: {
        title: "Ventas A Services",
        description: "Plataforma e-commerce en producción con catálogo de productos, dashboard de administración, gestión de inventario y notificaciones de pedidos por WhatsApp para un cliente minorista.",
        role: "Full Stack / Frontend",
        content: [
          { type: "text", title: "Resumen", text: "Solución e-commerce completa para un negocio minorista de repuestos de refrigeración y línea blanca. Incluye tienda pública con búsqueda, filtros y carrito, más un dashboard de administración privado para gestión de inventario y pedidos." },
          { type: "grid", items: [ { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-46-04 Admin Page.png", caption: "Panel de administración" }, { src: "/vas-ecommerce/Screenshot 2022-10-03 at 18-49-06 Ventas a Services - Respuestos de refrigeracion y linea blanca.png", caption: "Catálogo de productos" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Server-side rendering con Next.js para páginas de productos optimizadas para SEO y cargas iniciales rápidas.\n• Interfaz CRUD de administración con acceso basado en roles, subida de imágenes a AWS S3 y seguimiento de inventario en tiempo real.\n• Carrito de compras sin pasarela de pago (a pedido del cliente) — los pedidos disparan notificaciones de WhatsApp para procesamiento manual.\n• Autenticación basada en JWT con hashing de contraseñas bcrypt y MongoDB para almacenamiento flexible de documentos." },
          { type: "text", title: "Impacto", text: "Entregué una plataforma lista para producción que digitalizó el catálogo del cliente y optimizó su flujo de pedidos — demostrando desarrollo de producto de punta a punta desde requisitos hasta despliegue." }
        ]
      }
    }
  },

  {
    slug: "bmmusic",
    year: "2024",
    client: "Personal",
    stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    links: { repo: "https://github.com/juanm512/bmmusic", live: "https://bmmusic.vercel.app/" },
    hero: { type: "image", src: "/BMusic/bmusichomepage.gif" },
    locales: {
      en: {
        title: "BM Music — Artist Landing",
        description: "Polished landing page template for music artists — rich animations, song previews, and event ticket integration. A 3-day design-to-deploy sprint.",
        role: "Frontend Developer / Designer",
        content: [
          { type: "text", title: "Overview", text: "Designed and developed a modern, ready-to-use landing page template for independent music artists. The site features a hero with animated transitions, a discography section with embedded song previews, and an events/tickets page — all built in under 3 days." },
          { type: "grid", items: [ { src: "/BMusic/bmusichomepage.gif", caption: "Animated homepage hero" }, { src: "/BMusic/Bmusicsongs.gif", caption: "Discography browser" } ] },
          { type: "grid", items: [ { src: "/BMusic/homepage.gif", caption: "Scroll-based transitions" }, { src: "/BMusic/tickets.gif", caption: "Events & tickets section" } ] },
          { type: "text", title: "Technical Highlights", text: "• Micro-interaction system built with Framer Motion: staggered card reveals, parallax scroll effects, and smooth page transitions.\n• Fully responsive layout with TailwindCSS — tested across mobile, tablet and desktop breakpoints.\n• Component-driven architecture in Next.js with prop-based theming for easy artist customization.\n• Performance-optimized: lazy-loaded images, minimal bundle size, and fast Vercel edge deployment." },
          { type: "text", title: "Why it matters", text: "Demonstrates rapid prototyping skills, strong aesthetic sense, and proficiency with animation libraries — built and deployed in just 3 days while maintaining production-quality code." }
        ]
      },
      es: {
        title: "BM Music — Landing de Artista",
        description: "Landing page template pulida para artistas musicales — animaciones ricas, previews de canciones e integración de tickets para eventos. Sprint de diseño a deploy en 3 días.",
        role: "Frontend Developer / Diseñador",
        content: [
          { type: "text", title: "Resumen", text: "Diseñé y desarrollé una landing page moderna y lista para usar para artistas musicales independientes. El sitio incluye un hero con transiciones animadas, una sección de discografía con previews embebidos y una página de eventos/tickets — todo construido en menos de 3 días." },
          { type: "grid", items: [ { src: "/BMusic/bmusichomepage.gif", caption: "Hero animado de la homepage" }, { src: "/BMusic/Bmusicsongs.gif", caption: "Navegador de discografía" } ] },
          { type: "grid", items: [ { src: "/BMusic/homepage.gif", caption: "Transiciones basadas en scroll" }, { src: "/BMusic/tickets.gif", caption: "Sección de eventos y tickets" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Sistema de micro-interacciones con Framer Motion: aparición escalonada de tarjetas, efectos parallax en scroll y transiciones suaves entre páginas.\n• Layout totalmente responsivo con TailwindCSS — testeado en breakpoints de mobile, tablet y desktop.\n• Arquitectura basada en componentes en Next.js con theming por props para facilitar la personalización del artista.\n• Optimizado en rendimiento: imágenes lazy-loaded, bundle mínimo y deploy rápido en Vercel edge." },
          { type: "text", title: "Por qué importa", text: "Demuestra habilidades de prototipado rápido, fuerte sentido estético y dominio de librerías de animación — construido y desplegado en solo 3 días manteniendo código de calidad de producción." }
        ]
      }
    }
  },

  {
    slug: "single-resto",
    year: "2025",
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
          { type: "text", title: "Responsibilities", text: "Development, Docker-based deployment to a VPS (Oracle), DB and custom WhatsApp container. Ongoing refactor to cloud-native deployment and white‑label support for customer themes." },
          { type: "text", title: "Centralized Logging with Wide Events", text: "Implemented a modern logging system based on Wide Events (Canonical Log Lines) that replaced scattered console.log statements with structured, analytical events." },
          { type: "text", title: "Why Wide Events?", text: "Instead of multiple scattered log lines, the system emits ONE structured event per request/action with all necessary context: timestamp, request_id, user, action_name, duration_ms, outcome and specific business data. This enables analytical queries instead of text searches." },
          { type: "text", title: "Validation Integration", text: "The system automatically captures Zod validation errors and structures them in the log event. Real example of failed validation:" },
          { type: "code", title: "Example: Validation Error", text: `[Zod Validation] Received data: {
  "id": "J1526VKZ",
  "title": "dafa",
  "handle": "ff",
  "price": "12.00",
  "product_type_id": "",
  "description": ""
}
[Zod Validation] Validation errors: {
  errors: { product_type_id: 'Debe seleccionar un tipo de producto válido' },
  zodErrors: [
    {
      path: ['product_type_id'],
      message: 'Debe seleccionar un tipo de producto válido',
      code: 'too_small'
    }
  ]
}
❌ [updateProduct] 23ms {
  type: 'ValidationError',
  code: 'VALIDATION_ERROR',
  message: 'Error de validación. Revise los campos.',
}` },
          { type: "text", title: "Structured Wide Event", text: "The system transforms the above information into a structured JSON event, ready to be indexed and queried:" },
          { type: "code", title: "Resulting Wide Event", text: `{
  "timestamp": "2026-02-19T16:40:29.786Z",
  "request_id": "mltot5y2-3pf6a",
  "service": "unknown",
  "environment": "development",
  "action_name": "updateProduct",
  "duration_ms": 23,
  "outcome": "error",
  "user": {
    "id": "LE58YKCC",
    "role": "admin"
  },
  "error": {
    "type": "ValidationError",
    "code": "VALIDATION_ERROR",
    "message": "Error de validación. Revise los campos."
  }
}` },
          { type: "text", title: "System Benefits", text: "• Single event per action with complete context (user, duration, outcome). • Automatic detection of errors and results using byethrow. • Ability to perform analytical queries: 'error rate by action', 'average response time by tenant'. • Complete traceability with unique request_id per request. • Significant reduction of log noise compared to traditional console.log." }
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
          { type: "text", title: "Responsabilidades", text: "Desarrollo completo, despliegue en Docker sobre VPS (Oracle), base de datos y container custom para WhatsApp. Refactor en curso para despliegue en la nube y soporte white‑label." },
          { type: "text", title: "Logging Centralizado con Wide Events", text: "Se implementó un sistema de logging moderno basado en Wide Events (Canonical Log Lines) que reemplazó los console.log dispersos por eventos estructurados y analíticos." },
          { type: "text", title: "¿Por qué Wide Events?", text: "En lugar de múltiples líneas de log dispersas, el sistema emite UN evento estructurado por request/acción con todo el contexto necesario: timestamp, request_id, user, action_name, duration_ms, outcome y datos de negocio específicos. Esto permite realizar queries analíticas en lugar de búsquedas de texto." },
          { type: "text", title: "Integración con Validaciones", text: "El sistema captura automáticamente errores de validación de Zod y los estructura en el evento de log. Ejemplo real de validación fallida:" },
          { type: "code", title: "Ejemplo: Error de Validación", text: `[Zod Validation] Datos recibidos: {
  "id": "J1526VKZ",
  "title": "dafa",
  "handle": "ff",
  "price": "12.00",
  "product_type_id": "",
  "description": ""
}
[Zod Validation] Errores de validación: {
  errors: { product_type_id: 'Debe seleccionar un tipo de producto válido' },
  zodErrors: [
    {
      path: ['product_type_id'],
      message: 'Debe seleccionar un tipo de producto válido',
      code: 'too_small'
    }
  ]
}
❌ [updateProduct] 23ms {
  type: 'ValidationError',
  code: 'VALIDATION_ERROR',
  message: 'Error de validación. Revise los campos.',
}` },
          { type: "text", title: "Evento Wide Event Estructurado", text: "El sistema transforma la información anterior en un evento JSON estructurado, listo para ser indexado y consultado:" },
          { type: "code", title: "Wide Event Resultante", text: `{
  "timestamp": "2026-02-19T16:40:29.786Z",
  "request_id": "mltot5y2-3pf6a",
  "service": "unknown",
  "environment": "development",
  "action_name": "updateProduct",
  "duration_ms": 23,
  "outcome": "error",
  "user": {
    "id": "LE58YKCC",
    "role": "admin"
  },
  "error": {
    "type": "ValidationError",
    "code": "VALIDATION_ERROR",
    "message": "Error de validación. Revise los campos."
  }
}` },
          { type: "text", title: "Beneficios del Sistema", text: "• Un solo evento por acción con contexto completo (user, duration, outcome). • Detección automática de errores y resultados usando byethrow. • Capacidad de realizar queries analíticas: 'tasa de error por acción', 'tiempo promedio de respuesta por tenant'. • Trazabilidad completa con request_id único por solicitud. • Reducción significativa de ruido en logs comparado con console.log tradicional." }
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
    year: "2025",
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
  },

  {
    slug: "relocate",
    year: "2026",
    client: "Personal Project",
    stack: ["Flask", "Python", "JavaScript"],
    links: { repo: "https://github.com/juanm512/relocate-app", live: "https://mudarg.vercel.app/" },
    hero: { type: "image", src: "/relocate-app/inicial.png" },
    locales: {
      en: {
        title: "Relocate - Commute Map",
        description: "Visual tool that helps you discover where you can reasonably live based on your workplace and preferred commute mode.",
        role: "Full Stack Developer",
        content: [
          { type: "text", title: "Overview", text: "Interactive map built with Leaflet and Turf.js to visualize reachable areas from a specific point using walking, cycling, driving, and public transport modes." },
          { type: "grid", items: [ { src: "/relocate-app/inicial.png", caption: "Initial Search" }, { src: "/relocate-app/resultado_colectivos.png", caption: "Public Transport Engine" }, { src: "/relocate-app/resultado_subtes.png", caption: "Subway Routing" } ] },
          { type: "text", title: "Highlights", text: "Developed a custom algorithm parsing real public transit GTFS data to generate precise isochrones. The Flask backend handles geocoding via Nominatim and routing logic via OpenRouteService." },
          { type: "text", title: "Feature Overview", text: "Two-stage flow for UI interaction, customizable time sliders, exact route breakdown checkboxes, and custom point of interest layers like hospitals and safety alerts." }
        ]
      },
      es: {
        title: "Relocate - Mapa de Alcance CABA",
        description: "Herramienta visual que permite ver hasta dónde se puede vivir razonablemente según el lugar de trabajo y el medio de transporte elegido.",
        role: "Desarrollador Full Stack",
        content: [
          { type: "text", title: "Resumen", text: "Aplicación interactiva de mapas (Leaflet y Turf.js) para visualizar hasta qué barrios podés llegar en cierta cantidad de minutos usando caminando, bicicleta, auto o transporte público." },
          { type: "grid", items: [ { src: "/relocate-app/inicial.png", caption: "Búsqueda de partida" }, { src: "/relocate-app/resultado_colectivos.png", caption: "Alcance en Colectivos" }, { src: "/relocate-app/resultado_auto.png", caption: "Alcance en Auto" } ] },
          { type: "text", title: "Logros destacados", text: "Desarrollo de un algoritmo propio para calcular isócronas de transporte público usando datos reales de horarios (GTFS), uniendo backend en Python (Flask) con geocodificación de Nominatim." },
          { type: "text", title: "Detalles", text: "Flujo de dos pantallas, controles deslizantes para el tiempo de viaje, desglose dinámico de líneas de transporte y filtros agregados de zonas de interés." }
        ]
      }
    }
  },

  {
    slug: "f1-stats",
    year: "2023",
    client: "Personal / Learning",
    stack: ["React Native", "Expo", "JavaScript"],
    links: { repo: "" },
    hero: { type: "image", src: "/f1-stats/home.png" },
    locales: {
      en: {
        title: "F1 Stats 2020",
        description: "Cross-platform mobile app built with React Native to browse the 2020 Formula 1 season — driver standings, team comparisons and race calendar, all fetched from a live API.",
        role: "Mobile Developer",
        content: [
          { type: "text", title: "Overview", text: "My first React Native project, developed to learn mobile development by building something I was passionate about. The app consumes the Ergast F1 API to display real-time standings, team profiles, and the full race calendar for the 2020 season." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home — Season overview" }, { src: "/f1-stats/drivers.png", caption: "Driver standings" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Team comparisons" }, { src: "/f1-stats/calendar.png", caption: "Race calendar" } ] },
          { type: "text", title: "Technical Highlights", text: "• Built with Expo for fast iteration and seamless testing on both iOS and Android.\n• Integrated the Ergast Developer API with custom hooks for data fetching, caching and error handling.\n• Implemented tab-based navigation with React Navigation and animated list transitions.\n• Responsive layouts adapting to varying screen sizes — designed mobile-first for optimal usability." },
          { type: "text", title: "What I learned", text: "First hands-on experience with React Native's component model, native navigation patterns, and the differences between mobile and web development paradigms. Solidified my understanding of state management and async data flows in a mobile context." }
        ]
      },
      es: {
        title: "F1 Stats 2020",
        description: "App móvil multiplataforma construida con React Native para explorar la temporada 2020 de Fórmula 1 — clasificaciones de pilotos, comparaciones entre equipos y calendario de carreras, todo desde una API en vivo.",
        role: "Desarrollador Mobile",
        content: [
          { type: "text", title: "Resumen", text: "Mi primer proyecto en React Native, desarrollado para aprender desarrollo mobile construyendo algo que me apasiona. La app consume la API Ergast de F1 para mostrar clasificaciones en tiempo real, perfiles de equipos y el calendario completo de la temporada 2020." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home — Resumen de temporada" }, { src: "/f1-stats/drivers.png", caption: "Clasificación de pilotos" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Comparación de equipos" }, { src: "/f1-stats/calendar.png", caption: "Calendario de carreras" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Construida con Expo para iteración rápida y testing fluido en iOS y Android.\n• Integración con la API de Ergast Developer usando hooks customizados para data fetching, caché y manejo de errores.\n• Navegación por tabs con React Navigation y transiciones animadas de listas.\n• Layouts responsivos adaptados a distintos tamaños de pantalla — diseñado mobile-first para usabilidad óptima." },
          { type: "text", title: "Qué aprendí", text: "Primera experiencia práctica con el modelo de componentes de React Native, patrones de navegación nativos y las diferencias entre paradigmas de desarrollo mobile y web. Consolidé mi entendimiento de gestión de estado y flujos de datos asíncronos en un contexto mobile." }
        ]
      }
    }
  },

  {
    slug: "yt-notes",
    year: "2022",
    client: "Personal",
    stack: ["JavaScript", "Chrome Extensions API", "HTML", "CSS"],
    links: { repo: "" },
    hero: { type: "image", src: "/YT-Notes/ytnoteslogo.png" },
    locales: {
      en: {
        title: "YT-Notes",
        description: "Chrome extension that lets you create timestamped annotations on any YouTube video — jump to any note instantly while watching. Built in a pre-AI era when extension development documentation was scarce.",
        role: "Solo Developer",
        content: [
          { type: "text", title: "Overview", text: "A browser extension designed to enhance the YouTube learning experience. Users can add notes at specific timestamps, and click any note to jump directly to that moment in the video — turning passive watching into active note-taking." },
          { type: "grid", items: [ { src: "/YT-Notes/ytnotes1.jpg", caption: "Extension panel with timestamped notes" }, { src: "/YT-Notes/ytnotes2.jpg", caption: "Note creation interface" } ] },
          { type: "text", title: "Technical Highlights", text: "• Built using the Chrome Extensions Manifest V2 API — content scripts inject a sidebar panel directly into YouTube's DOM.\n• Leveraged Chrome's Storage API for persistent note storage across sessions.\n• Custom timestamp parsing and video seek integration using YouTube's player API.\n• Published to the Chrome Web Store — navigated the complex review and approval process independently." },
          { type: "text", title: "Context & Challenges", text: "Developed in 2020, when Chrome extension documentation was extremely limited and there was zero AI assistance available. Figuring out content script injection, message passing between background/content/popup scripts, and the Chrome Web Store publishing pipeline was entirely self-taught through trial and error. The extension is currently outdated due to Manifest V3 migration changes, but remains a testament to problem-solving with minimal resources." }
        ]
      },
      es: {
        title: "YT-Notes",
        description: "Extensión de Chrome que permite crear anotaciones con marca de tiempo en cualquier video de YouTube — saltá a cualquier nota al instante mientras mirás. Construida en una era pre-IA cuando la documentación de extensiones era escasa.",
        role: "Desarrollador Solo",
        content: [
          { type: "text", title: "Resumen", text: "Una extensión de navegador diseñada para mejorar la experiencia de aprendizaje en YouTube. Los usuarios pueden agregar notas en timestamps específicos y hacer clic en cualquier nota para saltar directamente a ese momento del video — transformando la visualización pasiva en toma de notas activa." },
          { type: "grid", items: [ { src: "/YT-Notes/ytnotes1.jpg", caption: "Panel de extensión con notas timestamped" }, { src: "/YT-Notes/ytnotes2.jpg", caption: "Interfaz de creación de notas" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Construida usando la API de Chrome Extensions Manifest V2 — los content scripts inyectan un panel lateral directamente en el DOM de YouTube.\n• Uso de la Storage API de Chrome para almacenamiento persistente de notas entre sesiones.\n• Parsing de timestamps personalizado e integración con la API del reproductor de YouTube para seek.\n• Publicada en el Chrome Web Store — navegué el complejo proceso de revisión y aprobación de forma independiente." },
          { type: "text", title: "Contexto y Desafíos", text: "Desarrollada en 2020, cuando la documentación de extensiones de Chrome era extremadamente limitada y no había cero asistencia de IA disponible. Entender la inyección de content scripts, el message passing entre scripts background/content/popup, y el pipeline de publicación del Chrome Web Store fue completamente autodidacta por prueba y error. La extensión está actualmente desactualizada por los cambios de migración a Manifest V3, pero es un testimonio de resolución de problemas con recursos mínimos." }
        ]
      }
    }
  }
]
