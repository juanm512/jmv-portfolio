"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { height } from "../animation"
import Body from "./Body"
import Footer from "./Footer"
import Image from "./Image"

const links = [
  {
    title: "home",
    href: "/",
    src: "home.png"
  },
  {
    title: "about_me",
    href: "/#about_me",
    src: "shop.png"
  },
  {
    title: "my_work",
    href: "/#my_work",
    src: "home.png"
  },
  {
    title: "contact",
    href: "/#contact",
    src: "lookbook.png"
  }
]

export default function Index({ setActiveFalse }) {
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
      <nav
        role="navigation"
        aria-label="Main menu"
        className="rounded-2xl bg-background-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-6"
      >
        <div className="flex">
          <div className="mb-0 justify-between flex-1">
            <Body
              setActiveFalse={setActiveFalse}
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
            <Footer />
          </div>
          <Image
            src={links[selectedLink.index].src}
            selectedLink={selectedLink}
          />
        </div>
      </nav>
    </motion.div>
  )
}
