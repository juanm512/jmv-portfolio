export const slideUp = {
  initial: {
    opacity: 0,
    y: 300
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 }
  }
}
