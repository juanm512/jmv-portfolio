import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { opacity } from "../../animation"

export default function Index({ src, isActive }) {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className="block relative"
    >
      <Image
        src={`/images/${src}`}
        fill={true}
        alt="image"
        className=" object-cover"
      />
    </motion.div>
  )
}
