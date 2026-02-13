"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { height } from "../animation"
import Body from "./Body"

const links = [
  {
    title: "ES",
    href: "/es"
  },
  {
    title: "EN",
    href: "/en"
  }
]

export default function Index() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0
  })

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden mt-3"
    >
      <div
        role="navigation"
        aria-label="Language selection"
        className="rounded-2xl bg-background-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-6 flex flex-row justify-evenly"
      >
        <div className="flex">
          <div className="mb-0 justify-between">
            <Body
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
