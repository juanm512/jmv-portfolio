import { motion } from "framer-motion"
import Link from "next/link"

import { blur, translate } from "../../animation"
import { useTranslations } from "next-intl"

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setActiveFalse
}) {
  const t = useTranslations("Header")
  return (
    <div className="flex flex-wrap mt-10">
      {links.map((link, index) => {
        const { title, href } = link
        return (
          <Link
            onClick={setActiveFalse}
            key={`l_${index}`}
            href={href}
            className="text-white uppercase"
          >
            <motion.p
              className="m-0 flex overflow-hidden text-3xl pr-8 md:pr-10 pt-2 font-medium"
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
                  : t("close")
              }
            >
              <motion.span
                custom={[index * 0.05, index * 0.02]}
                variants={translate}
                initial="initial"
                animate="enter"
                exit="exit"
                key={title + index}
              >
                {t(title)}
              </motion.span>
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}
