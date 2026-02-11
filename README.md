# Juan Manuel Vila - Portfolio Personal

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)](https://www.framer.com/motion/)

> Portfolio personal interactivo con experiencias 3D, animaciones fluidas y diseño moderno.

## 🚀 Demo

Visita el portfolio en: [https://jmv-portfolio.vercel.app](https://jmv-portfolio.vercel.app)

## ✨ Características

- **Experiencia 3D Interactiva**: Landing con renderizado WebGL usando React Three Fiber, con detección de GPU para optimización de rendimiento
- **Scroll Horizontal con Pin**: Galería de proyectos con scroll horizontal sincronizado y efectos de parallax
- **Internacionalización**: Soporte completo para español e inglés con `next-intl`
- **Animaciones Avanzadas**: Transiciones fluidas con Framer Motion y Lenis para scroll suave
- **Diseño Responsivo**: Adaptable a todos los dispositivos con Tailwind CSS
- **Navegación por Teclado**: Atajos de teclado (ESC para menú, L para cambiar idioma)
- **Cursor Personalizado**: Efectos de cursor con backdrop-invert sobre elementos interactivos

## 🛠 Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router), React 18 |
| **Estilos** | Tailwind CSS, CSS Modules |
| **3D/WebGL** | Three.js, React Three Fiber, React Three Drei |
| **Animaciones** | Framer Motion, Lenis (smooth scroll), GSAP |
| **Internacionalización** | next-intl |
| **Performance** | Million.js (compiler), dynamic imports |
| **Tipografía** | Kode Mono (variable font) |

## 📁 Estructura del Proyecto

```
src/
├── app/[locale]/           # Rutas con i18n (es/en)
│   ├── [project]/          # Páginas dinámicas de proyectos
│   ├── layout.js           # Layout raíz con fuentes
│   └── page.js             # Landing page
├── components/
│   ├── Landing/            # Sección 3D + Hero
│   │   ├── Canvas.jsx      # Setup de Three.js
│   │   ├── Scene.jsx       # Instancias 3D (burbujas)
│   │   └── LightsAndPerformance.jsx
│   ├── Description/        # Sección "Sobre mí" con cursor interactivo
│   ├── HorizontalScrollProjects/  # Scroll horizontal de proyectos
│   ├── Header/             # Navegación con menú full-screen
│   └── Contact/            # Footer con efectos de texto
├── lib/
│   ├── data.json           # Proyectos (es/en)
│   └── useData.js          # Hooks para acceso a datos
└── middleware.js           # Configuración de i18n
```

## 🎯 Destacados Técnicos

### Sistema de Instancias 3D
El landing utiliza `InstancedMesh` de Three.js para renderizar cientos de objetos 3D (burbujas) con un solo draw call, incluyendo:
- Detección de capacidad GPU (`useDetectGPU`) para ajustar calidad
- Animaciones de escala senoidal por instancia
- Materiales de transmisión con aberración cromática
- Efecto "Float" para movimiento orgánico

### Scroll Horizontal Sincronizado
Implementación de scroll vertical tradicional que transforma el progreso en desplazamiento horizontal:
```javascript
const xTranslation = useSpring(scrollYProgress, {
  stiffness: 2000,
  damping: 10,
  mass: 0.1
})
```

### Optimizaciones de Rendimiento
- SSR deshabilitado para componentes 3D (`ssr: false`)
- Lazy loading de imágenes con Next/Image
- Dynamic imports para código splitting
- Million.js para optimización de React

## 🌍 Internacionalización

Soporte completo para español e inglés:
- Rutas: `/es` y `/en`
- Mensajes en `messages/es.json` y `messages/en.json`
- Cambio de idioma sin recarga de página

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/juanm512/jmv-portfolio.git

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

## 📌 Roadmap

- [ ] Migración del render 3D a Gaussian Splatting personalizado
- [ ] Integración de blog técnico
- [ ] Modo oscuro/claro toggle

---

**Desarrollado con 💪 por Juan Manuel Vila**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-juanmanuelvila-blue)](https://www.linkedin.com/in/juanmanuelvila/)
[![GitHub](https://img.shields.io/badge/GitHub-juanm512-black)](https://github.com/juanm512)
