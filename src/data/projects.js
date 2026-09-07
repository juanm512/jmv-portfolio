export const projects = [

  {
    slug: "copon",
    tier: "featured",
    accentColor: "#00FF9C",
    year: "2026",
    client: "Freelance / Client Project",
    stack: ["Next.js", "tRPC", "Drizzle ORM", "Supabase", "TanStack Query", "Better-Auth", "Tailwind", "shadcn/ui"],
    links: { live: "https://copon.com.ar" },
    hero: { type: "image", src: "/copon/hero.webp" },
    locales: {
      en: {
        title: "Copon",
        tagline: "Private football prediction tournaments",
        description: "Platform to run private football prediction pools (prode) with automatic scoring and live standings. Online at copon.com.ar running its first tournaments.",
        role: "Full Stack Developer (client project)",
        context: "Freelance / Client project",
        content: [
          { type: "text", title: "Overview", text: "Copon is a web platform to run private football prediction tournaments among friends, coworkers or a community. Whoever organizes the pool creates a tournament, invites people with a link, and the app scores every matchday on its own. It is not a betting site: it is the tool that replaces the spreadsheet." },
          { type: "text", title: "The problem", text: "A client came to me with the pool of his group running on an Excel file and a WhatsApp thread. Somebody had to load every result by hand, recalculate the table, and settle arguments about who predicted what and when. Predictions arrived late, points came out wrong, and nobody could see the standings without asking for the file.\n\nWhat was needed was not a bigger spreadsheet: it was predictions that close on a deadline, scoring computed by the system, and a standings table anyone can open from their phone." },
          { type: "grid", items: [ { src: "/copon/hero.webp", caption: "Landing: organize your tournament, manage the pool" } ] },
          { type: "video", src: "/copon/join-tournament.mp4", poster: "/copon/join-tournament-poster.jpg", title: "Joining a tournament", caption: "Mobile flow: joining a tournament via invite link (2026 World Cup group stage)" },
          { type: "text", title: "Decisions", text: "• Scoring and standings as a pure module (@repo/core): it is the part that has to be right, so it lives with no framework around it, returns Result<T,E> instead of throwing, and is unit tested with Vitest before anything renders.\n• tRPC instead of a REST layer: one developer, one codebase, and every router typed from server to client, so a change in a payload breaks the build and not the pool.\n• Drizzle ORM over Supabase Postgres: the schema is TypeScript, migrations stay versioned in the repo, and the queries read next to the business logic.\n• T3-turbo monorepo split by responsibility (@repo/db, @repo/api, @repo/auth, @repo/core, @repo/ui, @repo/validators): the pure logic never imports Next.js, so it stays testable and portable.\n• Better-Auth with invite links: joining a tournament had to be one tap from WhatsApp, not a signup form plus a code.\n• Three configurable formats (round robin League, Groups plus Knockout, Knockout only) with custom or real teams, editable fixtures and configurable point systems: every group scores its pool differently, and the app had to absorb that instead of imposing one rulebook.\n• TanStack Query on the client: standings and matchdays change while people are watching the match, so the cache refetches instead of the user reloading." },
          { type: "grid", items: [ { src: "/copon/bracket.jpg", caption: "Groups plus Knockout format: bracket view" }, { src: "/copon/team-standings.jpg", caption: "League format: standings table" } ] },
          { type: "grid", items: [ { src: "/copon/matchday.jpg", caption: "Finished matchday: fixture and results" }, { src: "/copon/prode-standings.jpg", caption: "Pool standings: who is winning the pot" } ] },
          { type: "text", title: "Result", text: "Copon is online at copon.com.ar running the pools of the client's group, starting with the 2026 World Cup group stage. Nobody loads points by hand any more: results come in, the table updates, and the round based pot is settled by the same code that is covered by tests.\n\nWhat it confirmed for me is that keeping business logic pure pays off in the first week: every argument about scoring was closed by reading a test, not by reading the interface." }
        ]
      },
      es: {
        title: "Copon",
        tagline: "Torneos privados de prode",
        description: "Plataforma para armar torneos privados de prode con puntaje automático y tabla en vivo. Está online en copon.com.ar corriendo sus primeros torneos.",
        role: "Desarrollador Full Stack (proyecto para cliente)",
        context: "Freelance / Proyecto para cliente",
        content: [
          { type: "text", title: "Resumen", text: "Copon es una plataforma web para armar torneos privados de prode entre amigos, el laburo o una comunidad. El que organiza crea el torneo, invita con un link, y la app puntúa cada fecha sola. No es una plataforma de apuestas: es la herramienta que reemplaza la planilla." },
          { type: "text", title: "El problema", text: "Un cliente vino con el prode de su grupo corriendo en un Excel y un chat de WhatsApp. Alguien tenía que cargar cada resultado a mano, recalcular la tabla y arbitrar discusiones sobre quién había pronosticado qué y cuándo. Los pronósticos llegaban tarde, los puntos salían mal y nadie podía ver la tabla sin pedir el archivo.\n\nLo que hacía falta no era una planilla más grande: era pronósticos que cierran con una fecha límite, puntaje calculado por el sistema y una tabla que cualquiera abra desde el celular." },
          { type: "grid", items: [ { src: "/copon/hero.webp", caption: "Landing: organizá tu torneo, gestioná el prode" } ] },
          { type: "video", src: "/copon/join-tournament.mp4", poster: "/copon/join-tournament-poster.jpg", title: "Unirse a un torneo", caption: "Flujo mobile: unirse a un torneo por link de invitación (fase de grupos del Mundial 2026)" },
          { type: "text", title: "Decisiones", text: "• Puntaje y tabla como módulo puro (@repo/core): es la parte que tiene que estar bien, así que vive sin framework alrededor, devuelve Result<T,E> en vez de tirar excepciones y está testeada con Vitest antes de que se renderice nada.\n• tRPC en vez de una capa REST: un solo desarrollador, un solo codebase, y cada router tipado del servidor al cliente, así un cambio en un payload rompe el build y no el prode.\n• Drizzle ORM sobre Postgres de Supabase: el schema es TypeScript, las migraciones quedan versionadas en el repo y las queries se leen al lado de la lógica de negocio.\n• Monorepo T3-turbo separado por responsabilidad (@repo/db, @repo/api, @repo/auth, @repo/core, @repo/ui, @repo/validators): la lógica pura nunca importa Next.js, así se mantiene testeable y portable.\n• Better-Auth con links de invitación: entrar a un torneo tenía que ser un tap desde WhatsApp, no un formulario de registro más un código.\n• Tres formatos configurables (Liga todos contra todos, Grupos más Llaves, Solo Llaves) con equipos custom o reales, fixture editable y sistemas de puntos configurables: cada grupo puntúa su prode distinto y la app tenía que absorber eso en vez de imponer un reglamento.\n• TanStack Query en el cliente: la tabla y las fechas cambian mientras la gente mira el partido, así que la caché revalida en vez de que el usuario recargue." },
          { type: "grid", items: [ { src: "/copon/bracket.jpg", caption: "Formato Grupos más Llaves: vista de llave" }, { src: "/copon/team-standings.jpg", caption: "Formato Liga: tabla de posiciones" } ] },
          { type: "grid", items: [ { src: "/copon/matchday.jpg", caption: "Jornada finalizada: fixture y resultados" }, { src: "/copon/prode-standings.jpg", caption: "Tabla del prode: quién va ganando el pozo" } ] },
          { type: "text", title: "Resultado", text: "Copon está online en copon.com.ar corriendo los prodes del grupo del cliente, arrancando por la fase de grupos del Mundial 2026. Ya nadie carga puntos a mano: entran los resultados, la tabla se actualiza y el pozo por ronda lo resuelve el mismo código que está cubierto por tests.\n\nLo que me confirmó es que mantener la lógica de negocio pura se paga en la primera semana: cada discusión sobre el puntaje se cerró leyendo un test, no leyendo la interfaz." }
        ]
      }
    }
  },
  {
    slug: "tuerca",
    tier: "featured",
    accentColor: "#F97316",
    year: "2026",
    client: "Active / Production",
    stack: ["React Native", "Expo", "tRPC", "Drizzle ORM", "PostgreSQL", "Better-Auth", "Supabase"],
    links: { live: "https://tuerca.app", live2: "https://play.google.com/store/apps/details?id=app.tuerca.mobile" },
    hero: { type: "image", src: "/tuerca/dash.png" },
    locales: {
      en: {
        title: "TUERCA",
        tagline: "Field service management from the phone",
        description: "Field service management app for technical teams: jobs, routes, supplies and collections. Published on Google Play and in production.",
        role: "Sole Developer & Architect",
        context: "Active / Production",
        content: [
          { type: "text", title: "Overview", text: "TUERCA is a field service management platform for small and mid sized service companies: work orders, multi stop routes, supplies, field collections and team roles. It runs as a React Native app published on Google Play, with a multi tenant backend behind it." },
          { type: "text", title: "The problem", text: "TUERCA started as a web SaaS dashboard for service professionals. The workflows were right, the usage was not: the person who needs the data is the technician, and the technician is on a roof, in a basement or in a van, never at a desk. Whatever happened during the day ended up being typed in at night, from memory.\n\nSo the product had to move to where the work happens. That meant rebuilding it as a mobile app, not wrapping the web one." },
          { type: "grid", items: [ { src: "/tuerca/dash.png", caption: "Main dashboard: card based overview" }, { src: "/tuerca/jobs_list.png", caption: "Jobs list: filterable work orders" } ] },
          { type: "text", title: "Decisions", text: "• React Native with Expo: one codebase for iOS and Android, and over the air updates so a fix reaches technicians without waiting on a store review.\n• Kept tRPC through the migration: the types the web app already had were reused by the mobile client, so what got rewritten was the UI layer and not the API.\n• Drizzle ORM with PostgreSQL: typed schema and versioned migrations, which matters when the same database serves several organizations.\n• Multi tenant from the schema up, with Better-Auth handling sessions and an Owner / Admin / Member role system: in a service company, who sees billing and who only closes their own jobs is not a detail.\n• Route optimization instead of a map: the technician gets a list of stops and the app turns it into an ordered route, and each stop opens Google Maps with one tap for turn by turn navigation. Building the navigator was never the point, ordering the day was.\n• Native calendar sync: jobs are pushed to the device calendar, so the schedule shows up where the technician already looks.\n• NativeWind for the UI: the same utility vocabulary as the web version, dark mode first because the app is read outdoors and in badly lit places.\n• End to end tests with Maestro on an emulator: the critical flows (registration, creating a job, closing it) are exercised as real gestures, so an update cannot silently break what a team uses every morning." },
          { type: "grid", items: [ { src: "/tuerca/routes.png", caption: "Routes panel: multi stop planning" }, { src: "/tuerca/route_execution.png", caption: "Route in execution: field navigation" } ] },
          { type: "text", title: "Job lifecycle", text: "The full lifecycle of a job lives inside the app, from creation to collection:\n• Job creation with client assignment, priority and scheduling.\n• Activity timeline: technicians log updates from the field as the job moves.\n• Supplies tracking: materials used, quantities and cost per job.\n• Payment recording: field collections tracked per work order.\n\nEvery status change syncs across the team, so the office sees a job close at the same time the technician does." },
          { type: "grid", items: [ { src: "/tuerca/job_creation.png", caption: "Job creation: quick assignment flow" }, { src: "/tuerca/job.png", caption: "Job detail: full work order view" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_activities.png", caption: "Activity feed: real time field reporting" }, { src: "/tuerca/job_payment.png", caption: "Payment tracking: field collections" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_supplies.png", caption: "Supplies log: materials and cost tracking" }, { src: "/tuerca/clients.png", caption: "Client management: contact and history" } ] },
          { type: "grid", items: [ { src: "/tuerca/team.png", caption: "Team panel: member overview" }, { src: "/tuerca/team_edit.png", caption: "Role and permission editing" } ] },
          { type: "video", src: "/tuerca/tests/registro.mp4", poster: "/tuerca/tests/registro-poster.jpg", title: "E2E test: registration flow", caption: "Maestro automated test: user registration and onboarding (emulator)" },
          { type: "text", title: "Result", text: "TUERCA is in production and published on Google Play, used by technical teams to run their day from the phone: they get the route, execute the stops, log supplies and record what they collected, with no second pass at the office.\n\nThe migration proved the part I cared about: with an end to end typed API and pure data access, going from web to React Native was a UI rewrite and not a rebuild. And Maestro turned the mobile release process into something I can repeat without crossing my fingers." }
        ]
      },
      es: {
        title: "TUERCA",
        tagline: "Gestión de servicios de campo desde el celular",
        description: "App de gestión para equipos de servicio técnico: trabajos, rutas, insumos y cobros. Publicada en Google Play y en producción.",
        role: "Desarrollador Único & Arquitecto",
        context: "Activo / En producción",
        content: [
          { type: "text", title: "Resumen", text: "TUERCA es una plataforma de gestión de servicios de campo para empresas de servicios chicas y medianas: órdenes de trabajo, rutas de varias paradas, insumos, cobros en campo y roles de equipo. Corre como app React Native publicada en Google Play, con un backend multi-tenant atrás." },
          { type: "text", title: "El problema", text: "TUERCA arrancó como un dashboard SaaS web para profesionales de servicios. Los flujos estaban bien, el uso no: el que necesita los datos es el técnico, y el técnico está en un techo, en un sótano o en la camioneta, nunca frente a un escritorio. Lo que pasaba durante el día terminaba tipeándose de noche, de memoria.\n\nAsí que el producto tenía que mudarse a donde pasa el trabajo. Eso significaba rehacerlo como app móvil, no envolver la web." },
          { type: "grid", items: [ { src: "/tuerca/dash.png", caption: "Dashboard principal: resumen en tarjetas" }, { src: "/tuerca/jobs_list.png", caption: "Lista de trabajos: órdenes filtrables" } ] },
          { type: "text", title: "Decisiones", text: "• React Native con Expo: un solo codebase para iOS y Android, y actualizaciones over the air para que un fix llegue al técnico sin esperar la revisión de la store.\n• Mantuve tRPC en la migración: los tipos que ya tenía la web los reusó el cliente móvil, así que lo que se reescribió fue la capa de UI y no la API.\n• Drizzle ORM con PostgreSQL: schema tipado y migraciones versionadas, algo que importa cuando la misma base sirve a varias organizaciones.\n• Multi-tenant desde el schema, con Better-Auth manejando sesiones y un sistema de roles Propietario / Admin / Miembro: en una empresa de servicios, quién ve la facturación y quién solo cierra sus trabajos no es un detalle.\n• Optimización de rutas en vez de un mapa: el técnico recibe una lista de paradas y la app la convierte en una ruta ordenada, y cada parada abre Google Maps con un tap para la navegación giro a giro. Nunca la idea fue hacer el navegador, era ordenar el día.\n• Sincronización con el calendario nativo: los trabajos se empujan al calendario del dispositivo, así la agenda aparece donde el técnico ya mira.\n• NativeWind para la UI: el mismo vocabulario de utilidades que la versión web, con dark mode primero porque la app se lee al aire libre y en lugares mal iluminados.\n• Tests end to end con Maestro sobre un emulador: los flujos críticos (registro, crear un trabajo, cerrarlo) se ejercitan como gestos reales, así una actualización no puede romper en silencio lo que un equipo usa todas las mañanas." },
          { type: "grid", items: [ { src: "/tuerca/routes.png", caption: "Panel de rutas: planificación multi-parada" }, { src: "/tuerca/route_execution.png", caption: "Ruta en ejecución: navegación en campo" } ] },
          { type: "text", title: "Ciclo de vida del trabajo", text: "El ciclo completo de un trabajo vive dentro de la app, desde la creación hasta el cobro:\n• Creación con asignación de cliente, prioridad y programación.\n• Línea de tiempo de actividades: los técnicos registran novedades desde el campo mientras el trabajo avanza.\n• Seguimiento de insumos: materiales usados, cantidades y costo por trabajo.\n• Registro de pagos: cobros en campo asociados a cada orden.\n\nCada cambio de estado se sincroniza en el equipo, así la oficina ve cerrar un trabajo al mismo tiempo que el técnico." },
          { type: "grid", items: [ { src: "/tuerca/job_creation.png", caption: "Creación de trabajo: flujo de asignación rápida" }, { src: "/tuerca/job.png", caption: "Detalle del trabajo: vista completa de la orden" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_activities.png", caption: "Feed de actividades: reporte en tiempo real desde el campo" }, { src: "/tuerca/job_payment.png", caption: "Seguimiento de pagos: cobros en campo" } ] },
          { type: "grid", items: [ { src: "/tuerca/job_supplies.png", caption: "Registro de insumos: materiales y costos" }, { src: "/tuerca/clients.png", caption: "Gestión de clientes: contacto e historial" } ] },
          { type: "grid", items: [ { src: "/tuerca/team.png", caption: "Panel de equipo: vista general de miembros" }, { src: "/tuerca/team_edit.png", caption: "Edición de roles y permisos" } ] },
          { type: "video", src: "/tuerca/tests/registro.mp4", poster: "/tuerca/tests/registro-poster.jpg", title: "Test E2E: flujo de registro", caption: "Test automatizado con Maestro: registro de usuario y onboarding (emulador)" },
          { type: "text", title: "Resultado", text: "TUERCA está en producción y publicada en Google Play, usada por equipos técnicos para resolver el día desde el celular: reciben la ruta, ejecutan las paradas, cargan insumos y registran lo que cobraron, sin una segunda pasada en la oficina.\n\nLa migración me confirmó lo que me importaba: con una API tipada de punta a punta y acceso a datos puro, pasar de web a React Native fue reescribir la UI y no rehacer el producto. Y Maestro convirtió el proceso de release móvil en algo que puedo repetir sin cruzar los dedos." }
        ]
      }
    }
  },
  {
    slug: "multitenant-saas-base",
    tier: "featured",
    accentColor: "#38BDF8",
    year: "2026",
    client: "Open source",
    stack: ["TypeScript", "Next.js", "tRPC", "Drizzle ORM", "PostgreSQL", "better-auth", "Turborepo", "Vitest"],
    links: { repo: "https://github.com/juanm512/multitenant-saas-base" },
    hero: { type: "image", src: "/multitenant-saas-base/hero.png" },
    locales: {
      en: {
        title: "multitenant-saas-base",
        tagline: "Multi-tenant base with isolation enforced by Postgres",
        description: "TypeScript base for multi-tenant SaaS: orgs and branches, roles, billing, capabilities and files, with tenant isolation enforced by Postgres RLS and eight structural guards.",
        role: "Author",
        context: "Open source / base for verticals",
        content: [
          { type: "text", title: "Overview", text: "multitenant-saas-base is a TypeScript base for building multi-tenant SaaS: identity and sessions, organizations and branches, roles and permissions editable per organization, billing, capabilities, feature flags, files, auditing and notifications, all with their enforcement already in place. In the model, organization is the client and team is the branch, and every tenant lives in a single pooled deploy.\n\nIt is not a finished product. It is the floor a vertical gets mounted on: the code is split into platform/, what exists in any multi-tenant SaaS, and modules/<name>, what gets taken out and added one at a time. Four factory modules ship with it, customers, opening-hours, payments and whatsapp, as the worked example of how the fifth one is added." },
          { type: "text", title: "The problem", text: "A generic boilerplate hands you screens and leaves the hard parts to good intentions. In a multi-tenant SaaS the three that break are always the same.\n\nIsolation done with a where clause is one forgotten filter away from leaking one client's data to another, and nothing fails while you write it. Structure erodes: the split between what is shared base and what belongs to a single vertical is real on day one and gone by month six, because nothing stops an import. And tests can pass without proving anything: an isolation test run as a superuser is green because policies are never evaluated, not because isolation works.\n\nSo what I wanted from this base was not more features. It was that those three failures be impossible to commit without something turning red." },
          { type: "text", title: "Decisions", text: "• Postgres RLS as the backstop instead of trusting the query layer: the primary enforcement is scoped query and mutation functions that receive orgId and teamId from the tRPC context, the single tenant injection point, and RLS catches whatever gets past it.\n• withTenantScope opens a transaction and sets the tenant through a transaction-local GUC with set_config: the COMMIT resets it on its own, so no state leaks between requests sharing a pooled connection, and policies read that GUC.\n• Declarative policies with pgPolicy and enableRLS on the Drizzle table, so they enter drizzle-kit generate: writing policy SQL by hand is forbidden, because a policy that lives outside the schema is one nobody diffs.\n• A FORCE ROW LEVEL SECURITY migration, verified against the catalog of a real Postgres: enabling RLS is not enough, since the table owner bypasses its own policies.\n• Tests run as a NOBYPASSRLS role, with the superuser left only for migrating: with a superuser every isolation test passes vacuously, green without having tested anything. The driver is non-edge postgres.js on purpose, because RLS needs session affinity and a pooled driver in statement mode breaks SET LOCAL.\n• platform/ never imports from modules/, and no module imports another: when the platform has to trigger something from a module it declares an injectable port, and whoever composes provides it. dependency-cruiser enforces the direction where it is a contract, in the packages.\n• Eight structural guards inside pnpm check:ci: dependency-cruiser boundaries plus guards for the boundaries config itself, the test pyramid, readmes, file size, comment ratio, misplaced directives and duplication.\n• The size and comment guards fail against frozen baselines instead of an ideal: what was already big is grandfathered but can only shrink, a dead entry also fails, and nobody joins the list without it showing in the diff. The debt cannot grow.\n• Meta-tests over properties of the code, not over behavior: 13 meta-tests and 12 convention tests cover the class of error that breaks nothing when written. authz-meta names any procedure without a declared permission, rls-meta any business table without org_id, RLS and a policy, schema-migration-drift-meta the schema that drifted from its last snapshot.\n• tRPC v11 as the only transport, no Server Actions: one surface to authorize, one place to inject the tenant, and typed clients for free.\n• 24 ADRs in docs/adr, each one written because someone was going to undo the decision without knowing its cost." },
          { type: "text", title: "Stack", text: "Turborepo with pnpm workspaces on Node 22, Next.js 16 with React 19 and Tailwind 4 on the web, tRPC v11 as the only transport, Drizzle ORM over Postgres 16 with declarative RLS, and better-auth with its organization plugin for identity.\n\nBilling runs on two levels: Polar charges the organizations their subscription, MercadoPago is the checkout the tenant offers its own end customers. Files go to R2, WhatsApp through Kapso, email through Resend, and in-product onboarding uses driver.js tours with per user state.\n\nQuality is Biome, dependency-cruiser, jscpd, sherif, lefthook, Vitest, Playwright and deepsec, all wired into the same command CI runs." },
          { type: "text", title: "Result", text: "A vertical that starts here gets the whole tenancy layer resolved and, more importantly, guarded: auth and sessions, orgs and branches, editable roles and permissions, subscriptions, capabilities, flags, files, jobs, auditing and notifications, with isolation that a forgotten filter cannot break.\n\nThe four factory modules are the recipe for the fifth. Adding one means creating modules/<name> in the packages that need it, declaring a port if the platform has to trigger something, and letting the guards say whether it fits. What used to be a code review conversation is now a red check.\n\nWhat is left is honest and written down: the UI copy is hardcoded in Spanish with no i18n, the job runner has a single execution adapter, and a public per tenant site is what would give @acme/domains the consumer it does not have yet." }
        ]
      },
      es: {
        title: "multitenant-saas-base",
        tagline: "Base multi-tenant con aislamiento garantizado por Postgres",
        description: "Base en TypeScript para SaaS multi-tenant: orgs y sucursales, roles, billing, capabilities y archivos, con el aislamiento garantizado por RLS de Postgres y ocho guards estructurales.",
        role: "Autor",
        context: "Open source / base para verticales",
        content: [
          { type: "text", title: "Resumen", text: "multitenant-saas-base es una base en TypeScript para armar SaaS multi-tenant: identidad y sesiones, organizaciones y sucursales, roles y permisos editables por organización, billing, capabilities, feature flags, archivos, auditoría y notificaciones, todo con su enforcement ya puesto. En el modelo, organization es el cliente y team es la sucursal, y todos los tenants viven en un solo deploy pooled.\n\nNo es un producto terminado. Es el piso sobre el que se monta un vertical: el código está partido en platform/, lo que existe en cualquier SaaS multi-tenant, y modules/<nombre>, lo que se saca y se agrega de a uno. Vienen cuatro módulos de fábrica, customers, opening-hours, payments y whatsapp, como el ejemplo trabajado de cómo se agrega el quinto." },
          { type: "text", title: "El problema", text: "Un boilerplate genérico te da pantallas y deja lo difícil librado a la buena voluntad. En un SaaS multi-tenant, las tres cosas que se rompen son siempre las mismas.\n\nUn aislamiento hecho con un where está a un filtro olvidado de mostrarle a un cliente los datos de otro, y nada falla mientras lo escribís. La estructura se erosiona: la separación entre lo que es base compartida y lo que es de un vertical es real el primer día y ya no existe al sexto mes, porque nada frena un import. Y los tests pueden pasar sin probar nada: un test de aislamiento corriendo como superusuario da verde porque las policies nunca se evalúan, no porque el aislamiento funcione.\n\nAsí que lo que quería de esta base no eran más features. Era que esas tres fallas fueran imposibles de commitear sin que algo se ponga rojo." },
          { type: "text", title: "Decisiones", text: "• RLS de Postgres como backstop en vez de confiar en la capa de queries: el enforcement primario son funciones de query y mutation scopeadas que reciben orgId y teamId del contexto de tRPC, el único punto de inyección de tenant, y RLS agarra lo que se le escape.\n• withTenantScope abre una transacción y fija el tenant en un GUC transaction-local con set_config: el COMMIT lo resetea solo, así no filtra estado entre requests que comparten una conexión del pool, y las policies leen ese GUC.\n• Policies declarativas con pgPolicy y enableRLS en la tabla de Drizzle, para que entren en drizzle-kit generate: escribir SQL de policy a mano está prohibido, porque una policy que vive fuera del schema es una que nadie diffea.\n• Una migración con FORCE ROW LEVEL SECURITY, verificada contra el catálogo de un Postgres real: habilitar RLS no alcanza, porque el dueño de la tabla bypassea sus propias policies.\n• Los tests corren con un rol NOBYPASSRLS y el superusuario queda solo para migrar: con superusuario todo test de aislamiento pasa por vacuidad, verde sin haber probado nada. El driver es postgres.js no-edge a propósito, porque RLS necesita afinidad de sesión y un driver pooled en modo statement rompe el SET LOCAL.\n• platform/ no importa nunca de modules/, y ningún módulo importa de otro: cuando la plataforma tiene que disparar algo de un módulo declara un puerto inyectable y lo provee quien compone. dependency-cruiser enforza la dirección donde es un contrato, en los packages.\n• Ocho chequeos estructurales adentro de pnpm check:ci: los boundaries de dependency-cruiser más guards para la propia config de boundaries, la pirámide de tests, los readmes, el tamaño de archivo, la proporción de comentarios, las directivas mal ubicadas y la duplicación.\n• Los guards de tamaño y comentarios fallan contra baselines congelados en vez de contra un ideal: lo que ya estaba grande queda grandfathered pero solo puede achicar, una entrada muerta también falla, y nadie se suma a la lista sin que se vea en el diff. La deuda no puede crecer.\n• Meta-tests sobre propiedades del código y no sobre conducta: 13 meta-tests y 12 tests de convención cubren la clase de error que no rompe nada al escribirse. authz-meta nombra el procedure sin permiso declarado, rls-meta la tabla de negocio sin org_id, RLS y policy, y schema-migration-drift-meta el schema que quedó desalineado de su última snapshot.\n• tRPC v11 como único transporte, sin Server Actions: una sola superficie que autorizar, un solo lugar donde inyectar el tenant, y clientes tipados de arriba.\n• 24 ADRs en docs/adr, cada una escrita porque alguien iba a deshacer la decisión sin saber lo que costaba." },
          { type: "text", title: "Stack", text: "Turborepo con workspaces de pnpm sobre Node 22, Next.js 16 con React 19 y Tailwind 4 en la web, tRPC v11 como único transporte, Drizzle ORM sobre Postgres 16 con RLS declarativo, y better-auth con su plugin organization para la identidad.\n\nEl cobro tiene dos niveles: Polar cobra a las organizaciones su suscripción, MercadoPago es el checkout que el tenant le ofrece a sus clientes finales. Los archivos van a R2, WhatsApp pasa por Kapso, el mail por Resend, y el onboarding en producto son tours con driver.js con estado por usuario.\n\nLa calidad la sostienen Biome, dependency-cruiser, jscpd, sherif, lefthook, Vitest, Playwright y deepsec, todos colgados del mismo comando que corre CI." },
          { type: "text", title: "Resultado", text: "Un vertical que arranca acá se encuentra toda la capa de tenancy resuelta y, lo que más importa, candada: auth y sesiones, orgs y sucursales, roles y permisos editables, suscripciones, capabilities, flags, archivos, jobs, auditoría y notificaciones, con un aislamiento que no se rompe por un filtro olvidado.\n\nLos cuatro módulos de fábrica son la receta del quinto. Agregar uno es crear modules/<nombre> en los packages que lo necesiten, declarar un puerto si la plataforma tiene que disparar algo, y dejar que los guards digan si encaja. Lo que antes era una charla en el code review ahora es un check en rojo.\n\nLo que falta está escrito y es honesto: el copy de la UI está hardcodeado en español y no hay i18n, el runner de jobs tiene un solo adapter de ejecución, y un sitio público por tenant es lo que le daría a @acme/domains el consumidor que hoy no tiene." }
        ]
      }
    }
  },
  {
    slug: "mudarg",
    tier: "secondary",
    accentColor: "#3B82F6",
    year: "2026",
    client: "Personal Project",
    stack: ["Flask", "Python", "JavaScript"],
    links: { repo: "https://github.com/juanm512/relocate-app", live: "https://mudarg.vercel.app/" },
    hero: { type: "image", src: "/relocate-app/inicial.webp" },
    locales: {
      en: {
        title: "Mudarg",
        tagline: "Commute Map",
        description: "Map tool that shows where you can reasonably live given your workplace and commute mode, drawing the isochrones from real GTFS transit data.",
        role: "Full Stack Developer",
        context: "Personal project",
        content: [
          { type: "text", title: "Overview", text: "Interactive map built with Leaflet and Turf.js to visualize reachable areas from a specific point using walking, cycling, driving and public transport modes." },
          { type: "grid", items: [ { src: "/relocate-app/inicial.webp", caption: "Initial search" }, { src: "/relocate-app/resultado_colectivos.webp", caption: "Public transport engine" }, { src: "/relocate-app/resultado_subtes.webp", caption: "Subway routing" } ] },
          { type: "text", title: "Highlights", text: "Custom algorithm that parses real public transit GTFS data to generate precise isochrones. The Flask backend handles geocoding via Nominatim and routing via OpenRouteService." },
          { type: "text", title: "Feature overview", text: "Two stage flow for the interaction, time sliders, exact route breakdown checkboxes, and custom point of interest layers like hospitals and safety alerts." }
        ]
      },
      es: {
        title: "Mudarg",
        tagline: "Mapa de Alcance CABA",
        description: "Herramienta de mapas que muestra hasta dónde se puede vivir razonablemente según el trabajo y el transporte, con isócronas calculadas sobre datos GTFS reales.",
        role: "Desarrollador Full Stack",
        context: "Proyecto personal",
        content: [
          { type: "text", title: "Resumen", text: "Aplicación interactiva de mapas (Leaflet y Turf.js) para visualizar hasta qué barrios se puede llegar en cierta cantidad de minutos caminando, en bicicleta, en auto o en transporte público." },
          { type: "grid", items: [ { src: "/relocate-app/inicial.webp", caption: "Búsqueda de partida" }, { src: "/relocate-app/resultado_colectivos.webp", caption: "Alcance en colectivos" }, { src: "/relocate-app/resultado_subtes.webp", caption: "Alcance en subte" } ] },
          { type: "text", title: "Logros destacados", text: "Algoritmo propio para calcular isócronas de transporte público usando datos reales de horarios (GTFS), con backend en Python (Flask) y geocodificación de Nominatim." },
          { type: "text", title: "Detalles", text: "Flujo de dos pantallas, controles deslizantes para el tiempo de viaje, desglose dinámico de líneas de transporte y filtros de zonas de interés." }
        ]
      }
    }
  },

  {
    slug: "typemachine",
    tier: "secondary",
    accentColor: "#7DD3FC",
    year: "2026",
    client: "Personal Project",
    stack: ["React", "TypeScript", "Vite", "Dexie", "Vitest", "Playwright", "PWA"],
    links: { live: "https://typemachine.me", repo: "https://github.com/juanm512/typemachine" },
    hero: { type: "image", src: "/typemachine/editor.png" },
    locales: {
      en: {
        title: "TypeMachine",
        tagline: "Typing trainer for programmers",
        description: "Offline typing trainer for programmers: you type real code snippets under real code rules, and it shows which keys and bigrams slow you down.",
        role: "Sole Developer",
        context: "Personal project",
        content: [
          { type: "text", title: "Overview", text: "TypeMachine is a typing trainer for programmers. It is a single page app that works offline as a PWA, and its main view looks like a code editor: you type snippets from a catalogue of 40 across several languages, and the app keeps your history locally to show where you actually lose time." },
          { type: "text", title: "The problem", text: "Typing trainers measure prose. Code is not prose: it is indentation, brackets, punctuation and closers, and the characters that slow a programmer down are the ones a prose test almost never asks for.\n\nOn top of that, comparing character by character punishes things that are not mistakes. Pressing Tab, using two spaces where the snippet had four, or leaving a closing bracket hanging on its own line are all legitimate ways of writing the same code, and a strict trainer marks them wrong and ruins the run." },
          { type: "text", title: "Decisions", text: "• The typing engine is a pure module, written and tested before any UI: comparison happens over tokens instead of raw characters, through a registry of rules, so what counts as correct is data and not an if buried in a component.\n• Real code rules in that registry: Tab indents, spacing and punctuation are flexible, closers can hang on their own line. The trainer adapts to how code is written instead of demanding a transcription.\n• Ghost text realigned as you type, plus an IDE style mirror pane with its own highlighting: you see what you are writing the way you would see it in your editor, not as a plain paragraph.\n• Local history in Dexie over IndexedDB, with export and import: the data belongs to whoever typed it, the app keeps working with no network, and nothing needs an account. Session replay is compressed and opt in.\n• Ranking per key and per bigram: a global words per minute number does not tell you what to practice, a ranking of your weak keys and pairs does.\n• Configuration in a modal whose switches run the real engine on their examples: instead of explaining what a rule does, the setting shows it working.\n• CSS in variables split across files, no Tailwind: the app has a Windows 7 style window frame, a taskbar with programs as its shell, a menu on the logo, four view modes and a resizable divider, and that kind of chrome comes out cleaner as plain CSS with tokens.\n• Built in phases 0 to 7 over about two weeks, with parallel AI subagents working on disjoint file sets: splitting the work by files that do not touch each other is what makes running several agents at once safe.\n• A continuous single words mode next to the snippets, for practicing raw speed without the structure of a code block." },
          { type: "text", title: "Result", text: "TypeMachine is online at typemachine.me, installable, and fully usable with no connection. It ships with 1161 unit tests and 58 end to end tests, including one that verifies the app still works offline as a PWA.\n\nWhat it proved is the value of writing the engine first: with the comparison logic pure and covered, every later feature (modes, ranking, replay, settings) was a consumer of that module, and the window shell on top could change freely without touching a single typing rule." }
        ]
      },
      es: {
        title: "TypeMachine",
        tagline: "Entrenador de tipeo para programadores",
        description: "Entrenador de tipeo offline para programadores: se tipean snippets de código con reglas de código reales y muestra qué teclas y bigramas te frenan.",
        role: "Desarrollador Único",
        context: "Proyecto personal",
        content: [
          { type: "text", title: "Resumen", text: "TypeMachine es un entrenador de tipeo para programadores. Es una single page app que funciona offline como PWA, y su vista principal parece un editor de código: se tipean snippets de un catálogo de 40 en varios lenguajes, y la app guarda el historial local para mostrar dónde se pierde tiempo de verdad." },
          { type: "text", title: "El problema", text: "Los entrenadores de tipeo miden prosa. El código no es prosa: es indentación, corchetes, puntuación y cierres, y los caracteres que frenan a un programador son justamente los que un test de prosa casi nunca pide.\n\nEncima, comparar carácter por carácter castiga cosas que no son errores. Apretar Tab, usar dos espacios donde el snippet tenía cuatro o dejar un cierre colgando en su propia línea son formas legítimas de escribir el mismo código, y un entrenador estricto las marca mal y te arruina la corrida." },
          { type: "text", title: "Decisiones", text: "• El motor de tipeo es un módulo puro, escrito y testeado antes que cualquier UI: la comparación es por tokens y no por caracteres crudos, a través de un registro de reglas, así lo que cuenta como correcto es data y no un if enterrado en un componente.\n• Reglas de código reales en ese registro: Tab indenta, el espaciado y la puntuación son flexibles, los cierres pueden colgar en su propia línea. El entrenador se adapta a cómo se escribe código en vez de exigir una transcripción.\n• Ghost text realineado mientras tipeás, más un panel espejo estilo IDE con su propio resaltado: ves lo que escribís como lo verías en tu editor, no como un párrafo plano.\n• Historial local en Dexie sobre IndexedDB, con exportar e importar: los datos son de quien tipeó, la app sigue andando sin red y nada requiere una cuenta. El replay de sesiones es comprimido y opcional.\n• Ranking por tecla y por bigrama: un número global de palabras por minuto no te dice qué practicar, un ranking de tus teclas y pares flojos sí.\n• Configuración en un modal cuyos switches corren el motor real sobre sus ejemplos: en vez de explicar qué hace una regla, el ajuste la muestra funcionando.\n• CSS en variables partido en archivos, sin Tailwind: la app tiene un marco de ventana estilo Windows 7, una barra de tareas con programas como shell, un menú en el logo, cuatro modos de vista y un divisor redimensionable, y ese tipo de chrome sale más limpio en CSS plano con tokens.\n• Construida en fases 0 a 7 en unas dos semanas, con subagentes de IA en paralelo trabajando sobre conjuntos de archivos disjuntos: dividir el laburo por archivos que no se tocan es lo que hace seguro correr varios agentes a la vez.\n• Un modo continuo de palabras sueltas al lado de los snippets, para practicar velocidad pura sin la estructura de un bloque de código." },
          { type: "text", title: "Resultado", text: "TypeMachine está online en typemachine.me, se puede instalar y se usa entera sin conexión. Tiene 1161 tests unitarios y 58 tests end to end, incluido uno que verifica que la app siga funcionando offline como PWA.\n\nLo que demostró es el valor de escribir el motor primero: con la lógica de comparación pura y cubierta, cada feature posterior (modos, ranking, replay, ajustes) fue un consumidor de ese módulo, y el shell de ventana de arriba pudo cambiar libremente sin tocar una sola regla de tipeo." }
        ]
      }
    }
  },
  {
    slug: "single-resto",
    tier: "featured",
    accentColor: "#F5A623",
    year: "2025",
    client: "Personal / Client",
    stack: ["Next.js", "TailwindCSS", "React", "Docker", "monorepo", "PostgreSQL", "Drizzle ORM", "mercadopago"],
    links: { live: "https://basic-single-restorant-template-web-mu.vercel.app/", live2: "https://basic-single-restorant-template-web.vercel.app/"},
    hero: { type: "image", src: "/single_resto/portada.webp" },
    locales: {
      en: {
        title: "Single Resto",
        tagline: "Ordering site and dashboard for a restaurant",
        description: "Restaurant platform with a public ordering site and an admin dashboard, self hosted with Docker on a VPS and taking real orders through MercadoPago.",
        role: "Lead Developer",
        context: "Personal / Client",
        content: [
          { type: "text", title: "Overview", text: "Single Resto is a restaurant system in two parts: a public ordering site for diners and an admin dashboard for whoever runs the place. It started as a client job and ended as a white label template that serves several brands from one codebase, deployed on a VPS I administer myself." },
          { type: "text", title: "The problem", text: "The client took orders over WhatsApp and wrote them down by hand. Two things broke constantly: orders arriving after closing time, and orders lost between the message and the kitchen. There was no catalogue anywhere either, so prices lived in a photo of a printed menu.\n\nAnd once the first restaurant worked, the next one asked for the same thing with its own brand. Rewriting the project per client was not an option." },
          { type: "grid", items: [ { src: "/single_resto/portada.webp", caption: "Public restaurant website" } ] },
          { type: "text", title: "Decisions", text: "• Server Sent Events instead of WebSockets for the order panel: the flow is one directional, the server pushes new orders to the dashboard, and SSE gives that with a fraction of the moving parts and reconnection handled by the browser.\n• Opening hours enforced on checkout, not just displayed: the site blocks the order outside business hours and says why, because the real cost was the order that arrives with the kitchen closed.\n• MercadoPago as the gateway: it is what customers in Argentina already have, and its confirmation closes the order automatically instead of requiring a manual check.\n• Drizzle ORM with PostgreSQL and a monorepo shared by the site and the dashboard: products, categories and store settings are one schema and one set of types, so the public menu can never drift from what the dashboard edited.\n• White label from the start: themes, logos, catalogues and settings per tenant over the same codebase, each with its own URL. A new client is a configuration, not a fork.\n• Self hosted on an Oracle Cloud VPS with Docker Compose: app container, PostgreSQL container, a self hosted WhatsApp API container and Nginx as reverse proxy for SSL and routing. Stabilizing the WhatsApp service was the hardest part, and it is what lets the dashboard notify customers on its own.\n• Cloudflare R2 for product images: object storage behind a CDN instead of files on the VPS disk, so images survive redeploys and load fast.\n• A maintenance flag in the settings: the owner can take the site offline instantly without calling me.\n• Structured logging with Wide Events (canonical log lines) instead of scattered console.log: one event per action with full context, which is what later makes it possible to ask for the error rate per action." },
          { type: "video", src: "/single_resto/video_demostracion_horarios_y_website_pedido.mp4", poster: "/single_resto/video_demostracion_horarios_y_website_pedido-poster.jpg", title: "Full ordering flow", caption: "End to end demo: browsing products, adding to cart, checkout with opening hours enforcement and order placement" },
          { type: "video", src: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario.mp4", poster: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario-poster.jpg", title: "Checkout and alerts", caption: "Unsaved changes alerts, edit options and checkout blocked outside business hours" },
          { type: "text", title: "Admin dashboard", text: "The dashboard gives the owner control over the whole operation:\n• Order panel: incoming orders appear in near real time via SSE and move through accepted, in preparation and completed, with ticket printing support.\n• Product CRUD: create, edit and delete products with image uploads to R2, category assignment, pricing and visibility toggles.\n• Store configuration: opening hours, delivery zones, address and maintenance mode.\n• WhatsApp actions: quick buttons that open pre formatted messages to the customer with order updates." },
          { type: "video", src: "/single_resto/caja_y_manejo_de_pedidos.mp4", poster: "/single_resto/caja_y_manejo_de_pedidos-poster.jpg", title: "Order management", caption: "Order panel: receiving, managing and processing incoming orders" },
          { type: "video", src: "/single_resto/creacion_productos_acciones_tabla.mp4", poster: "/single_resto/creacion_productos_acciones_tabla-poster.jpg", title: "Product management", caption: "Creating products, table actions and category management" },
          { type: "video", src: "/single_resto/subida_imagenes.mp4", poster: "/single_resto/subida_imagenes-poster.jpg", title: "Image uploads", caption: "Product image upload flow with R2 storage" },
          { type: "video", src: "/single_resto/cambio_dir_tienda.mp4", poster: "/single_resto/cambio_dir_tienda-poster.jpg", title: "Store settings", caption: "Updating store address and delivery configuration" },
          { type: "video", src: "/single_resto/video_demostracion_white_label.mp4", poster: "/single_resto/video_demostracion_white_label-poster.jpg", title: "White label demo", caption: "Same codebase, different brand: switching between restaurant themes" },
          { type: "video", src: "/single_resto/video_demostracion_flag_mantenimiento.mp4", poster: "/single_resto/video_demostracion_flag_mantenimiento-poster.jpg", title: "Maintenance mode", caption: "Toggling maintenance mode to take the site offline instantly" },
          { type: "grid", items: [ { src: "/single_resto/image.png", caption: "Wide Events in action: structured terminal output" } ] },
          { type: "code", title: "Example: structured Wide Event", text: `{
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
          { type: "text", title: "What the logging bought", text: "• One event per action with full context (user, duration, outcome).\n• Automatic detection of errors and results using byethrow.\n• Analytical queries: error rate by action, average response time by tenant.\n• Full traceability with a unique request_id per request.\n• Much less log noise than scattered console.log." },
          { type: "text", title: "Result", text: "The platform runs in production on the VPS, taking paid orders, printing tickets and notifying customers over WhatsApp, with the same codebase serving more than one brand.\n\nThis was the project that pushed me furthest from typical frontend work: multi container Docker, networking between containers, SSL, uptime, a payment gateway and production storage. It is also where I first applied, on a live system with real customers, the planning and organization I had only studied in software engineering courses." }
        ]
      },
      es: {
        title: "Single Resto",
        tagline: "Web de pedidos y dashboard para un restaurante",
        description: "Plataforma para restaurantes con web de pedidos y dashboard admin, self-hosted con Docker en un VPS y tomando pedidos reales con MercadoPago.",
        role: "Desarrollador Principal",
        context: "Personal / Cliente",
        content: [
          { type: "text", title: "Resumen", text: "Single Resto es un sistema para restaurantes en dos partes: una web pública de pedidos para los comensales y un dashboard de administración para el que maneja el local. Empezó como un trabajo para un cliente y terminó siendo un template white-label que sirve varias marcas desde un solo codebase, desplegado en un VPS que administro yo." },
          { type: "text", title: "El problema", text: "El cliente tomaba pedidos por WhatsApp y los anotaba a mano. Dos cosas se rompían todo el tiempo: pedidos que entraban con el local cerrado y pedidos que se perdían entre el mensaje y la cocina. Tampoco había catálogo en ningún lado, así que los precios vivían en una foto de una carta impresa.\n\nY cuando el primer restaurante funcionó, el siguiente pidió lo mismo con su marca. Reescribir el proyecto por cliente no era opción." },
          { type: "grid", items: [ { src: "/single_resto/portada.webp", caption: "Web pública del restaurante" } ] },
          { type: "text", title: "Decisiones", text: "• Server Sent Events en vez de WebSockets para el panel de pedidos: el flujo es unidireccional, el servidor empuja los pedidos nuevos al dashboard, y SSE da eso con una fracción de las piezas móviles y la reconexión resuelta por el navegador.\n• Horarios aplicados en el checkout, no solo mostrados: la web bloquea el pedido fuera de horario y explica por qué, porque el costo real era el pedido que entra con la cocina cerrada.\n• MercadoPago como pasarela: es lo que el cliente final ya tiene en Argentina, y su confirmación cierra el pedido automáticamente en vez de exigir una revisión manual.\n• Drizzle ORM con PostgreSQL y un monorepo compartido entre la web y el dashboard: productos, categorías y configuración del local son un solo schema y un solo juego de tipos, así la carta pública nunca se desfasa de lo que editó el dashboard.\n• White-label desde el principio: temas, logos, catálogos y configuración por tenant sobre el mismo codebase, cada uno con su URL. Un cliente nuevo es una configuración, no un fork.\n• Self-hosted en un VPS de Oracle Cloud con Docker Compose: container de la app, container de PostgreSQL, un container con una API de WhatsApp self-hosted y Nginx como reverse proxy para SSL y routing. Estabilizar el servicio de WhatsApp fue lo más difícil, y es lo que permite que el dashboard avise al cliente por su cuenta.\n• Cloudflare R2 para las imágenes de productos: object storage detrás de una CDN en vez de archivos en el disco del VPS, así las imágenes sobreviven a los redeploys y cargan rápido.\n• Un flag de mantenimiento en la configuración: el dueño puede sacar la web de servicio al instante sin llamarme.\n• Logging estructurado con Wide Events (canonical log lines) en vez de console.log dispersos: un evento por acción con todo el contexto, que es lo que después permite preguntar la tasa de error por acción." },
          { type: "video", src: "/single_resto/video_demostracion_horarios_y_website_pedido.mp4", poster: "/single_resto/video_demostracion_horarios_y_website_pedido-poster.jpg", title: "Flujo completo de pedido", caption: "Demo completa: explorar productos, agregar al carrito, checkout con control de horarios y colocación del pedido" },
          { type: "video", src: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario.mp4", poster: "/single_resto/alerta_perdida_edicion_opciones_checkout_bloqueado_horario-poster.jpg", title: "Checkout y alertas", caption: "Alertas de cambios no guardados, opciones de edición y checkout bloqueado fuera de horario" },
          { type: "text", title: "Dashboard de administración", text: "El dashboard le da al dueño control sobre toda la operación:\n• Panel de pedidos: los pedidos entrantes aparecen casi en tiempo real vía SSE y pasan por aceptado, en preparación y completado, con soporte de impresión de tickets.\n• CRUD de productos: crear, editar y eliminar productos con subida de imágenes a R2, categorías, precios y toggles de visibilidad.\n• Configuración del local: horarios, zonas de delivery, dirección y modo mantenimiento.\n• Acciones de WhatsApp: botones rápidos que abren mensajes pre-formateados al cliente con novedades del pedido." },
          { type: "video", src: "/single_resto/caja_y_manejo_de_pedidos.mp4", poster: "/single_resto/caja_y_manejo_de_pedidos-poster.jpg", title: "Gestión de pedidos", caption: "Panel de pedidos: recibir, gestionar y procesar pedidos entrantes" },
          { type: "video", src: "/single_resto/creacion_productos_acciones_tabla.mp4", poster: "/single_resto/creacion_productos_acciones_tabla-poster.jpg", title: "Gestión de productos", caption: "Creación de productos, acciones de tabla y gestión de categorías" },
          { type: "video", src: "/single_resto/subida_imagenes.mp4", poster: "/single_resto/subida_imagenes-poster.jpg", title: "Subida de imágenes", caption: "Flujo de subida de imágenes con almacenamiento en R2" },
          { type: "video", src: "/single_resto/cambio_dir_tienda.mp4", poster: "/single_resto/cambio_dir_tienda-poster.jpg", title: "Configuración del local", caption: "Actualización de dirección del local y configuración de delivery" },
          { type: "video", src: "/single_resto/video_demostracion_white_label.mp4", poster: "/single_resto/video_demostracion_white_label-poster.jpg", title: "Demo white-label", caption: "Mismo codebase, distinta marca: alternando entre temas de restaurantes" },
          { type: "video", src: "/single_resto/video_demostracion_flag_mantenimiento.mp4", poster: "/single_resto/video_demostracion_flag_mantenimiento-poster.jpg", title: "Modo mantenimiento", caption: "Activar modo mantenimiento para sacar el sitio de servicio al instante" },
          { type: "grid", items: [ { src: "/single_resto/image.png", caption: "Wide Events en acción: salida estructurada en terminal" } ] },
          { type: "code", title: "Ejemplo: Wide Event estructurado", text: `{
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
          { type: "text", title: "Qué compró el logging", text: "• Un solo evento por acción con contexto completo (user, duration, outcome).\n• Detección automática de errores y resultados usando byethrow.\n• Queries analíticas: tasa de error por acción, tiempo promedio de respuesta por tenant.\n• Trazabilidad completa con request_id único por solicitud.\n• Mucho menos ruido en los logs que con console.log dispersos." },
          { type: "text", title: "Resultado", text: "La plataforma corre en producción en el VPS, tomando pedidos con pago, imprimiendo tickets y avisando a los clientes por WhatsApp, con el mismo codebase sirviendo a más de una marca.\n\nFue el proyecto que más me alejó del frontend típico: Docker multi-container, networking entre containers, SSL, uptime, una pasarela de pagos y storage de producción. También fue donde apliqué por primera vez, sobre un sistema vivo con clientes reales, la planificación y la organización que hasta ahí solo había estudiado en las materias de ingeniería de software." }
        ]
      }
    }
  },


  {
    slug: "gsp",
    tier: "featured",
    accentColor: "#A855F7",
    year: "2025",
    client: "Personal / Research",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Cloudflare R2", "Better-Auth"],
    links: { repo: "https://github.com/juanm512/gsp" },
    hero: { type: "video", src: "/gsp/thumbnail.mp4", poster: "/gsp/thumbnail-poster.jpg" },
    locales: {
      en: {
        title: "GSP",
        tagline: "Gaussian Splatting rendering platform",
        description: "Self hosted platform where you upload photos of a scene and it orchestrates rented GPU jobs to return a Gaussian Splatting render, with history per organization.",
        role: "Developer / Research",
        context: "Personal / Research",
        content: [
          { type: "text", title: "Overview", text: "GSP is a multi tenant platform for 3D Gaussian Splatting: you upload a set of photos of a scene and get back a rendered splat. Gaussian Splatting reconstructs photorealistic 3D scenes from 2D images by representing them as millions of semi transparent ellipsoids instead of meshes, and it renders in real time.\n\nI built it to understand the technology from the infrastructure side rather than from a paper." },
          { type: "text", title: "The problem", text: "Running a splatting render is not the hard part: it is a command over a folder of images. The hard part is everything around it. It needs a GPU, and a GPU sitting idle costs money all day. The job takes long enough that no HTTP request can wait for it. It fails often, for reasons ranging from bad input photos to a machine disappearing. And the output is heavy, so it cannot live next to the app.\n\nWithout that scaffolding, experimenting with the technique means babysitting a terminal." },
          { type: "text", title: "Decisions", text: "• Rent GPU compute per job instead of keeping a machine up: compute is provisioned when a job starts and released when it ends, so idle time is not paid for.\n• A queue with a background worker rather than a synchronous request: uploading and rendering are separate, the user gets a job with a state (pending, running, failed, success) and can close the tab.\n• Automatic retries with exponential backoff: failures here are mostly transient, so the retry is part of the pipeline instead of a manual relaunch.\n• Cloudflare R2 for both inputs and outputs: uploads go straight to object storage, renders come back to it, and the app server never becomes the file server.\n• Multi tenant with Better-Auth and organizations that invite members: renders belong to a team, with its own history and usage, which is also what makes usage based billing possible.\n• Drizzle ORM with PostgreSQL for job and user state: the state machine of a job is the most queried thing in the system, so it stays relational and typed.\n• Next.js with shadcn/ui for the admin surface: the interesting work is the pipeline, so the UI reuses components instead of inventing them." },
          { type: "full-width-image", src: "/gsp/pipeline.png", caption: "Rendering pipeline: upload, preprocessing, GPU queue, output, R2 storage" },
          { type: "video", src: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted.mp4", poster: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted-poster.jpg", title: "Admin interface", caption: "Quick walkthrough of the admin panel: job queue, org management and render status" },
          { type: "text", title: "Result", text: "GSP runs the full cycle end to end: photos in, a queued job, GPU compute rented on demand, retries when something fails, and a finished render stored in R2 under the organization that asked for it.\n\nIt showed me that the interesting engineering in a GPU heavy product is rarely the algorithm: it is the queue, the retries, the storage and the tenancy around it. That is the part that turned an experiment I ran by hand into something anyone with an account can run." }
        ]
      },
      es: {
        title: "GSP",
        tagline: "Plataforma de render Gaussian Splatting",
        description: "Plataforma self-hosted donde se suben fotos de una escena y orquesta trabajos en GPU alquilada para devolver un render Gaussian Splatting, con historial por organización.",
        role: "Desarrollador / Investigación",
        context: "Personal / Investigación",
        content: [
          { type: "text", title: "Resumen", text: "GSP es una plataforma multi-tenant de Gaussian Splatting 3D: se sube un conjunto de fotos de una escena y devuelve el splat renderizado. Gaussian Splatting reconstruye escenas 3D fotorrealistas a partir de imágenes 2D representándolas como millones de elipsoides semitransparentes en vez de mallas, y renderiza en tiempo real.\n\nLo construí para entender la tecnología desde el lado de la infraestructura y no desde un paper." },
          { type: "text", title: "El problema", text: "Correr un render de splatting no es lo difícil: es un comando sobre una carpeta de imágenes. Lo difícil es todo lo que lo rodea. Necesita una GPU, y una GPU ociosa cuesta plata todo el día. El trabajo tarda lo suficiente como para que ningún request HTTP lo espere. Falla seguido, por razones que van desde fotos malas hasta una máquina que desaparece. Y la salida pesa, así que no puede vivir al lado de la app.\n\nSin ese andamiaje, experimentar con la técnica es cuidar una terminal." },
          { type: "text", title: "Decisiones", text: "• Alquilar cómputo GPU por trabajo en vez de dejar una máquina prendida: el cómputo se aprovisiona cuando arranca el trabajo y se libera al terminar, así no se paga tiempo ocioso.\n• Una cola con un worker en background en vez de un request sincrónico: subir y renderizar son cosas separadas, el usuario recibe un trabajo con estado (pendiente, en proceso, fallido, exitoso) y puede cerrar la pestaña.\n• Reintentos automáticos con backoff exponencial: acá las fallas son en su mayoría transitorias, así que el reintento es parte del pipeline y no un relanzamiento manual.\n• Cloudflare R2 para entradas y salidas: los uploads van directo al object storage, los renders vuelven ahí, y el servidor de la app nunca se convierte en servidor de archivos.\n• Multi-tenant con Better-Auth y organizaciones que invitan miembros: los renders son de un equipo, con su historial y su uso, que es también lo que habilita la facturación por consumo.\n• Drizzle ORM con PostgreSQL para el estado de trabajos y usuarios: la máquina de estados de un trabajo es lo más consultado del sistema, así que queda relacional y tipada.\n• Next.js con shadcn/ui para la superficie de administración: lo interesante es el pipeline, así que la UI reusa componentes en vez de inventarlos." },
          { type: "full-width-image", src: "/gsp/pipeline.png", caption: "Pipeline de renderizado: upload, preprocesamiento, cola GPU, salida, almacenamiento R2" },
          { type: "video", src: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted.mp4", poster: "/gsp/gsp_vista_rapida_funcionalidades_admin_cutted-poster.jpg", title: "Interfaz de administrador", caption: "Recorrido por el panel de admin: cola de trabajos, gestión de organizaciones y estado de renders" },
          { type: "text", title: "Resultado", text: "GSP corre el ciclo completo de punta a punta: entran las fotos, se encola el trabajo, se alquila cómputo GPU bajo demanda, se reintenta cuando algo falla y el render terminado queda en R2 bajo la organización que lo pidió.\n\nMe mostró que la ingeniería interesante en un producto pesado en GPU rara vez es el algoritmo: es la cola, los reintentos, el storage y el multi-tenant alrededor. Esa es la parte que convirtió un experimento que corría a mano en algo que cualquiera con una cuenta puede correr." }
        ]
      }
    }
  },

  {
    slug: "bmmusic",
    tier: "secondary",
    accentColor: "#EC4899",
    year: "2024",
    client: "Personal",
    stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    links: { repo: "https://github.com/juanm512/bmmusic", live: "https://bmmusic.vercel.app/" },
    hero: { type: "video", src: "/BMusic/bmusichomepage.mp4", poster: "/BMusic/bmusichomepage-poster.jpg" },
    locales: {
      en: {
        title: "BM Music",
        tagline: "Artist Landing",
        description: "Landing page template for independent music artists with animated hero, song previews and a tickets section, designed and deployed in three days.",
        role: "Frontend Developer / Designer",
        context: "Personal",
        content: [
          { type: "text", title: "Overview", text: "Designed and built a ready to use landing page template for independent music artists: a hero with animated transitions, a discography section with embedded song previews and an events and tickets page, all in under three days." },
          { type: "grid", items: [ { src: "/BMusic/bmusichomepage.mp4", poster: "/BMusic/bmusichomepage-poster.jpg", caption: "Animated homepage hero" }, { src: "/BMusic/Bmusicsongs.mp4", poster: "/BMusic/Bmusicsongs-poster.jpg", caption: "Discography browser" } ] },
          { type: "grid", items: [ { src: "/BMusic/homepage.mp4", poster: "/BMusic/homepage-poster.jpg", caption: "Scroll based transitions" }, { src: "/BMusic/tickets.mp4", poster: "/BMusic/tickets-poster.jpg", caption: "Events and tickets section" } ] },
          { type: "text", title: "Technical highlights", text: "• Micro interaction system built with Framer Motion: staggered card reveals, parallax scroll effects and page transitions.\n• Fully responsive layout with TailwindCSS, tested across mobile, tablet and desktop breakpoints.\n• Component driven architecture in Next.js with prop based theming, so a new artist is a set of props.\n• Lazy loaded images and a small bundle, deployed on Vercel." }
        ]
      },
      es: {
        title: "BM Music",
        tagline: "Landing de Artista",
        description: "Template de landing para artistas musicales independientes con hero animado, previews de canciones y sección de tickets, diseñado y desplegado en tres días.",
        role: "Frontend Developer / Diseñador",
        context: "Personal",
        content: [
          { type: "text", title: "Resumen", text: "Diseñé y construí un template de landing listo para usar para artistas musicales independientes: un hero con transiciones animadas, una sección de discografía con previews embebidos y una página de eventos y tickets, todo en menos de tres días." },
          { type: "grid", items: [ { src: "/BMusic/bmusichomepage.mp4", poster: "/BMusic/bmusichomepage-poster.jpg", caption: "Hero animado de la homepage" }, { src: "/BMusic/Bmusicsongs.mp4", poster: "/BMusic/Bmusicsongs-poster.jpg", caption: "Navegador de discografía" } ] },
          { type: "grid", items: [ { src: "/BMusic/homepage.mp4", poster: "/BMusic/homepage-poster.jpg", caption: "Transiciones basadas en scroll" }, { src: "/BMusic/tickets.mp4", poster: "/BMusic/tickets-poster.jpg", caption: "Sección de eventos y tickets" } ] },
          { type: "text", title: "Destacados técnicos", text: "• Sistema de micro-interacciones con Framer Motion: aparición escalonada de tarjetas, parallax en scroll y transiciones entre páginas.\n• Layout totalmente responsivo con TailwindCSS, testeado en breakpoints de mobile, tablet y desktop.\n• Arquitectura por componentes en Next.js con theming por props, así un artista nuevo es un juego de props.\n• Imágenes lazy-loaded y bundle chico, desplegado en Vercel." }
        ]
      }
    }
  },

  {
    slug: "atlas-3d",
    tier: "featured",
    accentColor: "#8B5A2B",
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
        title: "Atlas 3D",
        tagline: "Interactive anatomy atlas for a textbook",
        description: "Browser based 3D anatomy atlas built for a medical school textbook: students rotate and zoom real bone models with labels anchored to the geometry.",
        role: "Frontend / 3D Engineer",
        context: "Freelance / Research",
        content: [
          { type: "text", title: "Overview", text: "Atlas 3D is a web anatomy atlas that renders human skeletal models in the browser with Three.js through react-three-fiber. Students rotate, zoom and pan around each bone while annotation overlays show anatomical names anchored to specific 3D coordinates. It was built as the interactive companion to a printed textbook for an anatomy department at a medical school." },
          { type: "text", title: "The problem", text: "A friend writing that textbook had a limitation no amount of illustration solves: a bone is a three dimensional object and a page shows one angle of it. Students memorize the drawing instead of the shape, and then fail to recognize the same bone from another view.\n\nHe needed something students could open next to the book, turn around in their hands and read labels off, without installing anything and without technical knowledge." },
          { type: "text", title: "Decisions", text: "• react-three-fiber inside Next.js instead of raw Three.js: the scene is composed declaratively as React components, so the annotations and the UI live in the same model as the 3D content.\n• Annotations bound to 3D world coordinates, not to screen positions: labels stay on the right part of the bone through every rotation and zoom level, which is the whole point in an academic context.\n• Progressive level of detail on model loading: the first render arrives fast on a student laptop and detail comes in afterwards, instead of a long blank wait.\n• Draw calls profiled and optimized to hold 60 fps on mid range hardware: the target device was a student's laptop or phone, not a workstation.\n• Touch gestures as a first class input: pinch to zoom, two finger rotation and swipe between bones, because most of the studying happens on a phone next to the book.\n• Framer Motion only for the interface transitions between the catalogue and each bone detail: the 3D canvas is left alone." },
          { type: "grid", items: [ { src: "/Atlas3d/home.mp4", poster: "/Atlas3d/home-poster.jpg", caption: "Interactive 3D viewer" }, { src: "/Atlas3d/bonePage.mp4", poster: "/Atlas3d/bonePage-poster.jpg", caption: "Detailed bone exploration" } ] },
          { type: "text", title: "Result", text: "The atlas is online and works as the companion to the book: any student opens a bone, turns it and reads the labels on the real geometry, from a laptop or a phone.\n\nIt was also my first sustained project with a non technical client, and that taught me as much as the rendering did: gathering requirements from an anatomist, showing progress with demos instead of jargon, cutting a complex project into milestones, and deciding when to push back on a request. I met those ideas formally in software engineering courses later, with the practice already done." }
        ]
      },
      es: {
        title: "Atlas 3D",
        tagline: "Atlas de anatomía interactivo para un libro",
        description: "Atlas de anatomía 3D en el navegador hecho para un libro de una facultad de medicina: los estudiantes rotan y hacen zoom sobre huesos con etiquetas ancladas a la geometría.",
        role: "Frontend / Ingeniero 3D",
        context: "Freelance / Investigación",
        content: [
          { type: "text", title: "Resumen", text: "Atlas 3D es un atlas de anatomía web que renderiza modelos esqueléticos humanos en el navegador con Three.js mediante react-three-fiber. Los estudiantes rotan, hacen zoom y se desplazan alrededor de cada hueso mientras las anotaciones muestran nombres anatómicos anclados a coordenadas 3D específicas. Se construyó como complemento interactivo de un libro impreso para una cátedra de anatomía de una facultad de medicina." },
          { type: "text", title: "El problema", text: "Un amigo que estaba escribiendo ese libro tenía una limitación que ninguna ilustración resuelve: un hueso es un objeto tridimensional y una página muestra un ángulo. Los estudiantes memorizan el dibujo en vez de la forma, y después no reconocen el mismo hueso desde otra vista.\n\nNecesitaba algo que los estudiantes pudieran abrir al lado del libro, girar en la mano y leerle las etiquetas, sin instalar nada y sin conocimiento técnico." },
          { type: "text", title: "Decisiones", text: "• react-three-fiber dentro de Next.js en vez de Three.js crudo: la escena se compone declarativamente como componentes React, así las anotaciones y la UI viven en el mismo modelo que el contenido 3D.\n• Anotaciones atadas a coordenadas 3D del mundo, no a posiciones de pantalla: las etiquetas quedan sobre la parte correcta del hueso en cualquier rotación y nivel de zoom, que es todo el punto en un contexto académico.\n• Nivel de detalle progresivo al cargar los modelos: el primer render llega rápido en la notebook de un estudiante y el detalle entra después, en vez de una espera larga en blanco.\n• Draw calls perfilados y optimizados para sostener 60 fps en hardware de gama media: el dispositivo objetivo era la notebook o el celular de un estudiante, no una workstation.\n• Gestos táctiles como entrada de primera clase: pinch para zoom, rotación con dos dedos y swipe entre huesos, porque la mayor parte del estudio pasa en el celular al lado del libro.\n• Framer Motion solo para las transiciones de interfaz entre el catálogo y el detalle de cada hueso: al canvas 3D no se lo toca." },
          { type: "grid", items: [ { src: "/Atlas3d/home.mp4", poster: "/Atlas3d/home-poster.jpg", caption: "Visor 3D interactivo" }, { src: "/Atlas3d/bonePage.mp4", poster: "/Atlas3d/bonePage-poster.jpg", caption: "Exploración detallada de huesos" } ] },
          { type: "text", title: "Resultado", text: "El atlas está online y funciona como complemento del libro: cualquier estudiante abre un hueso, lo gira y lee las etiquetas sobre la geometría real, desde una notebook o un celular.\n\nFue además mi primer proyecto sostenido con un cliente no técnico, y eso me enseñó tanto como el renderizado: relevar requerimientos con un anatomista, mostrar avances con demos en vez de jerga, partir un proyecto complejo en hitos y decidir cuándo resistir un pedido. Esas ideas las vi formalmente en las materias de ingeniería de software después, con la práctica ya hecha." }
        ]
      }
    }
  },

  {
    slug: "f1-stats",
    tier: "secondary",
    accentColor: "#EF4444",
    year: "2023",
    client: "Personal / Learning",
    stack: ["React Native", "Expo", "JavaScript"],
    links: { repo: "" },
    hero: { type: "image", src: "/f1-stats/home.png" },
    locales: {
      en: {
        title: "F1 Stats 2023",
        description: "React Native app to follow the 2023 Formula 1 season (driver standings, teams and calendar) from a live API. My first mobile project.",
        role: "Mobile Developer",
        context: "Personal / Learning",
        content: [
          { type: "text", title: "Overview", text: "My first React Native project, built to learn mobile development on a subject I actually follow. The app consumes the Ergast F1 API to show standings, team profiles and the full race calendar for the 2023 season." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home: season overview" }, { src: "/f1-stats/drivers.png", caption: "Driver standings" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Team comparisons" }, { src: "/f1-stats/calendar.png", caption: "Race calendar" } ] },
          { type: "text", title: "Technical highlights", text: "• Built with Expo for fast iteration and testing on both iOS and Android.\n• Ergast Developer API integrated through custom hooks for fetching, caching and error handling.\n• Tab based navigation with React Navigation and animated list transitions.\n• Layouts adapted to different screen sizes, designed mobile first." },
          { type: "text", title: "What I learned", text: "First hands on experience with React Native's component model, native navigation patterns and the differences between mobile and web. It is where state management and async data flows stopped being theory for me." }
        ]
      },
      es: {
        title: "F1 Stats 2023",
        description: "App en React Native para seguir la temporada 2023 de Fórmula 1 (pilotos, equipos y calendario) desde una API en vivo. Mi primer proyecto mobile.",
        role: "Desarrollador Mobile",
        context: "Personal / Aprendizaje",
        content: [
          { type: "text", title: "Resumen", text: "Mi primer proyecto en React Native, hecho para aprender desarrollo mobile sobre un tema que sigo de verdad. La app consume la API Ergast de F1 para mostrar clasificaciones, perfiles de equipos y el calendario completo de la temporada 2023." },
          { type: "grid", items: [ { src: "/f1-stats/home.png", caption: "Home: resumen de temporada" }, { src: "/f1-stats/drivers.png", caption: "Clasificación de pilotos" } ] },
          { type: "grid", items: [ { src: "/f1-stats/teams.png", caption: "Comparación de equipos" }, { src: "/f1-stats/calendar.png", caption: "Calendario de carreras" } ] },
          { type: "text", title: "Destacados técnicos", text: "• Construida con Expo para iterar rápido y probar en iOS y Android.\n• API de Ergast integrada con hooks propios para fetching, caché y manejo de errores.\n• Navegación por tabs con React Navigation y transiciones animadas de listas.\n• Layouts adaptados a distintos tamaños de pantalla, pensados mobile first." },
          { type: "text", title: "Qué aprendí", text: "Primera experiencia práctica con el modelo de componentes de React Native, los patrones de navegación nativos y las diferencias con la web. Fue donde la gestión de estado y los flujos asíncronos dejaron de ser teoría." }
        ]
      }
    }
  },

  {
    slug: "donatelo",
    tier: "secondary",
    accentColor: "#FBBF24",
    year: "2022",
    client: "Personal / Research",
    stack: ["React", "Node.js", "socket.io", "MongoDB", "ethereum", "Express"],
    links: { repo: "https://github.com/juanm512/streams-donations-realtime", live: "https://donatelo.netlify.app/" },
    hero: { type: "image", src: "/donatelo/home.webp" },
    locales: {
      en: {
        title: "Donatelo",
        description: "Crypto donation platform for live streamers: multi chain payments that trigger on screen alerts over WebSockets in under two seconds.",
        role: "Full Stack Developer",
        context: "Personal / Research",
        content: [
          { type: "text", title: "What it does", text: "Donatelo lets viewers send cryptocurrency donations during live streams. Streamers get customizable on screen alerts driven by WebSockets, and donors can track their history from a dashboard. It supports several blockchains and tokens through ethers.js." },
          { type: "video", src: "/donatelo/donatelo_video_breve_funcionalidad.mp4", poster: "/donatelo/donatelo_video_breve_funcionalidad-poster.jpg", title: "Platform demo", caption: "Quick walkthrough of the core functionality" },
          { type: "text", title: "Technical architecture", text: "• Node.js and Express backend with JWT authentication and one click MetaMask login.\n• Real time event pipeline: transaction confirmation, server webhook, socket.io broadcast, overlay render in under two seconds.\n• MongoDB for user profiles, donation history and streamer settings.\n• Multi chain support: custom RPC provider selection and contract ABI abstraction for ERC-20 tokens.\n• React frontend with daisyUI, TailwindCSS and Three.js animations on the landing page." }
        ]
      },
      es: {
        title: "Donatelo",
        description: "Plataforma de donaciones crypto para streamers: pagos multi-cadena que disparan alertas en pantalla por WebSockets en menos de dos segundos.",
        role: "Full Stack Developer",
        context: "Personal / Investigación",
        content: [
          { type: "text", title: "Qué hace", text: "Donatelo permite a los espectadores enviar donaciones en criptomonedas durante transmisiones en vivo. Los streamers reciben alertas personalizables en pantalla por WebSockets, y los donantes pueden ver su historial desde un dashboard. Soporta varias blockchains y tokens a través de ethers.js." },
          { type: "video", src: "/donatelo/donatelo_video_breve_funcionalidad.mp4", poster: "/donatelo/donatelo_video_breve_funcionalidad-poster.jpg", title: "Demo de la plataforma", caption: "Recorrido rápido de la funcionalidad principal" },
          { type: "text", title: "Arquitectura técnica", text: "• Backend en Node.js y Express con autenticación JWT y login one-click con MetaMask.\n• Pipeline de eventos en tiempo real: confirmación de la transacción, webhook al servidor, broadcast por socket.io, render del overlay en menos de dos segundos.\n• MongoDB para perfiles de usuario, historial de donaciones y configuración de streamers.\n• Soporte multi-cadena: selección de proveedor RPC y abstracción de ABI de contratos para tokens ERC-20.\n• Frontend en React con daisyUI, TailwindCSS y animaciones Three.js en la landing." }
        ]
      }
    }
  },

  {
    slug: "vas-ecommerce",
    tier: "secondary",
    accentColor: "#22D3EE",
    year: "2022",
    client: "Freelance",
    stack: ["Next.js", "TailwindCSS", "MongoDB"],
    links: { live: "https://vas-ecommerce.vercel.app/", repo: "" },
    hero: { type: "image", src: "/vas-ecommerce/home.webp" },
    locales: {
      en: {
        title: "Ventas A Services",
        description: "E-commerce for a refrigeration parts retailer: public catalogue, admin dashboard with inventory, and orders that arrive as WhatsApp notifications.",
        role: "Full Stack / Frontend",
        context: "Freelance",
        content: [
          { type: "text", title: "Overview", text: "A complete e-commerce for a small retailer selling refrigeration and appliance parts: a public storefront with search, filters and cart, plus a private admin dashboard for inventory and orders." },
          { type: "grid", items: [ { src: "/vas-ecommerce/admin.webp", caption: "Admin dashboard" }, { src: "/vas-ecommerce/home-2.webp", caption: "Product catalogue" } ] },
          { type: "text", title: "Technical highlights", text: "• Server side rendering with Next.js for indexable product pages and fast first loads.\n• Admin CRUD with role based access, image uploads to AWS S3 and inventory tracking.\n• Cart with no payment gateway, at the client's request: an order triggers a WhatsApp notification for manual processing.\n• JWT authentication with bcrypt hashing and MongoDB for the catalogue documents." },
          { type: "text", title: "Result", text: "The client's catalogue went from paper to a site their customers can browse, and orders now arrive in one place instead of scattered across messages." }
        ]
      },
      es: {
        title: "Ventas A Services",
        description: "E-commerce para un negocio de repuestos de refrigeración: catálogo público, dashboard admin con inventario y pedidos que llegan como notificación de WhatsApp.",
        role: "Full Stack / Frontend",
        context: "Freelance",
        content: [
          { type: "text", title: "Resumen", text: "Un e-commerce completo para un negocio minorista de repuestos de refrigeración y línea blanca: tienda pública con búsqueda, filtros y carrito, más un dashboard privado para inventario y pedidos." },
          { type: "grid", items: [ { src: "/vas-ecommerce/admin.webp", caption: "Panel de administración" }, { src: "/vas-ecommerce/home-2.webp", caption: "Catálogo de productos" } ] },
          { type: "text", title: "Destacados técnicos", text: "• Server side rendering con Next.js para páginas de producto indexables y primeras cargas rápidas.\n• CRUD de administración con acceso por roles, subida de imágenes a AWS S3 y seguimiento de inventario.\n• Carrito sin pasarela de pago, a pedido del cliente: el pedido dispara una notificación de WhatsApp para procesarlo a mano.\n• Autenticación JWT con hashing bcrypt y MongoDB para los documentos del catálogo." },
          { type: "text", title: "Resultado", text: "El catálogo del cliente pasó del papel a un sitio que sus clientes pueden recorrer, y los pedidos ahora llegan a un solo lugar en vez de desperdigados en mensajes." }
        ]
      }
    }
  }
]
