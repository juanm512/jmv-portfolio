import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

export default function Index({ data, randomIndex }) {
  const cardRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = cardRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX, y: middleY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const colorize = () => {
    cardRef.current.style.backgroundColor = "rgb(248 113 113 / 0.75)"

    setTimeout(() => {
      cardRef.current.style.backgroundColor = "transparent"
    }, 300)
  }

  const { x, y } = position

  return (
    <motion.div
      ref={cardRef}
      animate={{
        x,
        y,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
      }}
      onMouseLeave={reset}
      onMouseMove={handleMouse}
      onMouseEnter={colorize}
      initial={{
        opacity: 0.2,
        scale: 0.2
      }}
      whileInView={{
        opacity: 1,
        scale: 0.98,
        transition: { duration: 1, delay: 0.03 * randomIndex }
      }}
      viewport={{ once: true }}
      className="relative group w-full h-[15vw] md:h-[5vw] p-1 border border-red-400/50 shadow-lg shadow-red-400/70 transition-all"
    >
      <Image
        // src={data.src}
        src={"/languages/brand-nodejs.png"}
        fill
        alt={"agfasbifoaq"}
        // alt={data.text}
        className="w-full aspect-square object-cover opacity-50 group-hover:opacity-100 invert"
      />
      <div className="absolute inset-0 flex flex-col justify-between items-center text-sm opacity-0 group-hover:opacity-100">
        <p>TEXT</p>
        <p>click to COPY</p>
      </div>
    </motion.div>
  )
}
