import { translate } from "../../animation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("Header")
  return (
    <div className="flex w-full items-end flex-wrap text-md uppercase mt-10 gap-6">
      <ul className="mt-3 overflow-hidden list-none p-0">
        <motion.li
          className="text-white/40 text-sm"
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span>{t("made_by")}</span> Juan Manuel Vila
        </motion.li>
      </ul>
      
    </div>
  )
}
