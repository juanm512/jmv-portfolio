// The three inline-cover prototypes. One parameter differs: how the cover
// enters the row and what the text does about it.
export const VARIANTS = {
  1: {
    key: "push",
    name: "Empuje",
    diff: "La portada abre una columna a la izquierda y empuja año y texto hacia la derecha; lo que no entra se recorta, nada reflowea.",
  },
  2: {
    key: "compress",
    name: "Compresión",
    diff: "Año y texto no se mueven; la columna de texto se achica para hacer lugar y la descripción pasa de 2 a 1 línea.",
  },
  4: {
    key: "push-right",
    name: "Empuje desde la derecha",
    diff: "La portada entra por el borde derecho, junto a la flecha, y empuja año y texto hacia la izquierda; mismo mecanismo que 01, lado opuesto.",
  },
  3: {
    key: "curtain",
    name: "Cortina",
    diff: "La portada entra por detrás del texto desde la izquierda (clip-path) con un degradado a negro de taller; el contenido no se mueve.",
  },
}
