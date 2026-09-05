---
name: Juan Manuel Vila Portfolio
description: Portfolio oscuro y navegable por teclado de un desarrollador full stack; lista de proyectos como superficie de trabajo, un solo LED verde y filetes en lugar de tarjetas.
colors:
  workshop-black: "#050b08"
  deep-black: "#020504"
  led-green: "#00ff9c"
  engine-green: "#0f3d2e"
  green-accent: "#1b5e3c"
  green-light: "#2e7d57"
  ink: "#fdfdfd"
  ink-2: "#a9abaa"
  ink-3: "#818482"
  line: "#191e1c"
  line-strong: "#323734"
  ink-wash: "#141a17"
  selection: "#045434"
typography:
  display:
    fontFamily: Geist
    fontSize: 48px / 72px (md) / 96px (lg)
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.02em
  headline:
    fontFamily: Geist
    fontSize: 24px / 30px (md)
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  title:
    fontFamily: Geist
    fontSize: 20px / 24px (md)
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  menu:
    fontFamily: Kode Mono
    fontSize: clamp(1.75rem, 4vw, 2.5rem)
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-prose:
    fontFamily: Geist
    fontSize: 17px / 18px (md)
    fontWeight: 400
    lineHeight: 1.7
  body-lead:
    fontFamily: Geist
    fontSize: 18px / 20px (md)
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Kode Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1rem
  label-legend:
    fontFamily: Kode Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  key:
    fontFamily: Kode Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1
rounded:
  sm: 4px
  md: 6px
  full: 9999px
spacing:
  "1": 4px
  "1.5": 6px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "14": 56px
  "16": 64px
  "20": 80px
  "24": 96px
  "28": 112px
  "32": 128px
components:
  project-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: title
    rounded: "{rounded.sm}"
    padding: 24px 0
  project-row-hover:
    backgroundColor: transparent
    textColor: var(--accent) (fallback {colors.led-green})
    typography: title
    rounded: "{rounded.sm}"
    padding: 24px 0
  project-row-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: body
    rounded: "{rounded.sm}"
    padding: 12px 0
  project-row-focus:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: title
    rounded: "{rounded.sm}"
    padding: 24px 0
  kbd:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: key
    rounded: "{rounded.sm}"
    padding: 0 6px
    height: 20px
    width: min 24px
  nav-bar:
    backgroundColor: "{colors.workshop-black}"
    textColor: "{colors.ink}"
    typography: body
    height: 56px
    padding: 0 24px
  nav-button:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: body
    rounded: "{rounded.sm}"
    padding: 0 8px
    height: 36px
  nav-button-hover:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: body
    rounded: "{rounded.sm}"
    padding: 0 8px
    height: 36px
  nav-brand:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: label
    rounded: "{rounded.sm}"
  nav-brand-hover:
    backgroundColor: transparent
    textColor: "{colors.led-green}"
    typography: label
    rounded: "{rounded.sm}"
  link-arrow:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: body
    rounded: "{rounded.sm}"
    size: 14px
  link-arrow-hover:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: body
    rounded: "{rounded.sm}"
    size: 14px
  tv-menu-overlay:
    backgroundColor: "{colors.deep-black}"
    textColor: "{colors.ink}"
    typography: menu
    padding: 0 24px
  tv-menu-section:
    backgroundColor: transparent
    textColor: "{colors.ink-3}"
    typography: menu
    padding: 6px 0
  tv-menu-section-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: menu
    padding: 6px 0
  tv-menu-item:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: body-lead
    rounded: "{rounded.sm}"
    padding: 8px 12px
  tv-menu-item-active:
    backgroundColor: "{colors.ink-wash}"
    textColor: "{colors.ink}"
    typography: body-lead
    rounded: "{rounded.sm}"
    padding: 8px 12px
  tv-menu-legend:
    backgroundColor: transparent
    textColor: "{colors.ink-3}"
    typography: label-legend
    padding: 16px 0 32px
  help-dialog:
    backgroundColor: "{colors.workshop-black}"
    textColor: "{colors.ink}"
    typography: body
    rounded: "{rounded.md}"
    padding: 24px
    width: max 384px
  help-dialog-scrim:
    backgroundColor: "{colors.deep-black}"
    textColor: "{colors.ink}"
    padding: 24px
  code-block:
    backgroundColor: "{colors.deep-black}"
    textColor: "{colors.ink-2}"
    typography: body
    rounded: "{rounded.sm}"
    padding: 24px
  stats-block:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: headline
    padding: 32px 0
  metadata-label:
    backgroundColor: transparent
    textColor: "{colors.ink-3}"
    typography: label
  metadata-value:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: body-lead
  media-figure:
    backgroundColor: "{colors.ink-wash}"
    textColor: "{colors.ink-3}"
    typography: label
    rounded: "{rounded.sm}"
  lightbox:
    backgroundColor: "#000000"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: 16px / 48px (md)
  next-project:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: display
    padding: 128px 0
  footer-note:
    backgroundColor: transparent
    textColor: "{colors.ink-3}"
    typography: label
    padding: 24px 0 40px
---

## 1. Overview

**Estrella polar creativa: "La mesa de taller, de noche".** Una superficie oscura donde cada herramienta tiene su lugar, iluminada por un solo LED verde. Precisión sin adorno.

El sitio es el portfolio de Juan Manuel Vila, desarrollador full stack de La Plata. Su registro es *brand*, pero una marca de una sola persona que resuelve problemas con las manos. Tres palabras lo describen: **exacto, oscuro, tangible**. Los visitantes (reclutadores técnicos, líderes de ingeniería, clientes freelance) llegan desde LinkedIn o GitHub, muchas veces desde el celular, y quieren responder rápido qué construyó esta persona y con qué profundidad. Por eso la lista de proyectos es la superficie de trabajo y todo lo demás es contexto.

### Lo que el sitio no es

PRODUCT.md deja escritas las anti-referencias, y esta guía las hereda al pie de la letra:

- "El portfolio anterior de este mismo sitio: 28 pantallas de scroll pinneado, partículas 3D en dos secciones, biografía antes de los proyectos."
- "Plantillas de portfolio de desarrollador con tarjetas idénticas, acento lateral de color, chips de tecnologías en cada fila y eyebrows en mayúsculas sobre cada sección."
- "Landings SaaS con glassmorphism, gradientes en texto y métricas grandes."
- "Cualquier cosa que un visitante pueda identificar como generada por IA a primera vista."

### Las cuatro reglas

Cuatro reglas con nombre gobiernan cada decisión de esta guía. Se citan por nombre en las secciones siguientes.

1. **La regla del único efecto.** Hay un solo efecto visual memorable: el hover de proyecto (hoy, el título tomando el acento del proyecto y la flecha deslizándose; en el plan, las partículas o "beam" sobre la fila). Todo lo demás está quieto. Una animación nueva tiene que reemplazar a esa, no sumarse.
2. **La regla de la tecla visible.** Cada acción tiene una tecla y la tecla se ve. Ningún atajo existe en secreto: se muestra como cap `Kbd` al lado de la acción, en la leyenda del menú y en el diálogo de ayuda (`?`).
3. **La regla del filete.** La estructura se dibuja con líneas horizontales de un píxel (`border-b`, `border-t`, `border-y`) al 8 % o 18 % de tinta. Nunca con tarjetas, nunca con bordes laterales, nunca con acentos de color en el costado.
4. **La regla del verde escaso.** El Verde LED (`#00ff9c`) aparece en tres lugares: el anillo de foco, el punto que marca la sección activa del menú y el hover del nombre en la barra. Cada proyecto trae su propio acento (`--accent`) y lo usa en su fila, su hero y su página; el verde de la marca no compite con él.

### Layout y ritmo

Una sola columna centrada, sin sidebar ni grillas de tarjetas.

- **Contenedor principal:** `max-w-4xl` (896 px) con `px-6` (24 px) a los lados. La home, la barra de navegación y los bloques de texto de proyecto viven ahí.
- **Prosa larga (about):** `max-w-[65ch]`, con párrafos a 17 px (18 px en md) e interlineado 1.7.
- **Páginas de proyecto:** el hero, la grilla de metadatos y los bloques de medios se abren a `max-w-7xl` (1280 px); los bloques de texto vuelven a `max-w-4xl`; el bloque de código a `max-w-5xl`.
- **Menú TV:** `max-w-5xl` (1024 px), `px-6` en móvil y `px-10` en sm, dos columnas `5fr / 7fr` con `gap-16` en sm y `gap-10` en móvil.
- **Ritmo vertical:** hero de la home `pt-14 pb-10` (`pt-20 pb-12` en md); sección secundaria `mt-20`; footer `pt-28 pb-10`; bloques de proyecto `py-12` (`py-20` en md para texto, `py-16` para código); bloque "siguiente proyecto" `py-32`.
- **Filas de proyecto:** grilla `3.25rem / 1fr / auto` (`4rem` en sm) con `gap-x-3` (`gap-x-4` en sm). El año va en una columna fija, en mono, tabular, alineado a la línea base del título. Fila destacada `py-6`; fila secundaria `py-3`.

### Movimiento

El movimiento es mínimo y siempre respeta `prefers-reduced-motion`: `globals.css` fuerza `transition-duration` y `animation-duration` a `0.01ms` cuando el usuario lo pide, y cada componente con Motion consulta `useReducedMotion()` para anular el desplazamiento inicial.

- **Curva única:** `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`. Es la misma curva en la flecha de link, en la entrada de secciones del menú, en el diálogo de ayuda y en los bloques de proyecto.
- **Color:** `transition-colors` a 200 ms en filas y títulos, 150 ms en el menú TV.
- **Flecha de link:** `translate-x-0.5` (2 px) en hover, 200 ms, `motion-reduce:transform-none`.
- **Menú TV:** fundido del overlay 180 ms; secciones entran con `opacity 0 → 1, y 10 → 0` en 160 ms con escalonado de 30 ms; la columna de ítems cambia con fundido de 120 ms y queda al 55 % de opacidad mientras el foco está en las secciones.
- **Diálogo de ayuda:** scrim en 150 ms; panel `y 6 → 0` en 200 ms.
- **Página de proyecto:** el hero entra con `y 16 → 0` en 600 ms; cada bloque narrativo entra al hacerse visible con `y 16 → 0` en 500 ms, una sola vez, margen `-10 %`.
- **Medios:** las imágenes de la grilla escalan a 1.05 en hover durante 700 ms. Es el único caso de escala en el sitio y vive detrás del cursor "Expand".
- **Lightbox:** spring (`damping 25, stiffness 300`) desde escala 0.9.

## 2. Colors

La paleta son dos negros, dos verdes y una tinta que se atenúa. Todo lo demás lo trae cada proyecto.

| Token | Nombre | Valor | Uso |
| --- | --- | --- | --- |
| `background-dark` | Negro de taller | `#050b08` | Fondo de `html`/`body`, del diálogo de ayuda y de la grilla de metadatos. Es el plano de trabajo. |
| `background-darker` | Negro profundo | `#020504` | Un escalón por debajo: bloques de código, scrim del menú TV (95 %) y del diálogo de ayuda (80 %). |
| `green-glow` | Verde LED | `#00ff9c` | Anillo de foco, punto de sección activa en el menú, hover del nombre en la barra, etiqueta "actual" de idioma, acento por defecto cuando un proyecto no define el suyo. Selección de texto al 30 % (`#045434` compuesto). |
| `green-primary` | Verde motor | `#0f3d2e` | Verde de marca oscuro, definido en `@theme` y `:root`. Hoy no se usa en ningún componente; queda como reserva. |
| `green-accent` | | `#1b5e3c` | Solo en el pulgar de la barra de scroll. |
| `green-light` | | `#2e7d57` | Solo en el pulgar de la barra de scroll en hover. |
| `ink` | Tinta | `#fdfdfd` | Títulos, valores, texto activo. Contraste 20:1 sobre Negro de taller. |
| `ink-2` | Tinta al 66 % | `rgba(253,253,253,.66)` → `#a9abaa` | Cuerpo de texto, descripciones, botones de barra en reposo, caps `Kbd`. Contraste 8.4:1. |
| `ink-3` | Tinta al 50 % | `rgba(253,253,253,.5)` → `#818482` | Años, stack, etiquetas mono, leyendas, footer, secciones inactivas del menú. Contraste 5.2:1: el piso de AA. |
| `line` | Filete | `rgba(253,253,253,.08)` → `#191e1c` | Todas las líneas estructurales en reposo. |
| `line-strong` | Filete fuerte | `rgba(253,253,253,.18)` → `#323734` | Filete de fila en hover, borde del cap `Kbd`, borde del diálogo de ayuda. |
| `ink/6` | Lavado de tinta | `rgba(253,253,253,.06)` → `#141a17` | Fondo de la fila activa del menú TV. `ink/5` hace lo mismo bajo las figuras de medios mientras cargan. |

Los hex de `ink-2`, `ink-3`, `line`, `line-strong` y el lavado son los valores compuestos sobre `#050b08`; en el código siguen siendo opacidades, así que se apilan correctamente sobre `background-darker` también.

### Acento por proyecto

Cada proyecto define `accentColor` y la fila, el hero y la página lo exponen como `--accent` (con `#00FF9C` de respaldo). Se aplica al título en hover, a la flecha en hover, al punto de 6 px junto al nombre en el menú TV, a la línea "cliente · año" del hero y a los links "en vivo" de la grilla de metadatos. En la página se deriva además `--accent-border` al 30 % para el efecto planificado. El acento nunca se usa como fondo ni como borde lateral.

### La regla del verde escaso, aplicada

- Verde LED en reposo: solo el punto de sección activa del menú y la etiqueta "actual" del idioma.
- Verde LED en interacción: anillo de foco de 2 px con `ring-offset-2` sobre Negro de taller, hover del nombre en la barra, hover del link "sobre mí" en la home.
- Nunca: fondos verdes, texto de cuerpo verde, gradientes verdes, chips verdes.

## 3. Typography

Dos familias, con roles que no se cruzan.

- **Geist Sans** (`--font-sans`) es la voz. Títulos en peso 600, cuerpo en 400. Los `h1`, `h2` y `h3` llevan `letter-spacing: -0.02em` desde `globals.css`.
- **Kode Mono** (`--font-kode`, fuente variable local) es la máquina. Aparece en el nombre de la barra, en las secciones del menú TV y en el título del diálogo de ayuda. Todo lo que es dato (año, stack, etiquetas, leyendas, caps de tecla, footer) va en `font-mono`, que resuelve a la pila monoespaciada del sistema con el tamaño y la opacidad de Tinta al 50 %.

El cuerpo abre el interlineado a 1.6 porque el texto claro sobre oscuro lee más apretado. Los párrafos usan `text-wrap: pretty`; los títulos, `text-balance` o `Balancer`.

| Rol | Familia | Tamaño | Peso | Interlineado | Dónde |
| --- | --- | --- | --- | --- | --- |
| Display | Geist | 48 / 72 (md) / 96 (lg) px | 600 | 1.02 | `h1` del hero de proyecto; `-0.02em` |
| Display "siguiente" | Geist | 36 / 48 (md) px | 600 | 40 px | Título del bloque "siguiente proyecto" |
| Headline | Geist | 24 / 30 (md) px | 600 | 1.25 | `h2` de bloques de texto y de about; `h1` de la home (30 px en md, 1.3, `max-w-[30ch]`) y de about (30 / 36 px, 1.2) |
| Title | Geist | 20 / 24 (md) px | 600 | 1.25 | Título de fila destacada, `h3` de bloques de código y video |
| Menú | Kode Mono | `clamp(1.75rem, 4vw, 2.5rem)` | 400 | 1.15 | Secciones del menú TV |
| Cuerpo | Geist | 16 px | 400 | 1.6 | Base; descripción de fila destacada (14 / 16 px) |
| Prosa | Geist | 17 / 18 (md) px | 400 | 1.7 | Párrafos de about, `gap-5` entre ellos |
| Lead | Geist | 18 / 20 (md) px | 400 | 1.65 | Párrafos de bloques de texto de proyecto (`max-w-[65ch]`); ítems del menú TV (18 / 20 px, 1.5); descripción del hero (20 / 24 px, 1.5, `max-w-[48ch]`) |
| Cifra | Geist | 30 px | 600 | 1 | Valor de `StatsBlock`, `tabular-nums` |
| Label | mono | 12 px | 400 | 1rem | Año, stack, etiquetas de metadatos, captions, footer |
| Leyenda | mono | 13 px | 400 | 1.5 | Leyenda de teclas del menú TV |
| Tecla | mono | 11 px | 400 | 1 | Contenido del cap `Kbd` |
| Nombre | Kode Mono | 14 / 16 (sm) px | 400 | 1.5 | Nombre en la barra, `tracking-tight` |

Los años y las cifras siempre llevan `tabular-nums` para que las columnas queden alineadas. El stack se escribe en una sola línea mono separada por puntos medios (`·`), nunca como chips.

## 4. Elevation

Plano por defecto. El sitio no tiene sombras en reposo y no las necesita: la profundidad se construye con dos recursos y nada más.

1. **Capas tonales.** Negro profundo (`#020504`) por debajo de Negro de taller (`#050b08`). Un bloque de código se hunde un escalón; un scrim al 95 % o al 80 % del negro profundo cubre la página cuando se abre el menú o la ayuda. Nunca se sube un plano con un gris más claro: se baja el de al lado.
2. **Filetes.** Una línea de 1 px al 8 % separa; al 18 % afirma. La barra se cierra con un filete abajo, la lista de proyectos con uno arriba, cada fila con uno abajo, el bloque de estadísticas con dos (`border-y`), la leyenda del menú con uno arriba. El diálogo de ayuda es el único contenedor cerrado con borde en los cuatro lados (`line-strong`, radio 6 px), y lo es porque flota sobre un scrim.

Niveles en uso:

| Nivel | Superficie | z-index |
| --- | --- | --- |
| 0 | Página (Negro de taller) | auto |
| 0 hundido | Bloque de código (Negro profundo, filete al 8 %) | auto |
| 1 | Barra de navegación (misma superficie, filete abajo) | 40 |
| 2 | Menú TV (scrim 95 %) y lightbox (`bg-black/95`) | 100 |
| 3 | Diálogo de ayuda (scrim 80 %, panel con `line-strong`) | 200 |

El único resplandor permitido es el acento del proyecto en hover (título y flecha) y el efecto "beam" planificado sobre la fila, que usa `--accent-border` al 30 %. Ningún otro elemento brilla, difumina ni proyecta sombra. El hero de proyecto lleva dos gradientes de Negro de taller a transparente, pero son máscaras de legibilidad sobre la imagen (al 60 % de opacidad), no decoración; nunca se aplican a texto ni a superficies.

## 5. Components

Filosofía: **"herramienta bien afilada"**. Cada componente tiene estados claros (reposo, hover, foco, activo), el foco es siempre visible y cualquier acción con tecla muestra su tecla como cap `Kbd`. Ningún componente inventa un radio, una opacidad o una curva: todos consumen la misma media docena de valores.

### Foco

Un solo patrón, repetido tal cual: `outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-sm`. Anillo de 2 px de Verde LED separado 2 px del elemento por Negro de taller, esquinas a 4 px. Se aplica a filas, botones de barra, nombre y links con flecha. Dentro del menú TV y del diálogo, el foco real se mueve por código (`focus()`) al ítem resaltado para que los lectores de pantalla sigan la selección; los ítems llevan `tabIndex={-1}`.

### Kbd (cap de tecla)

El único distintivo de tecla del sitio; se ve igual en la barra, en la leyenda del menú, en la ayuda y en el prev/next de proyecto.

- `inline-flex`, centrado, `min-w-6` (24 px), `h-5` (20 px), `px-1.5` (6 px).
- Mono a 11 px, `leading-none`, Tinta al 66 %.
- Borde de 1 px `line-strong`, radio 4 px. Sin fondo, sin sombra.
- Alternativas para la misma acción se renderizan como caps separados (`J` `↓`), no como "J o ↓".
- En la barra y en el back-link se oculta por debajo de md (`hidden md:inline-flex`); en la leyenda y en la ayuda siempre se muestra.

### Arrow (flecha de link)

SVG de 14 × 14 (viewBox 16), trazo 1.5 en `currentColor`, cabos redondeados. Rota según `direction` (`left` 180°, `down` 90°, `up` -90°). El padre lleva `group`; en hover la flecha se desplaza 2 px (`translate-x-0.5` o `-translate-x-0.5` para atrás) en 200 ms con `ease-out-expo`, y `motion-reduce:transform-none` la deja quieta.

### Link con flecha

`inline-flex items-center gap-1.5` (o `gap-2` con `Kbd`), 14 px (16 px en md en la home), Tinta al 66 % que pasa a Tinta plena en hover (o a Verde LED en el CTA "sobre mí" de la home). Es el patrón de "volver", "ver todos los proyectos" y "sobre mí". Cuando la acción tiene tecla, el cap va al final: `← Volver [Esc]`.

### Fila de proyecto

Es el componente central y el único que porta el efecto de firma.

- **Estructura:** `Link` en grilla `3.25rem / minmax(0,1fr) / auto` (`4rem` en sm), `items-baseline`, `gap-x-3` (`gap-x-4` en sm). Columna de año en mono 12 px, Tinta al 50 %, tabular; contenido en el medio; flecha a la derecha en Tinta al 50 %.
- **Destacada** (`py-6`): título 20 / 24 px semibold, interlineado 1.25; descripción `mt-2`, 14 / 16 px, Tinta al 66 %, `max-w-[60ch]`, 1.6; stack `mt-3` mono 12 px Tinta al 50 %, oculto en móvil, `truncate`.
- **Secundaria** (`py-3`): título 14 / 16 px en Tinta plena; descripción inline a la derecha, Tinta al 50 %, `truncate`, solo en md.
- **Filete:** `border-b` al 8 % en reposo; al 18 % en hover (`transition-colors`).
- **Hover:** título y flecha toman `var(--accent)` en 200 ms; la flecha se desplaza 2 px. Sin fondo, sin escala, sin sombra.
- **Foco:** el anillo estándar. `J`/`K` o flechas mueven el foco entre filas (`data-project-row`) y centran la fila en pantalla.
- **Identidad:** `id="project-{slug}"`, `data-slug`, `style="--accent: …"`.

### Barra de navegación

`header` con z 40; `nav` a `max-w-4xl`, `px-6`, `h-14` (56 px), `flex justify-between`, filete abajo al 8 %. Sin fondo propio: es la misma superficie que la página.

- **Nombre:** Kode Mono 14 / 16 px, `tracking-tight`, Tinta plena, Verde LED en hover, anillo de foco estándar.
- **Botón de barra:** `h-9` (36 px), `px-2`, `-mx-1`, `gap-2`, 14 px, Tinta al 66 % → plena en hover, radio 4 px, anillo estándar. El botón de menú muestra su cap (`Esc`); el de idioma muestra el ícono, el código de idioma en mono 12 px mayúsculas (desde sm) y el cap `L`.
- Botones separados por `gap-3` (`gap-5` en sm).

### Menú TV

Un `dialog` a pantalla completa (z 100) sobre scrim de Negro profundo al 95 %, centrado verticalmente "como un menú de consola". Bloquea el scroll del body y toma todo el teclado (`W A S D`, flechas, `Enter`, `Esc`).

- **Columna de secciones** (`5fr`, `gap-1`): botones a ancho completo, Kode Mono `clamp(1.75rem, 4vw, 2.5rem)`, interlineado 1.15, `py-1.5`. Inactiva: Tinta al 50 % (66 % en hover). Activa: Tinta plena. El indicador de sección activa es un punto de 8 px (`w-2 h-2 rounded-full`) de Verde LED a `-left-5`, visible solo mientras el foco está en las secciones (`opacity` 0 → 1 en 150 ms).
- **Columna de ítems** (`7fr`, `max-h-[70vh]` / `80vh` en sm, scroll interno): filas `flex items-baseline justify-between gap-4`, `px-3 -mx-3 py-2`, radio 4 px, 18 / 20 px, interlineado 1.5. Reposo: Tinta al 66 % (plena en hover). Activa: Tinta plena sobre lavado `ink/6`. Un punto de 6 px con el acento del proyecto precede a cada proyecto; el año va a la derecha en mono 12 px Tinta al 50 %, tabular. La columna se atenúa al 55 % mientras el foco está en las secciones. Un divisor `border-t` al 8 % con `my-3` separa destacados de secundarios.
- **Leyenda** (`pb-8`): lista `flex-wrap`, `gap-x-6 gap-y-2`, mono 13 px Tinta al 50 %, filete arriba al 8 % con `pt-4`. Cada entrada: caps `Kbd`, alternativa en texto (`/ W S`) y etiqueta con `ml-1`.

### Diálogo de ayuda (`?`)

Scrim de Negro profundo al 80 % con `p-6` (z 200), 150 ms. Panel `max-w-sm` (384 px), fondo Negro de taller, borde 1 px `line-strong`, radio 6 px, `p-6`. Título en Kode Mono 14 px Tinta plena con `mb-5`. Lista con `gap-3`: cada fila `flex justify-between gap-4` a 14 px, etiqueta en Tinta al 66 % a la izquierda y caps `Kbd` con `gap-1` a la derecha. Cierra con `Esc` o click afuera.

### Página de proyecto

- **Hero:** `h-screen`, contenido alineado abajo (`items-end`), medio de fondo al 60 % de opacidad con dos máscaras de gradiente. Back-link arriba a la izquierda (`top-8 left-6`, `left-12` en md) con cap `Esc`. Bloque de texto en `max-w-7xl px-6 pb-20` (`pb-32` en md): línea "cliente · año" en mono 14 px con el acento, `mb-4`; `h1` display con `mb-6`; descripción 20 / 24 px Tinta al 66 %, `max-w-[48ch]`, 1.5.
- **Metadatos:** sección con filete abajo, `py-8` (`py-12` en md), grilla 2 / 4 columnas con `gap-8` (`gap-12` en md). Etiqueta mono 12 px Tinta al 50 % con `mb-1.5`; valor 18 px Tinta plena. Links "en vivo" en el acento (Tinta plena en hover), "repo" en Tinta al 66 %; ícono externo 16 px trazo 2. Stack en una línea mono 12 px Tinta al 50 %, interlineado 2, `mt-8 pt-6` con filete arriba, separada por `·`.
- **Bloque de texto:** `py-12` (`py-20` en md), `max-w-4xl`; `h2` headline con `mb-5`; párrafo lead `max-w-[65ch]`.
- **Grilla de medios:** `max-w-7xl`, 1 / 2 columnas con `gap-8`; figuras `aspect-[4/3]`, radio 4 px, fondo `ink/5`, cursor "Expand"/"Play"; caption debajo (`mt-3`, mono 12 px Tinta al 50 %), nunca encima.
- **Imagen a sangre:** `h-[50vh]` (`80vh` en md), `py-12`.
- **Estadísticas:** `dl` en 1 / 3 columnas, `gap-8`, `border-y` al 8 %, `py-8`; cifra 30 px semibold tabular `mb-2`, etiqueta 14 px Tinta al 66 %.
- **Código:** `pre` con fondo Negro profundo, filete al 8 % en los cuatro lados, radio 4 px, `p-6`; código mono 14 / 16 px Tinta al 66 %.
- **Video:** contenedor radio 4 px, `max-h-[80vh]`, `object-contain` sobre negro.
- **Siguiente proyecto:** `py-32`, centrado, filete arriba. Etiqueta mono 14 px Tinta al 50 % con caps `←` `→` (desde md); título 36 / 48 px semibold que toma `--next-accent` en hover; descripción 18 px Tinta al 66 % `max-w-xl` recortada a 120 caracteres; link "ver todos" con flecha.
- **Lightbox:** `bg-black/95`, `p-4` (`p-12` en md), contenido `max-h-[90vh]`, botón de cierre 24 px en Tinta al 66 % a `-top-12 right-0`; `Esc` cierra y se intercepta en fase de captura para que no abra el menú.

### Página "sobre mí"

`max-w-[65ch]`, back-link con flecha `mt-12 mb-10`; `h1` 30 / 36 px semibold 1.2 `mb-8`; secciones con `mb-20`; `h2` 24 / 30 px `mb-6`; prosa 17 / 18 px 1.7 con `gap-5`. Cierra con el gráfico de contribuciones a `max-w-4xl`, etiquetas en Kode Mono 11 px Tinta al 50 %.

### Footer

`mt-auto pt-28 pb-10`; una línea mono 12 px Tinta al 50 % con filete arriba y `pt-6`.

## 6. Do's and Don'ts

### Sí

- **Los proyectos primero.** Nada se interpone entre el visitante y la lista: el hero de la home son dos líneas y un link.
- **La regla del único efecto.** Un solo efecto memorable, en la fila de proyecto. Si se agrega el "beam", reemplaza al hover actual; no conviven dos firmas.
- **La regla de la tecla visible.** Cada acción con atajo muestra su cap `Kbd` junto a la acción, en la leyenda del menú y en la ayuda `?`. Alternativas como caps separados.
- **La regla del filete.** Estructura con líneas horizontales de 1 px al 8 % (reposo) o 18 % (afirmación). Contenedores cerrados solo cuando flotan sobre un scrim.
- **La regla del verde escaso.** Verde LED para foco, punto de sección activa y hover del nombre. El color de cada proyecto lo trae `--accent`.
- Foco visible siempre, con el anillo estándar de 2 px y offset 2 px sobre Negro de taller.
- Respetar `prefers-reduced-motion` en cada transición y en cada `motion.*`.
- Años y cifras en `tabular-nums`; datos en mono a 12 px y Tinta al 50 %.
- Stack como una sola línea mono separada por `·`.
- Captions debajo del medio, nunca superpuestas.
- Contraste mínimo 4.5:1: Tinta al 50 % es el piso, no hay un escalón más tenue para texto.
- Español e inglés con el mismo nivel de detalle; el toggle de idioma es una tecla (`L`) y un botón.
- Rioplatense directo en la copia: explicar problema, decisión y resultado, sin adornos.

### No

- **Bordes laterales ni acentos de color en el costado** de filas, tarjetas o citas. El acento va en el texto en hover y en un punto de 6 px, nunca en una franja.
- **Texto con gradiente.** Los gradientes existen solo como máscara de legibilidad sobre la imagen del hero.
- **Glassmorphism**: sin `backdrop-blur`, sin superficies translúcidas con borde claro. Los scrims son negro profundo plano.
- **Eyebrows en mayúsculas con tracking** sobre secciones. Las etiquetas van en mono 12 px, minúsculas, Tinta al 50 %. (La única mayúscula es el código de idioma de dos letras.)
- **Marcadores numerados de sección** ("01", "02 / Proyectos"). Las secciones se separan con un filete y, si hace falta, un `h2` de 14 px en Tinta al 66 %.
- **Grillas de tarjetas idénticas.** Los proyectos son filas con filete, con dos jerarquías (destacada y secundaria) que se distinguen por padding y tamaño, no por caja.
- **Rayas largas (em dash) en la copia de interfaz.** Separadores con punto medio `·`, coma o punto.
- Chips de tecnologías en cada fila.
- Sombras en reposo, resplandores fuera del acento en hover, escala en hover fuera de los medios.
- Partículas, scroll pinneado o cualquier sección que exista para lucirse antes que para mostrar un proyecto.
- Biografía antes de los proyectos.
- Métricas grandes de landing; las estadísticas de proyecto son 30 px con filetes, no números héroe.
- Fondos verdes, texto de cuerpo verde, chips verdes.
- Atajos secretos: si la tecla no se muestra, no existe.
- Un segundo radio, una segunda curva de easing o una segunda opacidad de filete. Los valores son 4 px / 6 px, `ease-out-expo` y 8 % / 18 %.
- Cualquier cosa que un visitante pueda identificar como generada por IA a primera vista.
