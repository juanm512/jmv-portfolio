---
target: src-components-layout-tvmenu-jsx
total_score: 30
p0_count: 1
p1_count: 6
timestamp: 2026-09-05T21-21-18Z
slug: src-components-layout-tvmenu-jsx
---
# Critique: portfolio redesign (home, about, menú TV, página de proyecto) @ ba0da52

## Design Health Score (Nielsen /40)
Home 27 · About 24 · Menú TV 30 · Proyecto 22.

## Anti-Patterns Verdict
Detector CLI: 0 hallazgos fuera de lab. Overlay en navegador: home 3 (skipped-heading h1→h3, line-length en stack mono), about 1 (falso positivo: violeta del acento de GSP), proyecto 35 (12 clipped-overflow + 12 image-hover-transform en galería, tight-leading/oversized-h1 inflados por el script de text-balance, 2 cramped-padding). Revisión humana: sin tarjetas, franjas, eyebrows ni glass. Tells restantes: rayas largas en títulos y copia (todas las páginas), h2 aforísticos en about, partículas decorativas del gráfico, hero de proyecto con texto sobre captura densa, footer con crédito de fuentes.

## Priority Issues
- [P0] Proyecto: el back-link muestra Kbd Esc pero Esc abre el menú; Backspace es lo que vuelve. → harden
- [P1] Rayas largas en títulos de proyecto, hero y descripciones. Separar title/tagline. → clarify
- [P1] Contacto invisible en home y about (solo dentro del menú). → onboard
- [P1] Partículas del gráfico de contribuciones (60, color fuera de token, sin reduced-motion). → quieter
- [P1] Hero de proyecto: h1 96px sobre captura al 60%; grid 4/3 recorta capturas de teléfono; bullets y saltos de projects.js colapsados en un párrafo; "En vivo / En vivo"; "Cliente: Active / Production" sin traducir. → layout, adapt, harden
- [P1] Leyenda de teclado del menú TV visible en táctil; Kbd Esc/L visibles en móvil (Kbd.jsx ignora hidden). → adapt
- [P1] Conflicto tecla A (about global vs volver en menú); diálogo ? sobre menú abierto duplica scrim. → harden
- [P2] Sin focus-visible en "Quién soy", "Volver al inicio", "En vivo" y botones del menú TV; touch targets <44px en cabecera y links inline. → audit/polish
- [P2] Ejes del gráfico en inglés y sin leyenda; h2 aforísticos en about. → harden, clarify
- [P3] h1 aforístico; footer con crédito de fuentes; 11 ítems de Proyectos sin subtítulos Destacados/Otros en el menú.

## Mediciones
Contraste ink 19.5:1, ink-2 8.6:1, ink-3 5.3:1 (12px, AA ok). Fuente mínima 11px (Kbd). Sin overflow horizontal en móvil. Sin bordes laterales, gradient text ni backdrop-filter. Consola sin errores.

## Persona Red Flags
Alex: ? escondido, Esc miente en proyecto. Jordan (phone): Kbd inútiles, FSM/prode sin contexto, no encuentra contacto. Tech lead: sin problema→decisión→resultado ni cifras; siguiente proyecto salta a un secundario.
