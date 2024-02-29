"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { height } from "../animation"
import Body from "./Body"
import Footer from "./Footer"
import Image from "./Image"

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.png"
  },
  {
    title: "About me",
    href: "#about_me",
    src: "shop.png"
  },
  {
    title: "My work",
    href: "#my_work",
    src: "home.png"
  },
  {
    title: "Contact",
    href: "#contact",
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
      className="overflow-hidden"
    >
      <div className="flex">
        <div className="mb-0 justify-between">
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
    </motion.div>
  )
}
