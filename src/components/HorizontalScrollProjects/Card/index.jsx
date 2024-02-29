import { motion } from "framer-motion"
import Image from "next/image"

export default function Index({ id, image_src, title, description, langs }) {
  // https://stackoverflow.com/questions/19129644/how-to-pixelate-an-image-with-canvas-and-javascript

  return (
    <motion.div className="group relative w-[45vh] md:w-[50vh] h-[60vh] bg-black/50 backdrop-blur-md overflow-hidden shadow-lg shadow-transparent hover:shadow-red-500/70 hover:brightness-105">
      <Image
        src={"/Landing.png"}
        fill
        loading="lazy"
        className="object-cover transition-all duration-300 ease-in object-center"
      />
      <div className="absolute w-full h-full flex flex-col justify-between p-4 md:p-8 ">
        <div className="w-full flex flex-row">
          <h3 className="basis-11/12 uppercase text-left text-base md:text-xl group-hover:underline group-hover:cursor-pointer">
            TITLE HERE. TITLE HERE. TITLE HERE. TITLE HERE. TITLE HERE. TITLE
            HERE.
          </h3>
          <div className="basis-1/12 h-full mt-[15vh] flex flex-col items-end justify-start gap-2 ">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
          </div>
        </div>
        <button className="w-fit ml-auto uppercase text-base font-semibold py-2 px-4 ring-0 backdrop-blur-sm group-hover:ring-2 ring-white transition-all duration-200 ease-in-out hover:bg-white hover:text-black">
          VIEW MORE -{">"}
        </button>
      </div>
    </motion.div>
  )
}
