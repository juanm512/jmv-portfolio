import { motion } from "framer-motion"
import Link from "next/link"

import { blur, translate } from "../../animation"
import { useLocale } from "next-intl"

export default function Body({ links, selectedLink, setSelectedLink }) {
  const lang = useLocale()

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
    <div className="flex flex-col md:flex-row justify-around gap-4 my-16 w-full">
      {links.map((link, index) => {
        const { title, href } = link
        return (
          <Link
            key={`l_${index}`}
            href={href}
            className="uppercase"
          >
            <motion.p
              className={
                "m-0 flex overflow-hidden text-5xl p-2 font-bold " +
                (lang == title.toLowerCase()
                  ? "bg-white text-black "
                  : "text-white ")
              }
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
