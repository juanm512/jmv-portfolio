import React from "react";
import { motion } from "framer-motion";

import { IoLogoDiscord, IoLogoGithub, IoLogoLinkedin, IoLogoInstagram, IoChatboxEllipses } from "react-icons/io5";

const FooterAndContact = () => {

  const [width, setWidth] = React.useState(null);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  React.useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const isMobile = width <= 768;


    return(
      <>
      {
       isMobile ? <ContactMobile /> : <ContactMobile />
      }
    
        {/* footer */}
        <div className="flex flex-col w-full bg-white">
          <div className="flex flex-col items-center justify-center px-5 mx-auto lg:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
            <div className="basis-full flex flex-col items-center justify-center lg:flex-grow md:flex md:flex-row md:justify-between gap-8 mx-auto">

            <div className="md:basis-1/3 text-gray-600 text-center">
              <p>
              © 2022 Juan Manuel Vila. All Rights Reserved.
              </p>
            </div>

            <div className="md:basis-1/3 text-gray-600 text-center">
              <p>
                512juanm@gmail.com
              </p>
            </div>

            <div className="md:basis-1/3 flex flex-row justify-center">
                <motion.a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300" aria-label="Reddit"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                    <IoLogoGithub size={25} />
                </motion.a>
                <motion.a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300" aria-label="Facebook"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                    <IoLogoInstagram size={25} />
                </motion.a>
                <motion.a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300" aria-label="Twitter"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                    <IoLogoLinkedin size={25} />
                </motion.a>
                <motion.a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300" aria-label="Twitter"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                    <IoLogoDiscord size={25} />
                </motion.a>
              </div>


            </div>
          </div>
        </div>
      </>
    )
}

export default FooterAndContact;


const ContactDesktop = () => {

  const [contactStatus, setContactStatus] = React.useState("default");

  const handleContactMe = () => {
      //change the status to email with a delay
      setTimeout(() => {
        console.log("email sent");
        setContactStatus("email");
      }, 1800);
  
      //change the status to phone after 2 seconds
      setTimeout(() => {
        setContactStatus("phone");
      }, 4000);
    }
  
    const handleContactMeLeave = () => {
      setTimeout(() => {
        setContactStatus("default")
      }, 5000);
    }
  
    const handleCopyContact = () => {
      navigator.clipboard.writeText(
        contactStatus === "email" ? "512juanm@gmail.com" : "+5492346570764"
      );
      setContactStatus("copied");
    }

  return (
    <div className="flex flex-col w-full show-on-scroll" id="Contact">
      <div className="flex flex-col items-center justify-center px-5 mx-auto md:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
        <div className="basis-full flex items-center flex-row justify-center">
          <div className="relative flex justify-center items-center group cursor-pointer w-64 h-64 my-32 p-8 transition-color duration-[2s] hover:border-palette-400 border-gray-900 border-offset-[96px] "
            onMouseEnter={() => handleContactMe()} onMouseLeave={() => handleContactMeLeave()} onClick={() => handleCopyContact()}>
            {/* border-double border-y-4  */}
            <h2 className="text-7xl font-normal md:text-7xl text-center">
              <button className="text-colored font-semibold ">
                {
                  contactStatus === "copied" ? 
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                    </svg>
                    )
                  :
                    contactStatus === "default" ? 
                      <IoChatboxEllipses className='transition-all group-hover:rotate-[360deg] duration-[1.5s] group-hover:text-palette-400 inline-block ' />
                    :
                      contactStatus === "email" ?
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-palette-400  ">
                          <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>)
                      :
                      (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-palette-400  ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>)
                }



              </button>
            </h2>
            <svg className='absolute top-0 left-0 w-full h-full scale-110 md:scale-150 transition-all duration-[1s] delay-150 group-hover:rotate-[360deg] group-hover:scale-150 md:group-hover:scale-[2.2] ' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" id="curve" d="M 50 100 A 50 50 0 1 1 150 100 A 50 50 0 1 1 50 100 " />
              <text width="500">
                <textPath alignmentBaseline="top" href="#curve">
                {
                  contactStatus === "default" ? 
                    "- CONTACT ME-CONTACT ME-CONTACT ME" 
                  : 
                    contactStatus === "copied" 
                    ? 
                      ("Copied to clipboard-Copied to clipboard" ).toUpperCase()
                    : 
                      contactStatus === "email" 
                        ? 
                        ("Click to copy email - Click to copy - ").toUpperCase()
                        :
                        ("Click to copy phone - Click to copy - ").toUpperCase()
                }
                
                </textPath>
              </text>
            </svg>
          </div>




        </div>
      </div>
    </div>
  )
}


const ContactMobile = () => {
  const handleCopyContact = (contactStatus) => {
    navigator.clipboard.writeText(
      contactStatus === "email" ? "512juanm@gmail.com" : "+5492346570764"
    );
  }
  return (
    <div className="flex flex-col w-full show-on-scroll">
      <div className="flex flex-col items-center justify-center px-5 mx-auto md:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
        <div className="basis-full flex items-center flex-row justify-center">
          <motion.div className="relative flex justify-center items-center group w-64 h-64 my-32 p-8 "
            initial={{ scale: 0.8, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* border-double border-y-4  */}

              <div className="relative text-colored text-7xl font-normal md:text-7xl text-center">
                <motion.div 
                  className=""
                  initial={{ scale: 1, opacity: 1 }}
                  whileInView={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 1, delay: 3 }}
                >
                  <IoChatboxEllipses />
                </motion.div>
                

                {/* botones de copy contact info */}
                <motion.div
                  className="absolute z-50 w-10 h-10"
                  style={{ position: "absolute"}}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  whileInView={{ opacity: 1, y: ['-150%','-75%','-75%'], x: ['-50%','-50%','100%'], scale: [ 1, 1, 1.4] }}
                  transition={{ duration: 3, delay: 3 }}
                >
                  <motion.svg xmlns="http://www.w3.org/2000/svg" onClick={ () => handleCopyContact("email") }
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-10 h-10 bg-palette-200 text-palette-400 rounded-xl p-1 cursor-pointer"
                    whileTap={{ scale: 0.8 , transition: { duration: 0.05, delay: 0.05 } }}
                  >
                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                  </motion.svg>
                </motion.div>
                <motion.div
                  className="absolute z-50 w-10 h-10"
                  style={{ position: "absolute"}}
                  initial={{ opacity: 0, right: "10%", bottom: "-10%" }}
                  whileInView={{ opacity: 1, y: ['-50%','-100%','-100%'], x: ['100%','100%','-100%'], scale: [ 1, 1, 1.4] }}
                  transition={{ duration: 3, delay: 3 }}
                >
                  <motion.svg xmlns="http://www.w3.org/2000/svg" onClick={ () => handleCopyContact("phone") }
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-10 h-10 bg-palette-200 text-palette-400 rounded-xl p-1 cursor-pointer"
                    whileTap={{ scale: 0.8 , transition: { duration: 0.06, delay: 0.05 } }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </motion.svg>
                </motion.div>

                
              </div>

            <motion.svg className='absolute top-0 left-0 w-full h-full scale-150' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <path fill="none" id="curve" d="M 50 100 A 50 50 0 1 1 150 100 A 50 50 0 1 1 50 100 " />
              <text width="500">
                <textPath alignmentBaseline="top" href="#curve">
                  CONTACT ME-CONTACT ME-CONTACT ME
                </textPath>
              </text>
            </motion.svg>
            <motion.svg className='absolute top-0 left-0 w-full h-full scale-150' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 5 }}
            >
              <path fill="none" id="curve" d="M 50 100 A 50 50 0 1 1 150 100 A 50 50 0 1 1 50 100 " />
              <text width="500">
                <textPath alignmentBaseline="top" href="#curve" style={{letterSpacing: "0.25em"}}>
                  TAP TO COPY CONTACT INFO
                </textPath>
              </text>
            </motion.svg>


          </motion.div>




        </div>
      </div>
    </div>
  )
}