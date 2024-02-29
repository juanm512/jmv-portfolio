import { motion } from "framer-motion"

export default function Index({ randomIndex }) {
  return (
    <motion.div
      onMouseEnter={(e) => {
        colorize(e.target)
      }}
      initial={{
        opacity: 0.2,
        scale: 0.2
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { duration: 1, delay: 0.03 * randomIndex }
      }}
      viewport={{ once: true }}
      className="w-full h-[15vw] md:h-[5vw] p-1 border border-red-400/50 shadow transition-colors"
    ></motion.div>
  )
}
const colorize = (el) => {
  el.style.backgroundColor = "rgb(248 113 113 / 0.75)"

  setTimeout(() => {
    el.style.backgroundColor = "transparent"
  }, 300)
}
