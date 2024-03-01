import { translate } from "../../animation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("Header")
  return (
    <div className="flex items-end flex-wrap text-md uppercase mt-10">
      <ul className="w-1/2 mt-3 overflow-hidden list-none p-0">
        <motion.li
          className="text-slate-700"
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span>{t("made_by")}</span> Juan Manuel Vila
        </motion.li>
      </ul>
      <ul>
        <motion.li
          className="text-slate-700"
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span>{t("typography")}</span> Kode Mono
        </motion.li>
      </ul>
      {/* 
        ACA CAPAZ LAS REDES AGAIN
      <ul>
        <motion.li
          className="text-slate-700"
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Privacy Policy
        </motion.li>
        <motion.li
          className="text-slate-700"
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Terms & Conditions
        </motion.li>
      </ul> */}
    </div>
  )
}
