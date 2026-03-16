export const projects = [
  
  {
    slug: "tuerca",
    year: "2026",
    client: "Active / Production",
    stack: ["React Native", "Expo", "tRPC", "Drizzle ORM", "PostgreSQL", "Better-Auth", "Supabase"],
    links: { live: "https://tuerca.app", live2: "https://play.google.com/store/apps/details?id=app.tuerca.mobile" },
    hero: { type: "image", src: "/tuerca/dash.png" },
    locales: {
      en: {
        title: "TUERCA — Field Service Management Platform",
        description: "Production mobile FSM platform for field service teams — evolved from a web prototype to a cross-platform React Native app with route optimization, team management, and real-time job tracking.",
        role: "Sole Developer & Architect",
        content: [
          { type: "text", title: "Overview", text: "TUERCA started as a web-based SaaS dashboard for service professionals. After validating the core workflows, the project was rearchitected into a dedicated mobile-first platform — because the real users, field technicians, are always on-site, not at a desk.\n\nThe result is a production React Native app available on Google Play that gives technical teams the tools to manage jobs, optimize routes, track finances, and coordinate in real time — all from their phones." },
          { type: "grid", items: [ { src: "/tuerca/dash.png", caption: "Main dashboard — card-based overview" }, { src: "/tuerca/jobs_list.png", caption: "Jobs list — filterable work orders" } ] },
          { type: "text", title: "Route Optimization", text: "One of the core differentiators: technicians receive a list of stops and the app converts them into an optimized route, minimizing travel time. Each stop links directly to Google Maps with one tap for turn-by-turn navigation.\n\nThis removes the friction of manual planning and lets field workers focus entirely on execution." },
          { type: "grid", items: [ { src: "/tuerca/routes.png", caption: "Routes panel — multi-stop planning" }, { src: "/tuerca/route_execution.png", caption: "Route in execution — field navigation" } ] },
          { type: "text", title: "Job Lifecycle Management", text: "From creation to payment, the full job lifecycle is handled in-app:\n• Job creation with client assignment, priority, and scheduling.\n• Activity timeline — technicians log real-time updates from the field.\n• Supplies tracking — materials used, quantities and costs per job.\n• Payment recording — field collections tracked per work order.\n\nEvery status change and action is synced instantly across the team." },
          { type: "grid", items: [ { src: "/tuerca/job_creation.png", caption: "Job creation — quick assignment flow" }, { src: "/tuerca/job.png", caption: "Job detail — full work order view" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_activities.png", caption: "Activity feed — real-time field reporting" }, { src: "/tuerca/job_payment.png", caption: "Payment tracking — field collections" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_supplies.png", caption: "Supplies log — materials and cost tracking" }, { src: "/tuerca/clients.png", caption: "Client management — contact and history" } ] },
          { type: "text", title: "Team Management", text: "A granular role system (Owner, Admin, Member) controls exactly what each person can see and do. Admins can invite members, adjust permissions, and monitor team performance from a single view.\n\nDesigned for small-to-mid service companies where accountability and clear ownership matter." },
          { type: "grid", items: [ { src: "/tuerca/team.png", caption: "Team panel — member overview" }, { src: "/tuerca/team_edit.png", caption: "Role & permission editing" } ] },
          { type: "text", title: "Architecture & Technical Migration", text: "The platform was migrated from a React web + tRPC setup to a fully cross-platform mobile stack:\n• React Native + Expo for iOS/Android from a single codebase.\n• NativeWind (TailwindCSS for React Native) for consistent, dark-mode-first UI.\n• tRPC for end-to-end type-safe API — shared types between server and mobile client.\n• Drizzle ORM with PostgreSQL for typed schema definitions and migrations.\n• Better-Auth for session management and role-based access control.\n• Calendar Sync — jobs are dynamically pushed to the device's native calendar.\n• Multi-tenant architecture: each organization has isolated data, members and billing." },
          { type: "text", title: "End-to-End Testing (Maestro)", text: "Critical user flows are covered by automated E2E tests using Maestro — a mobile UI testing framework that simulates real user interactions on an emulator.\n\nTests validate the full experience end-to-end: from gesture input and screen transitions to data persistence and error states. This ensures that updates don't break the core workflows that field teams depend on daily." },
          { type: "video", src: "/tuerca/tests/registro.mp4", title: "E2E Test — Registration Flow", caption: "Maestro automated test: user registration & onboarding (emulator)" }
        ]
      },
      es: {
        title: "TUERCA — Plataforma de Gestión de Servicios de Campo",
        description: "App móvil FSM en producción para equipos de campo — evolucionó de un prototipo web a una app React Native cross-platform con optimización de rutas, gestión de equipos y seguimiento de trabajos en tiempo real.",
        role: "Desarrollador Único & Arquitecto",
        content: [
          { type: "text", title: "Resumen", text: "TUERCA comenzó como un dashboard SaaS web para profesionales de servicios. Después de validar los flujos de trabajo principales, el proyecto fue rediseñado como una plataforma mobile-first — porque los usuarios reales, los técnicos de campo, están siempre en terreno, no frente a un escritorio.\n\nEl resultado es una app React Native en producción, disponible en Google Play, que le da a los equipos técnicos las herramientas para gestionar trabajos, optimizar rutas, hacer seguimiento financiero y coordinar en tiempo real, todo desde el celular." },
          { type: "grid", items: [ { src: "/tuerca/dash.png", caption: "Dashboard principal — resumen en tarjetas" }, { src: "/tuerca/jobs_list.png", caption: "Lista de trabajos — órdenes filtrables" } ] },
          { type: "text", title: "Optimización de Rutas", text: "Uno de los diferenciadores centrales: los técnicos reciben una lista de paradas y la app las convierte en una ruta optimizada, minimizando tiempos de traslado. Cada parada se abre en Google Maps con un solo tap para navegación giro a giro.\n\nEsto elimina la fricción de la planificación manual y permite que los trabajadores de campo se concentren completamente en la ejecución." },
          { type: "grid", items: [ { src: "/tuerca/routes.png", caption: "Panel de rutas — planificación multi-parada" }, { src: "/tuerca/route_execution.png", caption: "Ruta en ejecución — navegación en campo" } ] },
          { type: "text", title: "Gestión del Ciclo de Vida del Trabajo", text: "Desde la creación hasta el cobro, el ciclo completo de un trabajo se maneja dentro de la app:\n• Creación de trabajo con asignación de cliente, prioridad y programación.\n• Línea de tiempo de actividades — los técnicos registran actualizaciones en tiempo real desde el campo.\n• Seguimiento de insumos — materiales usados, cantidades y costos por trabajo.\n• Registro de pagos — cobros en campo registrados por orden de trabajo.\n\nCada cambio de estado y acción se sincroniza al instante en todo el equipo." },
          { type: "grid", items: [ { src: "/tuerca/job_creation.png", caption: "Creación de trabajo — flujo de asignación rápida" }, { src: "/tuerca/job.png", caption: "Detalle del trabajo — vista completa de la orden" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_activities.png", caption: "Feed de actividades — reporte en tiempo real desde el campo" }, { src: "/tuerca/job_payment.png", caption: "Seguimiento de pagos — cobros en campo" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_supplies.png", caption: "Registro de insumos — materiales y costos" }, { src: "/tuerca/clients.png", caption: "Gestión de clientes — contacto e historial" } ] },
          { type: "text", title: "Gestión de Equipos", text: "Un sistema de roles granular (Propietario, Admin, Miembro) controla exactamente qué puede ver y hacer cada persona. Los administradores pueden invitar miembros, ajustar permisos y monitorear el rendimiento del equipo desde una sola vista.\n\nDiseñado para empresas de servicios pequeñas y medianas donde la responsabilidad y la claridad de roles son fundamentales." },
          { type: "grid", items: [ { src: "/tuerca/team.png", caption: "Panel de equipo — vista general de miembros" }, { src: "/tuerca/team_edit.png", caption: "Edición de roles y permisos" } ] },
          { type: "text", title: "Arquitectura y Migración Técnica", text: "La plataforma fue migrada de un stack React web + tRPC a una solución cross-platform móvil completa:\n• React Native + Expo para iOS/Android desde un único codebase.\n• NativeWind (TailwindCSS para React Native) para una UI consistente con dark mode nativo.\n• tRPC para una API completamente tipada de punta a punta — tipos compartidos entre servidor y cliente móvil.\n• Drizzle ORM con PostgreSQL para definiciones de esquema tipadas y migraciones.\n• Better-Auth para gestión de sesiones y control de acceso basado en roles.\n• Sincronización con Calendario — los trabajos se sincronizan dinámicamente al calendario nativo del dispositivo.\n• Arquitectura multi-tenant: cada organización tiene datos, miembros y facturación aislados." },
          { type: "text", title: "Tests End-to-End (Maestro)", text: "Los flujos de usuario críticos están cubiertos por tests E2E automatizados con Maestro — un framework de testing de UI móvil que simula interacciones reales de usuario en un emulador.\n\nLos tests validan la experiencia completa de punta a punta: desde gestos e interacciones en pantalla hasta persistencia de datos y estados de error. Esto garantiza que las actualizaciones no rompan los flujos principales de los que dependen los equipos de campo a diario." },
          { type: "video", src: "/tuerca/tests/registro.mp4", title: "Test E2E — Flujo de Registro", caption: "Test automatizado con Maestro: registro de usuario y onboarding (emulador)" }
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
          { type: "grid", items: [ { src: "/relocate-app/inicial.png", caption: "Búsqueda de partida" }, { src: "/relocate-app/resultado_colectivos.png", caption: "Alcance en Colectivos" }, { src: "/relocate-app/resultado_subtes.png", caption: "Alcance en Subte" } ] },
          { type: "text", title: "Logros destacados", text: "Desarrollo de un algoritmo propio para calcular isócronas de transporte público usando datos reales de horarios (GTFS), uniendo backend en Python (Flask) con geocodificación de Nominatim." },
          { type: "text", title: "Detalles", text: "Flujo de dos pantallas, controles deslizantes para el tiempo de viaje, desglose dinámico de líneas de transporte y filtros agregados de zonas de interés." }
        ]
      }
    }
  },
  {
    slug: "single-resto",
    year: "2025",
    client: "Personal / Client",
    stack: ["Next.js", "TailwindCSS", "React", "Docker", "monorepo", "PostgreSQL", "Drizzle ORM", "mercadopago"],
    links: { live: "https://basic-single-restorant-template-web-mu.vercel.app/", live2: "https://basic-single-restorant-template-web.vercel.app/"},
    hero: { type: "image", src: "/single_resto/portada.png" },
    locales: {
      en: {
        title: "Single Resto — Web & Dashboard",
        description: "Full-stack restaurant platform with public ordering website and admin dashboard — Docker-deployed to a VPS with real-time order notifications, MercadoPago payments, WhatsApp integration and white-label theming.",
        role: "Lead Developer",
        content: [
          { type: "text", title: "Overview", text: "Single Resto is a complete restaurant management system consisting of a customer-facing ordering website and an admin dashboard for restaurant operators. The project started as a client engagement and evolved into a white-label template capable of serving multiple restaurant brands from a single codebase. It represents my most production-oriented project to date — tackling real-world challenges from payment processing to self-hosted infrastructure on a VPS." },
          { type: "grid", items: [ { src: "/single_resto/portada.png", caption: "Public restaurant website" } ] },
          { type: "text", title: "Public Website", text: "The customer-facing site is a responsive Next.js application where diners can:\n• Browse the full product catalogue organized by categories.\n• Add items to a persistent cart with quantity controls.\n• Place orders with delivery or pickup options.\n• Pay via MercadoPago (Argentina's leading payment gateway) with automatic order confirmation.\n• See real-time store status — the site respects the restaurant's configured opening hours and blocks checkout outside business hours, showing clear alerts to the user." },
          { type: "video", src: "/single_resto/video_demostracion_horarios_y_website_pedido.mp4", title: "Full Ordering Flow", caption: "End-to-end demo: browsing products, adding to cart, checkout with opening hours enforcement and order placement" },
          { type: "video", src: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario.mp4", title: "Checkout & Alerts", caption: "Unsaved changes alerts, edit options and checkout blocked outside business hours" },
          { type: "text", title: "Admin Dashboard", text: "The dashboard gives restaurant owners full control over their operation:\n• Order management panel — incoming orders appear in near-realtime via SSE (Server-Sent Events) and can be accepted, prepared and completed with ticket printing support.\n• Product CRUD — create, edit and delete products with image uploads to Cloudflare R2, category assignment, pricing and visibility toggles.\n• Store configuration — set opening hours, delivery zones, store address, and toggle maintenance mode to take the site offline instantly.\n• WhatsApp integration — quick-action buttons that open pre-formatted WhatsApp messages to customers for order updates, powered by a self-hosted WhatsApp API container." },
          { type: "video", src: "/single_resto/caja_y_manejo_de_pedidos.mp4", title: "Order Management", caption: "Order panel: receiving, managing and processing incoming orders" },
          { type: "video", src: "/single_resto/creacion_productos_acciones_tabla.mp4", title: "Product Management", caption: "Creating products, table actions and category management" },
          { type: "video", src: "/single_resto/subida_imagenes.mp4", title: "Image Uploads", caption: "Product image upload flow with R2 storage" },
          { type: "video", src: "/single_resto/cambio_dir_tienda.mp4", title: "Store Settings", caption: "Updating store address and delivery configuration" },
          { type: "text", title: "White-Label Architecture", text: "The system was architected as a white-label template from the ground up. Multiple restaurant brands can operate from the same codebase with independent themes, logos, product catalogues and configurations. Each tenant gets its own URL while sharing the underlying infrastructure — reducing maintenance overhead and enabling rapid onboarding of new clients." },
          { type: "video", src: "/single_resto/video_demostracion_white_label.mp4", title: "White-Label Demo", caption: "Same codebase, different brand: switching between restaurant themes" },
          { type: "video", src: "/single_resto/video_demostracion_flag_mantenimiento.mp4", title: "Maintenance Mode", caption: "Toggling maintenance mode to take the site offline instantly" },
          { type: "text", title: "Infrastructure & Deployment", text: "One of the most challenging and rewarding aspects of this project was the self-hosted deployment. The entire stack runs on an Oracle Cloud VPS orchestrated with Docker Compose:\n• Application container — Next.js server with SSR and API routes.\n• PostgreSQL container — relational database with Drizzle ORM for type-safe queries and migrations.\n• WhatsApp API container — a self-hosted local WhatsApp API service that required significant effort to configure and stabilize, enabling the dashboard to send automated messages to customers.\n• Cloudflare R2 — object storage for product images, replacing traditional local file storage with a CDN-backed solution.\n• Reverse proxy — Nginx handling SSL termination and routing.\n\nThis deployment was achieved through careful task planning and organization — skills I developed in my software engineering courses at university — applied here in a real production environment for the first time. Managing multi-container Docker deployments, debugging networking between containers, and maintaining uptime on a VPS pushed me well beyond typical frontend development." },
          { type: "text", title: "Real-Time Notifications with SSE", text: "Instead of WebSockets, I implemented Server-Sent Events (SSE) for the order notification system. The dashboard maintains a persistent connection to the server and receives push updates whenever a new order is placed. This approach was chosen for its simplicity and reliability over WebSockets for a unidirectional notification flow — the server pushes order events to the dashboard without the complexity of bidirectional state management." },
          { type: "text", title: "Centralized Logging with Wide Events", text: "Implemented a modern logging system based on Wide Events (Canonical Log Lines) that replaced scattered console.log statements with structured, analytical events. Instead of multiple scattered log lines, the system emits ONE structured event per request/action with all necessary context: timestamp, request_id, user, action_name, duration_ms, outcome and specific business data." },
          { type: "grid", items: [ { src: "/single_resto/image.png", caption: "Wide Events in action — structured terminal output" } ] },
          { type: "code", title: "Example: Structured Wide Event", text: `{
  "timestamp": "2026-02-19T16:40:29.786Z",
  "request_id": "mltot5y2-3pf6a",
  "service": "single-resto",
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
          { type: "text", title: "System Benefits", text: "• Single event per action with complete context (user, duration, outcome).\n• Automatic detection of errors and results using byethrow.\n• Analytical queries: error rate by action, average response time by tenant.\n• Complete traceability with unique request_id per request.\n• Significant reduction of log noise compared to traditional console.log." },
          { type: "text", title: "What This Project Taught Me", text: "Single Resto was the project that pushed me closest to professional-level development. It exposed me to technologies and challenges I had never faced before:\n• Docker and container orchestration for multi-service deployments.\n• Self-hosted infrastructure management on a VPS — networking, SSL, uptime monitoring.\n• Cloudflare R2 for production-grade object storage.\n• Payment gateway integration with MercadoPago.\n• Monorepo architecture for sharing code between the public site and dashboard.\n• SSE as an alternative to WebSockets for real-time features.\n• Structured logging and observability with Wide Events.\n\nMost importantly, it was where I applied the project management and organizational skills from my software engineering courses in a real production context — planning deployments, managing a client relationship, and maintaining a live system used by actual customers." }
        ]
      },
      es: {
        title: "Single Resto — Web & Dashboard",
        description: "Plataforma full-stack para restaurantes con web de pedidos y dashboard admin — deploy en Docker sobre VPS con notificaciones en tiempo real, pagos con MercadoPago, integración WhatsApp y soporte white-label.",
        role: "Desarrollador Principal",
        content: [
          { type: "text", title: "Resumen", text: "Single Resto es un sistema completo de gestión para restaurantes que incluye una web de pedidos para los clientes y un dashboard de administración para los operadores del local. El proyecto empezó como un trabajo para un cliente y evolucionó a un template white-label capaz de servir múltiples marcas de restaurantes desde un solo codebase. Representa mi proyecto más orientado a producción hasta la fecha — enfrentando desafíos reales desde procesamiento de pagos hasta infraestructura self-hosted en un VPS." },
          { type: "grid", items: [ { src: "/single_resto/portada.png", caption: "Web pública del restaurante" } ] },
          { type: "text", title: "Web Pública", text: "La web orientada al cliente es una aplicación Next.js responsiva donde los comensales pueden:\n• Explorar el catálogo completo de productos organizado por categorías.\n• Agregar items a un carrito persistente con controles de cantidad.\n• Realizar pedidos con opciones de delivery o retiro.\n• Pagar vía MercadoPago con confirmación automática del pedido.\n• Ver el estado del local en tiempo real — la web respeta los horarios configurados del restaurante y bloquea el checkout fuera del horario de atención, mostrando alertas claras al usuario." },
          { type: "video", src: "/single_resto/video_demostracion_horarios_y_website_pedido.mp4", title: "Flujo Completo de Pedido", caption: "Demo completa: explorar productos, agregar al carrito, checkout con control de horarios y colocación de pedido" },
          { type: "video", src: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario.mp4", title: "Checkout y Alertas", caption: "Alertas de cambios no guardados, opciones de edición y checkout bloqueado fuera de horario" },
          { type: "text", title: "Dashboard de Administración", text: "El dashboard le da al dueño del restaurante control total sobre su operación:\n• Panel de pedidos — los pedidos entrantes aparecen en casi-tiempo-real vía SSE (Server-Sent Events) y pueden ser aceptados, preparados y completados con soporte de impresión de tickets.\n• CRUD de productos — crear, editar y eliminar productos con subida de imágenes a Cloudflare R2, asignación de categorías, precios y toggles de visibilidad.\n• Configuración del local — establecer horarios, zonas de delivery, dirección del local y activar modo mantenimiento para sacar la web de servicio al instante.\n• Integración WhatsApp — botones de acción rápida que abren mensajes pre-formateados de WhatsApp para actualizaciones de pedidos, usando una API de WhatsApp self-hosted en un container." },
          { type: "video", src: "/single_resto/caja_y_manejo_de_pedidos.mp4", title: "Gestión de Pedidos", caption: "Panel de pedidos: recibir, gestionar y procesar pedidos entrantes" },
          { type: "video", src: "/single_resto/creacion_productos_acciones_tabla.mp4", title: "Gestión de Productos", caption: "Creación de productos, acciones de tabla y gestión de categorías" },
          { type: "video", src: "/single_resto/subida_imagenes.mp4", title: "Subida de Imágenes", caption: "Flujo de subida de imágenes con almacenamiento en R2" },
          { type: "video", src: "/single_resto/cambio_dir_tienda.mp4", title: "Configuración del Local", caption: "Actualización de dirección del local y configuración de delivery" },
          { type: "text", title: "Arquitectura White-Label", text: "El sistema fue diseñado como template white-label desde el principio. Múltiples marcas de restaurantes pueden operar desde el mismo codebase con temas, logos, catálogos de productos y configuraciones independientes. Cada tenant tiene su propia URL mientras comparte la infraestructura subyacente — reduciendo el overhead de mantenimiento y permitiendo el onboarding rápido de nuevos clientes." },
          { type: "video", src: "/single_resto/video_demostracion_white_label.mp4", title: "Demo White-Label", caption: "Mismo codebase, diferente marca: alternando entre temas de restaurantes" },
          { type: "video", src: "/single_resto/video_demostracion_flag_mantenimiento.mp4", title: "Modo Mantenimiento", caption: "Activar modo mantenimiento para sacar el sitio de servicio al instante" },
          { type: "text", title: "Infraestructura & Deploy", text: "Uno de los aspectos más desafiantes y gratificantes de este proyecto fue el deploy self-hosted. Todo el stack corre en un VPS de Oracle Cloud orquestado con Docker Compose:\n• Container de aplicación — servidor Next.js con SSR y rutas API.\n• Container de PostgreSQL — base de datos relacional con Drizzle ORM para queries y migraciones type-safe.\n• Container de API WhatsApp — un servicio local de API de WhatsApp self-hosted que requirió un esfuerzo significativo para configurar y estabilizar, permitiendo al dashboard enviar mensajes automáticos a los clientes.\n• Cloudflare R2 — almacenamiento de objetos para imágenes de productos, reemplazando el almacenamiento local tradicional con una solución respaldada por CDN.\n• Reverse proxy — Nginx manejando terminación SSL y routing.\n\nEste deploy fue logrado mediante planificación cuidadosa de tareas y organización — habilidades que desarrollé en mis cursadas de ingeniería de software en la facultad — aplicadas aquí en un entorno de producción real por primera vez. Gestionar deploys multi-container en Docker, debuggear networking entre containers y mantener uptime en un VPS me empujó mucho más allá del desarrollo frontend típico." },
          { type: "text", title: "Notificaciones en Tiempo Real con SSE", text: "En lugar de WebSockets, implementé Server-Sent Events (SSE) para el sistema de notificaciones de pedidos. El dashboard mantiene una conexión persistente con el servidor y recibe actualizaciones push cada vez que se realiza un nuevo pedido. Este enfoque fue elegido por su simplicidad y confiabilidad sobre WebSockets para un flujo de notificaciones unidireccional — el servidor pushea eventos de pedidos al dashboard sin la complejidad de gestión de estado bidireccional." },
          { type: "text", title: "Logging Centralizado con Wide Events", text: "Implementé un sistema de logging moderno basado en Wide Events (Canonical Log Lines) que reemplazó los console.log dispersos por eventos estructurados y analíticos. En lugar de múltiples líneas de log dispersas, el sistema emite UN evento estructurado por request/acción con todo el contexto necesario: timestamp, request_id, user, action_name, duration_ms, outcome y datos de negocio específicos." },
          { type: "grid", items: [ { src: "/single_resto/image.png", caption: "Wide Events en acción — salida estructurada en terminal" } ] },
          { type: "code", title: "Ejemplo: Wide Event Estructurado", text: `{
  "timestamp": "2026-02-19T16:40:29.786Z",
  "request_id": "mltot5y2-3pf6a",
  "service": "single-resto",
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
          { type: "text", title: "Beneficios del Sistema", text: "• Un solo evento por acción con contexto completo (user, duration, outcome).\n• Detección automática de errores y resultados usando byethrow.\n• Queries analíticas: tasa de error por acción, tiempo promedio de respuesta por tenant.\n• Trazabilidad completa con request_id único por solicitud.\n• Reducción significativa de ruido en logs comparado con console.log tradicional." },
          { type: "text", title: "Lo Que Me Enseñó Este Proyecto", text: "Single Resto fue el proyecto que me acercó más al desarrollo profesional. Me expuso a tecnologías y desafíos que nunca había enfrentado:\n• Docker y orquestación de containers para deploys multi-servicio.\n• Gestión de infraestructura self-hosted en un VPS — networking, SSL, monitoreo de uptime.\n• Cloudflare R2 para almacenamiento de objetos de nivel producción.\n• Integración de pasarela de pagos con MercadoPago.\n• Arquitectura monorepo para compartir código entre el sitio público y el dashboard.\n• SSE como alternativa a WebSockets para features en tiempo real.\n• Logging estructurado y observabilidad con Wide Events.\n\nLo más importante es que fue donde apliqué las habilidades de gestión de proyectos y organización de mis cursadas de ingeniería de software en un contexto de producción real — planificando deploys, gestionando la relación con el cliente y manteniendo un sistema en vivo usado por clientes reales." }
        ]
      }
    }
  },

  
  {
    slug: "gsp",
    year: "2025",
    client: "Personal / Research",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Cloudflare R2", "Better-Auth"],
    links: { repo: "https://github.com/juanm512/gsp" },
    hero: { type: "image", src: "/gsp/thumbnail.webp" },
    locales: {
      en: {
        title: "GSP — Gaussian Splatting Platform",
        description: "Self-hosted platform for uploading scenes and orchestrating GPU rendering jobs that produce Gaussian Splatting outputs — a research project exploring an emerging 3D reconstruction technology.",
        role: "Developer / Research",
        content: [
          { type: "text", title: "What is Gaussian Splatting?", text: "3D Gaussian Splatting is a real-time rendering technique that reconstructs photorealistic 3D scenes from a set of 2D images. Unlike traditional mesh-based rendering, it represents scenes as millions of semi-transparent ellipsoids (\"splats\"), enabling high-fidelity reconstruction of real environments with neural-network-level visual quality.\n\nThis project was built to explore the technology practically — by building the infrastructure needed to run these renders at scale." },
          { type: "text", title: "What it does", text: "GSP is a multi-tenant platform where users upload a set of photos of a scene and receive a fully rendered Gaussian Splatting output. Under the hood:\n• Files are uploaded to Cloudflare R2 and a render job is queued.\n• A background worker rents GPU compute, runs the splatting algorithm, and stores the result.\n• Failed jobs are retried automatically with exponential backoff.\n• Organizations can invite members and manage their own render history and usage." },
          { type: "full-width-image", src: "/gsp/pipeline.png", caption: "Rendering pipeline — upload → preprocessing → GPU queue → output → R2 storage" },
          { type: "text", title: "Technical Highlights", text: "• Background job orchestration with retry logic and status tracking (pending / running / failed / success).\n• GPU rental pipeline — compute is provisioned on demand per job, minimizing idle costs.\n• Cloudflare R2 for asset storage — uploads and rendered outputs.\n• Multi-tenant architecture: organizations with member invitations and per-org job history.\n• Payment service integration for usage-based billing.\n• Next.js frontend with shadcn/ui; Drizzle ORM + PostgreSQL for job and user state." },
          { type: "video", src: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted.mp4", title: "Admin Interface", caption: "Quick walkthrough of the admin panel — job queue, org management and render status" }
        ]
      },
      es: {
        title: "GSP — Plataforma de Gaussian Splatting",
        description: "Plataforma self-hosted para subir escenas y orquestar trabajos de render GPU que producen salidas de Gaussian Splatting — un proyecto de investigación sobre una tecnología 3D emergente.",
        role: "Desarrollador / Investigación",
        content: [
          { type: "text", title: "¿Qué es Gaussian Splatting?", text: "Gaussian Splatting es una técnica de renderizado en tiempo real que reconstruye escenas 3D fotorrealistas a partir de imágenes 2D. A diferencia del renderizado tradicional con mallas, representa las escenas como millones de elipsoides semitransparentes (\"splats\"), logrando una reconstrucción de alta fidelidad de entornos reales con calidad visual comparable a redes neuronales.\n\nEste proyecto fue construido para explorar la tecnología de forma práctica — desarrollando la infraestructura necesaria para correr estos renders a escala." },
          { type: "text", title: "Qué hace", text: "GSP es una plataforma multi-tenant donde los usuarios suben un conjunto de fotos de una escena y reciben una salida de Gaussian Splatting completamente renderizada. Por debajo:\n• Los archivos se suben a Cloudflare R2 y se encola un trabajo de render.\n• Un worker en background alquila cómputo GPU, ejecuta el algoritmo de splatting y almacena el resultado.\n• Los trabajos fallidos se reintentan automáticamente con backoff exponencial.\n• Las organizaciones pueden invitar miembros y gestionar su propio historial de renders y uso." },
          { type: "full-width-image", src: "/gsp/pipeline.png", caption: "Pipeline de renderizado — upload → preprocesamiento → cola GPU → salida → almacenamiento R2" },
          { type: "text", title: "Destacados Técnicos", text: "• Orquestación de trabajos en background con lógica de reintentos y seguimiento de estado (pendiente / en proceso / fallido / exitoso).\n• Pipeline de alquiler de GPU — el cómputo se aprovisiona bajo demanda por trabajo, minimizando costos ociosos.\n• Cloudflare R2 para almacenamiento de assets — uploads y salidas renderizadas.\n• Arquitectura multi-tenant: organizaciones con invitaciones de miembros e historial de trabajos por organización.\n• Integración de servicio de pagos para facturación basada en uso.\n• Frontend en Next.js con shadcn/ui; Drizzle ORM + PostgreSQL para estado de trabajos y usuarios." },
          { type: "video", src: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted.mp4", title: "Interfaz de Administrador", caption: "Recorrido por el panel de admin — cola de trabajos, gestión de organizaciones y estado de renders" }
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
    slug: "atlas-3d",
    year: "2023",
    client: "Freelance / Research",
    stack: ["Next.js", "threejs", "react-three-fiber", "framer-motion"],
    links: {
      repo: "",
      live: "https://atlas3d.vercel.app/"
    },
    hero: { type: "image", src: "/Atlas3d/index.jpg" },
    locales: {
      en: {
        title: "Atlas 3D — Interactive Anatomy Atlas",
        description: "Interactive 3D anatomy atlas built with Three.js and React for a medical school textbook project — real-time rendering, zoom, rotation and model annotations designed for students and educators.",
        role: "Frontend / 3D Engineer",
        content: [
          { type: "text", title: "Origin", text: "This project started when a friend who was writing a textbook for an anatomy department at a medical school asked me to build an interactive companion tool. The goal was to create a web-based 3D atlas that students could use alongside the book to explore human bones in a way that static illustrations simply can't provide — with rotation, zoom and contextual annotations." },
          { type: "text", title: "Overview", text: "The result is a full-featured 3D anatomy atlas that renders human skeletal models in the browser using Three.js via react-three-fiber. Users can freely rotate, zoom and pan around each bone, while annotation overlays display anatomical names and descriptions anchored to specific 3D coordinates. The interface was designed to be intuitive enough for non-technical medical students while maintaining the precision required for academic use." },
          { type: "grid", items: [ { src: "/Atlas3d/home.gif", caption: "Interactive 3D viewer" }, { src: "/Atlas3d/bonePage.gif", caption: "Detailed bone exploration" } ] },
          { type: "text", title: "Technical Highlights", text: "• Built with react-three-fiber for declarative 3D scene composition inside a Next.js application.\n• GPU-accelerated model loading with progressive LOD (Level of Detail) for faster initial render and smooth transitions between detail levels.\n• Custom annotation system that binds metadata to 3D world coordinates — labels remain accurately positioned across all camera rotations and zoom levels.\n• Touch-gesture support for mobile devices: pinch-to-zoom, two-finger rotation, and swipe navigation between bones.\n• Performance profiled and optimized draw calls to maintain 60 fps interaction on mid-range hardware.\n• Framer Motion animations for UI transitions between the bone catalogue and individual bone detail views." },
          { type: "text", title: "What This Project Taught Me", text: "Beyond the technical challenges, Atlas 3D was my first real experience working with a non-technical client on a sustained project. It taught me lessons I would later formally study in software engineering courses at university:\n• Requirements gathering — translating an anatomist's vision into concrete features and user stories.\n• Client communication — regular check-ins, managing expectations, presenting progress through demos instead of technical jargon.\n• Task organization — breaking a complex project into milestones, prioritizing core functionality over nice-to-haves, and iterating based on feedback.\n• Scope management — learning when to push back on feature requests and when to accommodate them.\n\nThis project gave me a practical foundation in project management and client-facing development long before I encountered those concepts in a classroom." }
        ]
      },
      es: {
        title: "Atlas 3D — Atlas de Anatomía Interactivo",
        description: "Atlas de anatomía 3D interactivo con Three.js y React para un proyecto de libro de texto de una facultad de medicina — renderizado en tiempo real, zoom, rotación y anotaciones sobre modelos diseñados para estudiantes y docentes.",
        role: "Frontend / Ingeniero 3D",
        content: [
          { type: "text", title: "Origen", text: "Este proyecto nació cuando un amigo que estaba escribiendo un libro para una cátedra de anatomía en la facultad de medicina me pidió construir una herramienta interactiva complementaria. El objetivo era crear un atlas 3D web que los estudiantes pudieran usar junto al libro para explorar huesos humanos de una manera que las ilustraciones estáticas simplemente no pueden ofrecer — con rotación, zoom y anotaciones contextuales." },
          { type: "text", title: "Resumen", text: "El resultado es un atlas de anatomía 3D completo que renderiza modelos esqueléticos humanos en el navegador usando Three.js mediante react-three-fiber. Los usuarios pueden rotar, hacer zoom y desplazarse libremente alrededor de cada hueso, mientras que las anotaciones superpuestas muestran nombres y descripciones anatómicas ancladas a coordenadas 3D específicas. La interfaz fue diseñada para ser lo suficientemente intuitiva para estudiantes de medicina no técnicos, manteniendo la precisión requerida para uso académico." },
          { type: "grid", items: [ { src: "/Atlas3d/home.gif", caption: "Visor 3D interactivo" }, { src: "/Atlas3d/bonePage.gif", caption: "Exploración detallada de huesos" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Construido con react-three-fiber para composición declarativa de escenas 3D dentro de una aplicación Next.js.\n• Carga de modelos acelerada por GPU con LOD (Level of Detail) progresivo para renderizado inicial rápido y transiciones suaves entre niveles de detalle.\n• Sistema de anotaciones personalizado que vincula metadatos a coordenadas 3D del mundo — las etiquetas se mantienen posicionadas con precisión durante todas las rotaciones y niveles de zoom.\n• Soporte de gestos táctiles para dispositivos móviles: pinch-to-zoom, rotación con dos dedos y navegación por swipe entre huesos.\n• Perfilado de rendimiento y optimización de draw calls para mantener interacción a 60 fps en hardware de gama media.\n• Animaciones con Framer Motion para transiciones de UI entre el catálogo de huesos y las vistas de detalle individuales." },
          { type: "text", title: "Lo Que Me Enseñó Este Proyecto", text: "Más allá de los desafíos técnicos, Atlas 3D fue mi primera experiencia real trabajando con un cliente no técnico en un proyecto sostenido. Me enseñó lecciones que luego estudié formalmente en las materias de ingeniería de software en la facultad:\n• Relevamiento de requerimientos — traducir la visión de un anatomista en funcionalidades concretas e historias de usuario.\n• Comunicación con el cliente — reuniones periódicas, gestión de expectativas, presentación de avances mediante demos en lugar de jerga técnica.\n• Organización de tareas — descomponer un proyecto complejo en hitos, priorizar funcionalidad core sobre nice-to-haves, e iterar en base a feedback.\n• Gestión de alcance — aprender cuándo resistir pedidos de features y cuándo acomodarlos.\n\nEste proyecto me dio una base práctica en gestión de proyectos y desarrollo orientado al cliente mucho antes de encontrar esos conceptos en un aula." }
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
        title: "F1 Stats 2023",
        description: "Cross-platform mobile app built with React Native to browse the 2023 Formula 1 season — driver standings, team comparisons and race calendar, all fetched from a live API.",
        role: "Mobile Developer",
        content: [
          { type: "text", title: "Overview", text: "My first React Native project, developed to learn mobile development by building something I was passionate about. The app consumes the Ergast F1 API to display real-time standings, team profiles, and the full race calendar for the 2023 season." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home — Season overview" }, { src: "/f1-stats/drivers.png", caption: "Driver standings" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Team comparisons" }, { src: "/f1-stats/calendar.png", caption: "Race calendar" } ] },
          { type: "text", title: "Technical Highlights", text: "• Built with Expo for fast iteration and seamless testing on both iOS and Android.\n• Integrated the Ergast Developer API with custom hooks for data fetching, caching and error handling.\n• Implemented tab-based navigation with React Navigation and animated list transitions.\n• Responsive layouts adapting to varying screen sizes — designed mobile-first for optimal usability." },
          { type: "text", title: "What I learned", text: "First hands-on experience with React Native's component model, native navigation patterns, and the differences between mobile and web development paradigms. Solidified my understanding of state management and async data flows in a mobile context." }
        ]
      },
      es: {
        title: "F1 Stats 2023",
        description: "App móvil multiplataforma construida con React Native para explorar la temporada 2023 de Fórmula 1 — clasificaciones de pilotos, comparaciones entre equipos y calendario de carreras, todo desde una API en vivo.",
        role: "Desarrollador Mobile",
        content: [
          { type: "text", title: "Resumen", text: "Mi primer proyecto en React Native, desarrollado para aprender desarrollo mobile construyendo algo que me apasiona. La app consume la API Ergast de F1 para mostrar clasificaciones en tiempo real, perfiles de equipos y el calendario completo de la temporada 2023." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home — Resumen de temporada" }, { src: "/f1-stats/drivers.png", caption: "Clasificación de pilotos" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Comparación de equipos" }, { src: "/f1-stats/calendar.png", caption: "Calendario de carreras" } ] },
          { type: "text", title: "Destacados Técnicos", text: "• Construida con Expo para iteración rápida y testing fluido en iOS y Android.\n• Integración con la API de Ergast Developer usando hooks customizados para data fetching, caché y manejo de errores.\n• Navegación por tabs con React Navigation y transiciones animadas de listas.\n• Layouts responsivos adaptados a distintos tamaños de pantalla — diseñado mobile-first para usabilidad óptima." },
          { type: "text", title: "Qué aprendí", text: "Primera experiencia práctica con el modelo de componentes de React Native, patrones de navegación nativos y las diferencias entre paradigmas de desarrollo mobile y web. Consolidé mi entendimiento de gestión de estado y flujos de datos asíncronos en un contexto mobile." }
        ]
      }
    }
  },

  {
    slug: "donatelo",
    year: "2022",
    client: "Personal / Research",
    stack: ["React", "Node.js", "socket.io", "MongoDB", "ethereum", "Express"],
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


  // {
  //   slug: "yt-notes",
  //   year: "2022",
  //   client: "Personal",
  //   stack: ["JavaScript", "Chrome Extensions API", "HTML", "CSS"],
  //   links: { repo: "" },
  //   hero: { type: "image", src: "/YT-Notes/ytnoteslogo.png" },
  //   locales: {
  //     en: {
  //       title: "YT-Notes",
  //       description: "Chrome extension that lets you create timestamped annotations on any YouTube video — jump to any note instantly while watching. Built in a pre-AI era when extension development documentation was scarce.",
  //       role: "Solo Developer",
  //       content: [
  //         { type: "text", title: "Overview", text: "A browser extension designed to enhance the YouTube learning experience. Users can add notes at specific timestamps, and click any note to jump directly to that moment in the video — turning passive watching into active note-taking." },
  //         { type: "grid", items: [ { src: "/YT-Notes/ytnotes1.jpg", caption: "Extension panel with timestamped notes" }, { src: "/YT-Notes/ytnotes2.jpg", caption: "Note creation interface" } ] },
  //         { type: "text", title: "Technical Highlights", text: "• Built using the Chrome Extensions Manifest V2 API — content scripts inject a sidebar panel directly into YouTube's DOM.\n• Leveraged Chrome's Storage API for persistent note storage across sessions.\n• Custom timestamp parsing and video seek integration using YouTube's player API.\n• Published to the Chrome Web Store — navigated the complex review and approval process independently." },
  //         { type: "text", title: "Context & Challenges", text: "Developed in 2020, when Chrome extension documentation was extremely limited and there was zero AI assistance available. Figuring out content script injection, message passing between background/content/popup scripts, and the Chrome Web Store publishing pipeline was entirely self-taught through trial and error. The extension is currently outdated due to Manifest V3 migration changes, but remains a testament to problem-solving with minimal resources." }
  //       ]
  //     },
  //     es: {
  //       title: "YT-Notes",
  //       description: "Extensión de Chrome que permite crear anotaciones con marca de tiempo en cualquier video de YouTube — saltá a cualquier nota al instante mientras mirás. Construida en una era pre-IA cuando la documentación de extensiones era escasa.",
  //       role: "Desarrollador Solo",
  //       content: [
  //         { type: "text", title: "Resumen", text: "Una extensión de navegador diseñada para mejorar la experiencia de aprendizaje en YouTube. Los usuarios pueden agregar notas en timestamps específicos y hacer clic en cualquier nota para saltar directamente a ese momento del video — transformando la visualización pasiva en toma de notas activa." },
  //         { type: "grid", items: [ { src: "/YT-Notes/ytnotes1.jpg", caption: "Panel de extensión con notas timestamped" }, { src: "/YT-Notes/ytnotes2.jpg", caption: "Interfaz de creación de notas" } ] },
  //         { type: "text", title: "Destacados Técnicos", text: "• Construida usando la API de Chrome Extensions Manifest V2 — los content scripts inyectan un panel lateral directamente en el DOM de YouTube.\n• Uso de la Storage API de Chrome para almacenamiento persistente de notas entre sesiones.\n• Parsing de timestamps personalizado e integración con la API del reproductor de YouTube para seek.\n• Publicada en el Chrome Web Store — navegué el complejo proceso de revisión y aprobación de forma independiente." },
  //         { type: "text", title: "Contexto y Desafíos", text: "Desarrollada en 2020, cuando la documentación de extensiones de Chrome era extremadamente limitada y no había cero asistencia de IA disponible. Entender la inyección de content scripts, el message passing entre scripts background/content/popup, y el pipeline de publicación del Chrome Web Store fue completamente autodidacta por prueba y error. La extensión está actualmente desactualizada por los cambios de migración a Manifest V3, pero es un testimonio de resolución de problemas con recursos mínimos." }
  //       ]
  //     }
  //   }
  // }
]
