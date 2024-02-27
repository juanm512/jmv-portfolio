import Image from "next/future/image"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import data from "../data.json"

import {
  IoLogoGithub,
  IoGlobe,
  IoCheckmarkCircleOutline
} from "react-icons/io5"

const ProyectsList = () => {
  const { proyects } = data
  const [currentImage, setCurrentImage] = useState(null)
  const [activeID, setActiveID] = useState(null)

  return (
    <>
      {currentImage && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-y-auto py-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* <div
                className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-3/4 h-fit rounded-lg shadow-lg mt-32"
                // initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              > */}
          <div className="w-11/12 md:w-2/4 h-fit relative">
            <Image
              src={"/" + currentImage}
              alt={currentImage}
              width={400}
              height={400}
              layout="fill"
              objectFit="contain"
              className="rounded-lg w-full h-full"
            />
            <button
              className="absolute top-2 right-2 text-2xl text-white bg-black bg-opacity-50 rounded-full px-4 py-2"
              onClick={() => setCurrentImage(null)}
            >
              X
            </button>
          </div>
          {/* </div> */}
        </motion.div>
      )}

      <motion.div
        className="flex flex-col w-full bg-white"
        id="Projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-center px-5 mx-auto lg:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
          <div className="basis-full flex flex-col items-center justify-center text-center lg:flex-grow md:flex md:flex-col md:justify-center">
            <h1 className="basis-full my-4 text-2xl font-normal text-gray-900 md:text-5xl border-b-2 border-palette-400">
              My Proyects
            </h1>

            <div className="basis-full grid grid-cols-1 md:grid-cols-3 justify-around gap-8 py-20">
              {proyects.map((proyect, index) =>
                activeID !== null && activeID === proyect.id ? (
                  <ProyectActive
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    proyect={proyect}
                    index={index}
                    key={index}
                    activeID={activeID}
                    setActiveID={setActiveID}
                  />
                ) : (
                  <ProyectCard
                    proyect={proyect}
                    index={index}
                    key={index}
                    activeID={activeID}
                    setActiveID={setActiveID}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProyectsList

const ProyectCard = ({ proyect, index, activeID, setActiveID }) => {
  return (
    <motion.div
      layout
      key={proyect.title}
      className={
        "group overflow-hidden transition-opacity" +
        (activeID !== null && activeID === proyect.id
          ? " md:col-span-3 opacity-100"
          : " opacity-50 hover:opacity-100")
      }
    >
      <motion.div
        onClick={() => setActiveID(proyect.id)}
        className={
          " transition-all duration-500 transform cursor-pointer" +
          (activeID !== null && activeID === proyect.id
            ? "grayscale-0"
            : " grayscale group-hover:grayscale-0 ")
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Image
          src={"/" + proyect.images[0]}
          alt={proyect.title}
          width={400}
          height={400}
          className="object-center object-cover w-full h-64"
          // className="object-cover w-full h-64 transition-all duration-1000 transform group-hover:scale-110 grayscale group-hover:grayscale-0 cursor-pointer"
        />
      </motion.div>
      <div className="flex justify-start pt-8 pb-0">
        {proyect.languages.map((lang, i) => (
          <span
            key={i}
            className="inline-block bg-gray-200 rounded-sm px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-500 delay-100 mr-2 mb-2"
          >
            {lang}
          </span>
        ))}
      </div>
      <div className=" py-2">
        <button
          className="w-full flex justify-start "
          onClick={() => setActiveID(proyect.id)}
        >
          <motion.h2
            className="w-full flex justify-start text-left font-bold text-xl mb-2 text-gray-800 transition-all cursor-pointer duration-500 delay-100 hover:underline"
            layoutId={"ProyectTitle-" + proyect.id}
          >
            {proyect.name}
          </motion.h2>
        </button>
      </div>
    </motion.div>
  )
}

const ProyectActive = ({ proyect, currentImage, setCurrentImage }) => {
  const [width, setWidth] = useState(0)
  const carousel = useRef()

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  // const handleNextImage = () => {
  //     if(currentImage < proyect.images.length - 1){
  //         setCurrentImage(currentImage + 1);
  //     }else{
  //         setCurrentImage(0);
  //     }
  // }

  // const handlePrevImage = () => {
  //     if(currentImage > 0){
  //         setCurrentImage(currentImage - 1);
  //     }else{
  //         setCurrentImage(proyect.images.length - 1);
  //     }
  // }

  return (
    <motion.div
      layout
      class=" md:col-span-3 opacity-100 flex flex-col w-full bg-white"
      id="ProyectActive"
    >
      <div class="flex flex-col items-center justify-center mx-auto lg:w-12/12 md:flex-row py-12">
        <div class="basis-full flex flex-col items-center justify-center text-center lg:flex-grow md:flex md:flex-col md:justify-center">
          <div class="relative flex flex-col w-full items-center">
            <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8 lg:py-10 sm:pt-8">
              <div class="col-span-12 flex flex-row justify-center ">
                {/* 
                        <motion.div 
                            class="w-full basis-2/12 md:basis-3/12 h-56 col-span-12 my-auto cursor-pointer z-0"
                            onClick={ () => handlePrevImage() } 
                            layoutId={ "ProyectIMGActive-"+ index - 1 < 0 ? proyect.images.length - 1 : index - 1 }
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            initial={{ opacity: 0.5, filter: 'blur(10px)', width: '50%', height: '100%' }}
                            animate={{ opacity: 1, filter: 'blur(2px)', width: '80%', height: '100%' }}
                            transition={{ delay: 0.5, duration: 2 }}
                        >
                            <Image
                            src={ "/" + proyect.images[( currentImage-1 < 0 ) ? proyect.images.length - 1 : currentImage-1]}
                            alt={proyect.title}
                            width={800}
                            height={200}
                            layout="fill"
                            className="object-cover object-center w-full h-56"
                            hover={{ scale: 1.1 }}
                            />
                        </motion.div>
                        <motion.div 
                            class="w-full basis-8/12 md:basis-6/12 h-80 col-span-12 shadow-2xl border-2 border-gray-300 z-10" 
                            layoutId={ "ProyectIMGActive-"+index}
                            initial={{ opacity: 0.5, filter: 'blur(10px)', width: '20%', height: '100%' }}
                            animate={{ opacity: 1, filter: 'blur(0px)', width: '100%', height: '100%' }}
                            transition={{ delay: 0.5, duration: 2 }}
                        >
                            <Image
                            src={ "/" + proyect.images[currentImage]}
                            alt={proyect.title}
                            width={800}
                            height={200}
                            layout="fill"
                            className="object-center object-cover h-64 md:h-80 w-full "
                            hover={{ scale: 1.1 }}
                            />
                        </motion.div>
                        <motion.div 
                            class="w-full basis-2/12 md:basis-3/12 h-56 col-span-12 my-auto cursor-pointer z-0"
                            onClick={ () => handleNextImage() } 
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            layoutId={ "ProyectIMGActive-"+currentImage + 1 > proyect.images.length - 1 ? 0 : currentImage + 1}
                            initial={{ opacity: 0.5, filter: 'blur(10px)', width: '50%', height: '100%' }}
                            animate={{ opacity: 1, filter: 'blur(2px)', width: '80%', height: '100%' }}
                            transition={{ delay: 0.5, duration: 2 }}
                        >
                            <Image
                            src={ "/" + proyect.images[currentImage + 1 > proyect.images.length - 1 ? 0 : currentImage + 1]}
                            alt={proyect.title}
                            width={800}
                            height={200}
                            layout="fill"
                            className="object-cover object-center w-full h-56"
                            hover={{ scale: 1.1 }}
                            />
                        </motion.div> */}
                <motion.div
                  ref={carousel}
                  className="carousel overflow-hidden"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                    className="inner-carousel flex flex-row flex-nowrap cursor-grab gap-0 md:gap-12"
                  >
                    {proyect.images.map((image, i) => {
                      return (
                        <AnimatePresence key={i}>
                          <motion.div
                            key={image + i}
                            className="item min-w-[80%] md:min-w-[33%] h-80"
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            whileTap={{
                              scale: 0.8,
                              transition: { duration: 0.2 }
                            }}
                            whileInView={{
                              scale: 0.9,
                              opacity: 1,
                              transition: { duration: 0.8 }
                            }}
                            whileHover={{
                              scale: 1,
                              transition: { duration: 0.2 }
                            }}
                            viewport={{ margin: "-50px" }}
                            exit={{
                              scale: 0.8,
                              opacity: 0.5,
                              transition: { duration: 0.8 }
                            }}
                            onTap={() => setCurrentImage(image)}
                          >
                            <Image
                              src={"/" + image}
                              alt={proyect.title + image + i}
                              width={800}
                              height={200}
                              layout="fill"
                              className="object-cover object-center w-full h-full pointer-events-none"
                              hover={{ scale: 1.1 }}
                            />
                          </motion.div>
                        </AnimatePresence>
                      )
                    })}
                  </motion.div>
                </motion.div>
              </div>

              {/* create pagination dots */}
              {/* <div class="col-span-12 flex flex-row justify-center">
                        <motion.div class="flex flex-row justify-center"
                            initial={{ opacity: 0.5, filter: 'blur(2px)', width: '0%', height: '100%' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)', width: '100%', height: '100%' }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            {
                                proyect.images.map( (img, i) => (
                                
                                    // (<motion.div key={i} layoutId={ "ProyectIMGPaginationDotActive"} class="w-2 h-2 bg-gray-900 rounded-full mx-1"></motion.div>)
                                    
                                    <motion.div key={i} class="w-4 h-2 bg-gray-300 hover:bg-slate-500 rounded-full mx-1 cursor-pointer" onClick={ () => setCurrentImage(i) }>
                                        {currentImage === i 
                                        ?
                                        <motion.div 
                                            layoutId={ "ProyectIMGPaginationDotActive"} 
                                            class="bg-slate-500 rounded-full"
                                            initial={{ width: '100%', height: '50%' }}
                                            animate={{ width: [ '100%', '200%', '100%'], height: '100%' }}
                                            transition={{ delay: 0.3, duration: 0.8 }}
                                        ></motion.div>
                                        :
                                        null
                                        }
                                    </motion.div>
                                
                                ))
                            }
                        </motion.div>
                    </div> */}

              <div class="col-span-12 lg:col-span-8 flex flex-col">
                <motion.h2
                  class="text-3xl md:text-7xl font-bold text-palette-500 sm:pr-12 text-left basis-full break-words"
                  layoutId={"ProyectTitle-" + proyect.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {proyect.name}
                </motion.h2>

                {/* here goes the status of the proyect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  class="flex justify-start pt-5 pb-0 basis-full"
                >
                  <span
                    class={`inline-block rounded-sm px-3 py-1 text-sm font-semibold mr-2 mb-2 `}
                    style={{ backgroundColor: proyect.status.color }}
                  >
                    {proyect.status.text}
                  </span>
                </motion.div>

                <section
                  aria-labelledby="information-heading"
                  class="flex justify-start pt-5 pb-0 basis-full"
                >
                  <h3
                    id="information-heading"
                    class="sr-only"
                  >
                    Proyects description
                  </h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    class="mt-8 space-y-6"
                  >
                    <p class="text-lg font-medium text-gray-900 text-left font-amiri">
                      {proyect.description}
                    </p>
                  </motion.div>
                </section>

                {/* put links to github and the website if is deployed */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  class="mt-12 flex flex-row justify-start "
                >
                  {proyect.github ? (
                    <a
                      rel="noreferrer"
                      href={proyect.github}
                      target="_blank"
                      class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-palette-100 bg-gray-900 hover:bg-gray-700 hover:underline hover:cursor-pointer"
                    >
                      Github repo
                      <IoLogoGithub
                        class="ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-palette-100 bg-gray-900 hover:bg-gray-700 hover:underline hover:cursor-pointer">
                      No repo/Private
                      <IoLogoGithub
                        class="ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                  {proyect.website && (
                    <a
                      rel="noreferrer"
                      href={proyect.website}
                      target="_blank"
                      class="ml-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-palette-100 bg-gray-900 hover:bg-gray-700 hover:underline hover:cursor-pointer"
                    >
                      Website
                      <IoGlobe
                        class="ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                class="col-span-12 lg:col-span-4 gap-y-2 flex flex-row flex-wrap justify-between"
              >
                <div class="mt-0 space-y-1">
                  <h2 class="text-2xl font-bold text-gray-900 sm:pr-12 text-left">
                    Technologies
                  </h2>
                  <div class="mt-2 space-y-6">
                    <ul class="text-lg font-medium text-gray-900">
                      {proyect.languages.map((tech, index) => (
                        <li
                          key={index}
                          class="flex flex-row items-center font-amiri"
                        >
                          <IoCheckmarkCircleOutline
                            class="h-5 w-5 text-palette-500"
                            aria-hidden="true"
                          />
                          <span class="ml-2">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div class="mt-0 space-y-1">
                  <h2 class="text-2xl font-bold text-gray-900 sm:pr-12 text-left">
                    Some libraries
                  </h2>
                  <div class="mt-2 space-y-6">
                    <ul class="text-lg font-medium text-gray-900">
                      {proyect.libraries.map((tech, index) => (
                        <li
                          key={index}
                          class="flex flex-row items-center font-amiri"
                        >
                          <IoCheckmarkCircleOutline
                            class="h-5 w-5 text-palette-500"
                            aria-hidden="true"
                          />
                          <span class="ml-2">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div class="mt-0 space-y-1">
                  <h2 class="text-2xl font-bold text-gray-900 sm:pr-12 text-left">
                    Database and hosting
                  </h2>
                  <div class="mt-2 space-y-6">
                    <ul class="text-lg font-medium text-gray-900">
                      {proyect.databasesAndHosting.map((tech, index) => (
                        <li
                          key={index}
                          class="flex flex-row items-center font-amiri"
                        >
                          <IoCheckmarkCircleOutline
                            class="h-5 w-5 text-palette-500"
                            aria-hidden="true"
                          />
                          <span class="ml-2">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// const ProyectsList = ({ proyectId = null }) => {
//   return (
//       <motion.div className="flex flex-col w-full bg-white" id="ProyectsList"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ delay: 0.5 }}
//       viewport={{ once: true }}>
//           <div className="flex flex-col items-center justify-center px-5 mx-auto lg:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
//           <div className="basis-full flex flex-col items-center justify-center text-center lg:flex-grow md:flex md:flex-col md:justify-center">
//               <h1 className="my-4 text-2xl font-normal text-gray-900 md:text-5xl border-b-2 border-palette-400">My Proyects</h1>

//               <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 py-20">
//               {
//                   data.proyects.map((proyect, index) => (
//                   <div key={index} id={"proyect-"+proyect.id} className={"group overflow-hidden transition-opacity hover:opacity-100 " + ( (proyectId !== null && proyectId === proyect.id) ? "invisible" : " opacity-70") }>
//                       <Link href={"/"+proyect.id} >
//                           <motion.div
//                               // className={( (proyectId !== null && proyectId === proyect.id) ? "invisible" : " visible")}
//                               // layoutId={ "ProyectIMG-"}
//                               // initial={{ opacity: 0, scale: 0.9 }}
//                               // animate={{ opacity: 1, scale: 1 }}
//                               // transition={{ delay: 0.5 }}
//                            >
//                               <Image
//                                   src="/donateloImg.png"
//                                   alt={proyect.title} width={400} height={400}
//                                   layout="fill"
//                                   className="object-center  object-cover w-full h-64 transition-all duration-1000 transform group-hover:scale-110 grayscale group-hover:grayscale-0 cursor-pointer"
//                               />
//                           </motion.div>
//                       {/* <Image
//                       layoutId={proyect.id}
//                       width={400} height={400} className="object-cover w-full h-64 transition-all duration-1000 transform group-hover:scale-110 grayscale group-hover:grayscale-0 cursor-pointer"
//                       src="/donateloImg.png" alt={proyect.title} /> */}
//                       {/* <Image width={400} height={400} className="w-full transition-all grayscale group-hover:grayscale-0 duration-200 delay-100 scale-90 bg-slate-600" src="/donateloImg.png" alt="Sunset in the mountains" /> */}
//                       </Link>
//                       <div className="flex justify-start  pt-8 pb-0">
//                       {
//                           proyect.languages.map( (lang, i ) =>(
//                           <span key={i} className="inline-block bg-gray-200 rounded-sm px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-500  opacity-50 group-hover:opacity-100 delay-100 mr-2 mb-2">
//                               {lang}
//                           </span>
//                           ))
//                       }
//                       </div>
//                       <div className=" py-2">
//                       <Link href={"/"+proyect.id} className="w-full flex justify-start " >
//                           <motion.h2
//                           className="w-full flex justify-start text-left font-bold text-xl mb-2 text-gray-800 transition-all cursor-pointer duration-500 delay-100 hover:underline opacity-50 group-hover:opacity-100"
//                           // layoutId={ "ProyectTitle-" + proyect.id}
//                           >
//                           {proyect.name}
//                           </motion.h2>
//                       </Link>
//                       {/* <p className="text-gray-700 text-base h-24 overflow-y-hidden ">
//                           {proyect.description}
//                       </p>*/}
//                       </div>

//                   </div>

//                   ))
//               }

//               </div>
//           </div>
//           </div>
//     </motion.div>
//   )
// }

// export default ProyectsList;
