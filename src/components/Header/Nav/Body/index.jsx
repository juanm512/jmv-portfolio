import { motion } from "framer-motion"
import Link from "next/link"

import { blur, translate } from "../../animation"

export default function Body({ links, selectedLink, setSelectedLink }) {
  const getChars = (word) => {
    let chars = []
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      )
    })
    return chars
  }

  return (
    <div className="flex flex-wrap mt-10">
      {links.map((link, index) => {
        const { title, href } = link
        return (
          <Link
            key={`l_${index}`}
            href={href}
            className="text-white uppercase"
          >
            <motion.p
              className="m-0 flex overflow-hidden text-3xl pr-7 pt-2 font-medium"
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index })
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index })
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index != index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}
