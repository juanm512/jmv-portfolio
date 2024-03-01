import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"

// https://stackoverflow.com/questions/19129644/how-to-pixelate-an-image-with-canvas-and-javascript
export default function Index({ data }) {
  const t = useTranslations("Projects")
  const { id, title, image, languages } = data

  const router = useRouter()

  const handleRouting = () => {
    setTimeout(() => {
      router.push("/" + id)
    }, 100)
  }

  return (
    <motion.div className="group relative w-[45vh] md:w-[50vh] h-[60vh] bg-black/50 backdrop-blur-md overflow-hidden shadow-lg shadow-transparent hover:shadow-red-500/70 hover:brightness-105">
      <Image
        src={"/" + image}
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={title}
        loading="lazy"
        className="object-cover w-full h-full transition-all duration-300 ease-in object-center scale-125 group-hover:scale-100"
      />
      <div className="absolute w-full h-full flex flex-col justify-between p-4 md:p-8 ">
        <div className="w-full flex flex-row">
          <h3
            onClick={handleRouting}
            style={{
              textShadow: "rgb(239 68 68 / 0.7) 1px 1px"
            }}
            className="basis-11/12 h-fit uppercase text-left text-base md:text-xl group-hover:underline group-hover:cursor-pointer"
          >
            {title}
          </h3>
          <div className="relative basis-1/12 h-full mt-[15vh] flex flex-col items-end justify-start gap-2">
            {languages.map((lang, index) => (
              <span
                key={index}
                className="relative w-full aspect-square invert"
              >
                <Image
                  src={images_srcs[lang]}
                  fill={true}
                  sizes={"5vw"}
                  alt={lang}
                  loading="lazy"
                  className="object-scale-down w-full h-8 aspect-square object-center drop-shadow-lg"
                />
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleRouting}
          className="w-fit ml-auto uppercase text-base font-semibold py-2 px-4 ring-0 group-hover:ring-2 ring-white transition-all duration-200 ease-in-out hover:bg-white hover:text-black"
        >
          {t("view_more")} -{">"}
        </button>
      </div>
    </motion.div>
  )
}

const images_srcs = {
  JavaScript: "/languages/brand-javascript.png",
  "Node.js": "/languages/brand-nodejs.png",
  React: "/languages/brand-react.png",
  "Next.js": "/languages/brand-nextjs.png",
  MySQL: "/languages/brand-mysql.png",
  MongoDB: "/languages/brand-mongodb.png",
  threejs: "/languages/brand-threejs.png",
  "framer-motion": "/languages/brand-framer-motion.png",
  tailwindcss: "/languages/brand-tailwind.png"
}
