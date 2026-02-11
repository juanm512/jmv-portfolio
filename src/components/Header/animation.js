const transition = { duration: 0.5, ease: [0.76, 0, 0.24, 1] }

export const opacity = {
  initial: {
    opacity: 0,
    y: "-100%"
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.15, ease: "easeIn" }
  }
}

export const height = {
  initial: {
    height: 0
  },
  enter: {
    height: "auto",
    transition
  },
  exit: {
    height: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
  }
}

export const background = {
  initial: {
    scaleY: 0,
    transformOrigin: "top"
  },
  open: {
    scaleY: 1,
    transformOrigin: "top",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
  }
}

export const blur = {
  initial: {
    filter: "blur(0px)",
    opacity: 1
  },
  open: {
    filter: "blur(4px)",
    opacity: 0.6,
    transition: { duration: 0.2 }
  },
  closed: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.15 }
  }
}

export const translate = {
  initial: {
    y: "100%",
    opacity: 0
  },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: i[0] * 0.3 }
  }),
  exit: (i) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1], delay: i[1] * 0.1 }
  })
}
