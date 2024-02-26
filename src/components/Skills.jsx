import { motion } from 'framer-motion';
import Image from 'next/image';

import { IoLogoJavascript, IoLogoNodejs, IoLogoReact, IoLogoHtml5, IoLogoCss3 } from 'react-icons/io5';
import { SiMongodb, SiNextdotjs } from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import { BsStar } from 'react-icons/bs';
import { TbBrandNextjs } from 'react-icons/tb';
import { FiHexagon } from 'react-icons/fi';

const Skills = () => {
    return (
        <motion.div className="flex flex-col w-full bg-white" id="Skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        >
        <div className="flex flex-col items-center justify-center px-5 mx-auto lg:w-11/12 lg:px-10 md:flex-row py-20 border-t border-gray-700">
          <div className="basis-full flex flex-col items-center justify-center text-center lg:flex-grow md:flex md:flex-col md:justify-center">
            <h1 className="my-4 text-2xl font-normal text-gray-900 md:text-5xl dark:text-white border-b-2 border-palette-400">My Knowledge</h1>
            
            <div className="hidden md:flex flex-row justify-center md:gap-12 flex-wrap py-20">
              <DesktopSkills />
            </div>
            <div className="flex flex-row justify-center gap-y-16 gap-x-6 flex-wrap py-20 md:hidden">
              <MobileSkills />
            </div>
          
          </div>
        </div>
      </motion.div>
    )
}

export default Skills;


const DesktopSkills = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center gap-0 ">
          <div className='relative group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#3178C640] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
            <IoLogoHtml5 size={55} color="#3178C6" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110' />
            <p className="text-base font-semibold group-hover:text-[#3178C6] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">HTML</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group overflow-hidden  flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <IoLogoCss3 size={55} color="#264DE4" className=' transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
          <p className=" text-base font-semibold group-hover:text-[#264DE4] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">CSS</p>
          <motion.svg 
              className='absolute -z-10 opacity-0 transition-all duration-[2sa] group-hover:opacity-100  group-hover:scale-110'
              width="100" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <motion.line stroke="#264DE440" strokeWidth="3" className=""
                initial={{ opacity: 0, x1: 0, y1: 0, x2: 100, y2: 0 }}
                animate={{ opacity: 1, x1: 0, y1: 0, x2: 100, y2: 0 }}
                transition={{ duration: 2.1, delay:0.2 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 20, y: 0 }}
                animate={{ opacity: 1, x: 70, y: 0, transition:{ duration: 2.7, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
              <motion.line stroke="#264DE440" strokeWidth="2" className=""
                initial={{ opacity: 0, x1: 0, y1: 50, x2: 0, y2: 50 }}
                animate={{ opacity: 1, x1: 0, y1: 50, x2: 100, y2: 50 }}
                transition={{ duration: 2.7, delay:0.5 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 20, y: 50 }}
                animate={{ opacity: 1, x: 80, y: 50, transition:{ duration: 1.5, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
              <motion.line stroke="#264DE440" strokeWidth="3" className=""
                initial={{ opacity: 0, x1: 0, y1: 100, x2: 0, y2: 100 }}
                animate={{ opacity: 1, x1: 0, y1: 100, x2: 100, y2: 100 }}
                transition={{ duration: 2.3, delay:0.5 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 80, y: 100 }}
                animate={{ opacity: 1, x: 30, y: 100, transition:{ duration: 2.1, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
            </motion.svg>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#F7DF1E40] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <IoLogoJavascript size={55} color="#F7DF1E" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
          <p className="text-base font-semibold group-hover:text-[#F7DF1E] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">Javascript</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div 
            className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <IoLogoReact size={55} color="#61DAFB" className='transition-all duration-1000 group-hover:-translate-y-[20%] group-hover:scale-150 group-hover:rotate-[360deg]' />
          <p className="text-base font-semibold group-hover:text-[#61DAFB] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">React</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#33993340] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <IoLogoNodejs size={55} color="#339933" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
          <p className="text-base font-semibold group-hover:text-[#339933] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">NodeJS</p>
          <svg className='absolute scale-90 -z-10 -top-10 left-[-50%] transition-all duration-[3s] opacity-0 group-hover:opacity-100 group-hover:-top-[80%]'
          xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.com/svgjs" width="800" height="800" preserveAspectRatio="none" viewBox="0 0 500 500">
              <g mask="url(&quot;#SvgjsMask1106&quot;)" fill="none">
                  <path d="M0 0 " stroke="#33993350" strokeWidth="3"></path>
                  <path d="M0 -46L39.84 -23L39.84 23L0 46L-39.84 23L-39.84 -23zM39.84 23L79.68 46L79.68 92L39.84 115L0 92L0 46zM0 92L39.84 115L39.84 161L0 184L-39.84 161L-39.84 115zM39.84 161L79.68 184L79.68 230L39.84 253L0 230L0 184zM0 230L39.84 253L39.84 299L0 322L-39.84 299L-39.84 253zM39.84 299L79.68 322L79.68 368L39.84 391L0 368L0 322zM0 368L39.84 391L39.84 437L0 460L-39.84 437L-39.84 391zM39.84 437L79.68 460L79.68 506L39.84 529L0 506L0 460zM79.68 -46L119.51 -23L119.51 23L79.68 46L39.84 23L39.84 -23zM119.51 23L159.35 46L159.35 92L119.51 115L79.68 92L79.68 46zM79.68 92L119.51 115L119.51 161L79.68 184L39.84 161L39.84 115zM119.51 161L159.35 184L159.35 230L119.51 253L79.68 230L79.68 184zM79.68 230L119.51 253L119.51 299L79.68 322L39.84 299L39.84 253zM119.51 299L159.35 322L159.35 368L119.51 391L79.68 368L79.68 322zM79.68 368L119.51 391L119.51 437L79.68 460L39.84 437L39.84 391zM119.51 437L159.35 460L159.35 506L119.51 529L79.68 506L79.68 460zM159.35 -46L199.19 -23L199.19 23L159.35 46L119.51 23L119.51 -23zM199.19 23L239.03 46L239.03 92L199.19 115L159.35 92L159.35 46zM159.35 92L199.19 115L199.19 161L159.35 184L119.51 161L119.51 115zM199.19 161L239.03 184L239.03 230L199.19 253L159.35 230L159.35 184zM159.35 230L199.19 253L199.19 299L159.35 322L119.51 299L119.51 253zM199.19 299L239.03 322L239.03 368L199.19 391L159.35 368L159.35 322zM159.35 368L199.19 391L199.19 437L159.35 460L119.51 437L119.51 391zM199.19 437L239.03 460L239.03 506L199.19 529L159.35 506L159.35 460zM239.03 -46L278.87 -23L278.87 23L239.03 46L199.19 23L199.19 -23zM278.87 23L318.71 46L318.71 92L278.87 115L239.03 92L239.03 46zM239.03 92L278.87 115L278.87 161L239.03 184L199.19 161L199.19 115zM278.87 161L318.71 184L318.71 230L278.87 253L239.03 230L239.03 184zM239.03 230L278.87 253L278.87 299L239.03 322L199.19 299L199.19 253zM278.87 299L318.71 322L318.71 368L278.87 391L239.03 368L239.03 322zM239.03 368L278.87 391L278.87 437L239.03 460L199.19 437L199.19 391zM278.87 437L318.71 460L318.71 506L278.87 529L239.03 506L239.03 460zM318.71 -46L358.54 -23L358.54 23L318.71 46L278.87 23L278.87 -23zM358.54 23L398.38 46L398.38 92L358.54 115L318.71 92L318.71 46zM318.71 92L358.54 115L358.54 161L318.71 184L278.87 161L278.87 115zM358.54 161L398.38 184L398.38 230L358.54 253L318.71 230L318.71 184zM318.71 230L358.54 253L358.54 299L318.71 322L278.87 299L278.87 253zM358.54 299L398.38 322L398.38 368L358.54 391L318.71 368L318.71 322zM318.71 368L358.54 391L358.54 437L318.71 460L278.87 437L278.87 391zM358.54 437L398.38 460L398.38 506L358.54 529L318.71 506L318.71 460zM398.38 -46L438.22 -23L438.22 23L398.38 46L358.54 23L358.54 -23zM438.22 23L478.06 46L478.06 92L438.22 115L398.38 92L398.38 46zM398.38 92L438.22 115L438.22 161L398.38 184L358.54 161L358.54 115zM438.22 161L478.06 184L478.06 230L438.22 253L398.38 230L398.38 184zM398.38 230L438.22 253L438.22 299L398.38 322L358.54 299L358.54 253zM438.22 299L478.06 322L478.06 368L438.22 391L398.38 368L398.38 322zM398.38 368L438.22 391L438.22 437L398.38 460L358.54 437L358.54 391zM438.22 437L478.06 460L478.06 506L438.22 529L398.38 506L398.38 460zM478.06 -46L517.9 -23L517.9 23L478.06 46L438.22 23L438.22 -23zM517.9 23L557.74 46L557.74 92L517.9 115L478.06 92L478.06 46zM478.06 92L517.9 115L517.9 161L478.06 184L438.22 161L438.22 115zM517.9 161L557.74 184L557.74 230L517.9 253L478.06 230L478.06 184zM478.06 230L517.9 253L517.9 299L478.06 322L438.22 299L438.22 253zM517.9 299L557.74 322L557.74 368L517.9 391L478.06 368L478.06 322zM478.06 368L517.9 391L517.9 437L478.06 460L438.22 437L438.22 391zM517.9 437L557.74 460L557.74 506L517.9 529L478.06 506L478.06 460z" stroke="#33993350" strokeWidth="5"></path>
              </g>
              <defs>
                  <mask id="SvgjsMask1106">
                      <rect width="300" height="300" fill="#ffffff"></rect>
                  </mask>
              </defs>
          </svg>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#3776AB40] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <SiNextdotjs size={55} color="#3776AB" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-150 ' />
          <p className="text-base font-semibold group-hover:text-[#3776AB] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">NextJS</p>
          <BsStar size={55} color="#3776AB" className='absolute brightness-100 -z-10 -translate-y-[400%] -translate-x-[70%] rotate-45 scale-50 transition-all duration-[2s] delay-200 group-hover:translate-y-[420%] group-hover:translate-x-[70%] group-hover:-rotate-90 group-hover:scale-[1]' />
          <BsStar size={55} color="#3776AB" className='absolute brightness-100 -z-10 -translate-y-[400%] -translate-x-[10%] rotate-45 scale-50 transition-all duration-[2.4s] delay-200 group-hover:translate-y-[430%] group-hover:translate-x-[10%] group-hover:-rotate-90 group-hover:scale-[1]' />
          <BsStar size={55} color="#3776AB" className='absolute brightness-100 -z-10 -translate-y-[400%] translate-x-[70%] rotate-45 scale-50 transition-all duration-[2.1s] delay-300 group-hover:translate-y-[410%] group-hover:-translate-x-[60%] group-hover:-rotate-90 group-hover:scale-[1]' />
          <BsStar size={55} color="#3776AB" className='absolute brightness-100 -z-10 -translate-y-[400%] translate-x-[100%] rotate-45 scale-50 transition-all duration-[3s] delay-150 group-hover:translate-y-[420%] group-hover:translate-x-[150%] group-hover:-rotate-90 group-hover:scale-[1]' />
          <BsStar size={55} color="#3776AB" className='absolute brightness-100 -z-10 -translate-y-[400%] -translate-x-[100%] rotate-45 scale-50 transition-all duration-[1.6s] delay-100 group-hover:translate-y-[430%] group-hover:-translate-x-[120%] group-hover:-rotate-90 group-hover:scale-[1]' />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <GrMysql size={55} color="#4479A1" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
          <p className="text-base font-semibold group-hover:text-[#4479A1] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">MySQL</p>
          <div className="absolute bottom-0 -z-10 w-full h-0 transition-all duration-[3s] ease-in-out bg-[#4479A10] group-hover:bg-[#4479A140] group-hover:h-full ">
          </div>
          <GrMysql size={55} color="#4479A1" className='absolute -z-10 translate-y-[50%] translate-x-[200%] rotate-45 transition-all duration-[3s] delay-500 group-hover:-translate-y-[100%] group-hover:-translate-x-[230%] group-hover:-rotate-90 group-hover:scale-[0.5]' />
          <GrMysql size={55} color="#4479A1" className='absolute -z-10 translate-y-[0%] translate-x-[200%] rotate-45 transition-all duration-[4s] delay-300 group-hover:-translate-y-[200%] group-hover:-translate-x-[230%] group-hover:-rotate-90 group-hover:scale-[0.5]' />
          <GrMysql size={55} color="#4479A1" className='absolute -z-10 -translate-y-[50%] translate-x-[200%] rotate-45 transition-all duration-[2s] delay-200 group-hover:-translate-y-[300%] group-hover:-translate-x-[230%] group-hover:-rotate-90 group-hover:scale-[0.5]' />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0">
          <div className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem] hover:bg-[#47A24840]' style={{padding:"3.4375rem .9375rem 2.8125rem"}}>
          <SiMongodb size={55} color="#47A248" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
          <p className="text-base font-semibold group-hover:text-[#47A248] text-gray-500 lg:text-lg md:text-base dark:text-gray-450">MongoDB</p>
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[200%] -translate-x-[200%] rotate-45 transition-all duration-[3s] delay-100 group-hover:-translate-y-[200%] group-hover:translate-x-[200%] ' />
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[100%] -translate-x-[300%] rotate-45 transition-all duration-[5s] delay-200 group-hover:-translate-y-[300%] group-hover:translate-x-[100%] ' />
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[100%] -translate-x-[200%] rotate-45 transition-all duration-[2s] delay-200 group-hover:-translate-y-[300%] group-hover:translate-x-[200%] ' />
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[200%] -translate-x-[400%] rotate-45 transition-all duration-[4s] delay-300 group-hover:-translate-y-[200%] group-hover:translate-x-[400%] ' />
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[250%] -translate-x-[250%] rotate-45 transition-all duration-[3s] delay-500 group-hover:-translate-y-[250%] group-hover:translate-x-[250%] ' />
          <SiMongodb size={55} color="#47A248" className='absolute -z-10 translate-y-[100%] -translate-x-[300%] rotate-45 transition-all duration-[5s] delay-200 group-hover:-translate-y-[100%] group-hover:translate-x-[300%] ' />
          </div>
        </div>
    </>
  )
}


const MobileSkills = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center gap-0 ">
        <motion.div 
            className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#3178C640" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <IoLogoHtml5 size={55} color="#3178C6" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#3178C6" }}
              viewport={{ margin: "-100px" }}
            >
              HTML
            </motion.p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group relative overflow- flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#264DE440" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <IoLogoCss3 size={55} color="#264DE4" className=' transition-all duration-500 group-hover:-translate-y-[20%]' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#264DE4" }}
              viewport={{ margin: "-100px" }}
            >
              CSS
            </motion.p>
            {/* create a background of lines */}
            <motion.svg 
              className='absolute -z-10'
              width="100" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay:0.5 }}
              viewport={{ margin: "-100px" }}
            >
              <motion.line stroke="#264DE440" strokeWidth="3" className=""
                initial={{ opacity: 0, x1: 0, y1: 0, x2: 100, y2: 0 }}
                whileInView={{ opacity: 1, x1: 0, y1: 0, x2: 100, y2: 0 }}
                transition={{ duration: 2.1, delay:0.2 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 20, y: 0 }}
                whileInView={{ opacity: 1, x: 70, y: 0, transition:{ duration: 1.7, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
              <motion.line stroke="#264DE440" strokeWidth="2" className=""
                initial={{ opacity: 0, x1: 0, y1: 50, x2: 0, y2: 50 }}
                whileInView={{ opacity: 1, x1: 0, y1: 50, x2: 100, y2: 50 }}
                transition={{ duration: 2.7, delay:0.5 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 20, y: 50 }}
                whileInView={{ opacity: 1, x: 80, y: 50, transition:{ duration: 1.5, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
              <motion.line stroke="#264DE440" strokeWidth="3" className=""
                initial={{ opacity: 0, x1: 0, y1: 100, x2: 0, y2: 100 }}
                whileInView={{ opacity: 1, x1: 0, y1: 100, x2: 100, y2: 100 }}
                transition={{ duration: 2.3, delay:0.5 }}
                viewport={{ margin: "-100px" }}
              />
              <motion.circle r="5" fill="#264DE440"
                initial={{ opacity: 1, x: 80, y: 100 }}
                whileInView={{ opacity: 1, x: 30, y: 100, transition:{ duration: 1.1, delay:0.2, repeat: Infinity, repeatType: "reverse" } }}
                viewport={{ margin: "-100px" }}
              />
            </motion.svg>

            
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#F7DF1E40" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <IoLogoJavascript size={55} color="#F7DF1E" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#F7DF1E" }}
              viewport={{ margin: "-100px" }}
            >
              JavaScript
            </motion.p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#61DAFB40" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <motion.div className=''
              whileInView={{ rotate: 360, scale: 1.2, transition: { duration: 2, delay: 0.4, repeat: Infinity, repeatType: "reverse" } }}
            >
              <IoLogoReact size={55} color="#61DAFB" className='' />
            </motion.div>
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#61DAFB" }}
              viewport={{ margin: "-100px" }}
            >
              ReactJS
            </motion.p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group overflow- flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#33993340" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <IoLogoNodejs size={55} color="#339933" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#339933" }}
              viewport={{ margin: "-100px" }}
            >
              NodeJS
            </motion.p>
            
            <motion.div className='absolute'
              style={{top: "10%", left: "10%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.9, delay: 0.2, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>
            <motion.div className='absolute'
              style={{top: "60%", left: "20%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.7, delay: 0.5, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>
            <motion.div className='absolute'
              style={{top: "40%", left: "50%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.3, delay: 0.8, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>
            <motion.div className='absolute'
              style={{top: "70%", left: "50%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.6, delay: 0.8, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>
            <motion.div className='absolute'
              style={{top: "30%", left: "10%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.6, delay: 0.8, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>
            <motion.div className='absolute'
              style={{top: "20%", left: "60%"}}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.6, delay: 0.8, repeat: Infinity } }}
              viewport={{ margin: "-50px" }}
            >
              <FiHexagon size={45} color="#33993380" className='absolute' />
            </motion.div>

          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
        <motion.div 
            className='group overflow- flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#3776AB40" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <SiNextdotjs size={55} color="#3776AB" className='' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#3776AB" }}
              viewport={{ margin: "-100px" }}
            >
              NextJS
            </motion.p>

              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "30%", left: "30%", rotate: 0, opacity: 0, scale: 0.5 }}
                whileInView={{
                  scale: 0,
                  rotate: 360, 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.1, repeat: Infinity} 
                }}
              >
                <TbBrandNextjs size={55} color="#3776AB70" className='absolute z-10' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "20%", left: "50%", rotate: 0, opacity: 0, scale: 0.5 }}
                whileInView={{
                  scale: 0,
                  rotate: 360, 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.61, repeat: Infinity} 
                }}
              >
                <TbBrandNextjs size={55} color="#3776AB70" className='absolute z-10' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "70%", left: "60%", rotate: 0, opacity: 0, scale: 0.5 }}
                whileInView={{
                  scale: 0,
                  rotate: 360, 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.7, repeat: Infinity} 
                }}
              >
                <TbBrandNextjs size={55} color="#3776AB70" className='absolute z-10' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "30%", left: "60%", rotate: 0, opacity: 0, scale: 0.5 }}
                whileInView={{
                  scale: 0,
                  rotate: 360, 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.8, repeat: Infinity} 
                }}
              >
                <TbBrandNextjs size={55} color="#3776AB70" className='absolute z-10' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "50%", left: "80%", rotate: 0, opacity: 0, scale: 0.5 }}
                whileInView={{
                  scale: 0,
                  rotate: 360, 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.54, repeat: Infinity} 
                }}
              >
                <TbBrandNextjs size={55} color="#3776AB70" className='absolute z-10' />
              </motion.div>
          
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group overflow-hidden flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 hover:bg-[#264DE440] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#4479A140" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <GrMysql size={55} color="#4479A1" className='transition-all duration-500 group-hover:-translate-y-[20%] group-hover:scale-110 ' />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#4479A1" }}
              viewport={{ margin: "-100px" }}
            >
              MySQL
            </motion.p>
            <motion.div className=" rounded-b-[9.375rem] absolute bottom-0 -z-10 w-full h-0 transition-all duration-[3s] ease-in-out bg-[#4479A140]"
              whileInView={{ height: "100%" }}
              viewport={{ margin: "-100px" }}
            >
            </motion.div>


            <motion.div className="absolute top-0 left-0 -z-10 w-full h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >

              <motion.div
                style={{position:"absolute"}}
                // initial={{ top: "80%", left: "50%", rotate: -30, opacity: 0, scale: 1 }}
                whileInView={{
                  top: [ "21%","22%" ],
                  left: [ "80%", "10%"],
                  rotate: [ -20, -60, -90 ],
                  opacity: [ 1, 0.9, 0 ],
                  scale: [ 1, 0.5 ],
                  transition: { duration: 2.3, delay: 0.4, repeat: Infinity, ease: "linear" }
                }}
              >
                <GrMysql size={45} color="#4479A1" className='absolute' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                // initial={{ top: "80%", left: "50%", rotate: -30, opacity: 0, scale: 1 }}
                whileInView={{
                  top: [ "51%","52%" ],
                  left: [ "90%", "10%"],
                  rotate: [ -20, -60, -90 ],
                  opacity: [ 1, 0.9, 0 ],
                  scale: [ 1, 0.5 ],
                  transition: { duration: 2, delay: 0.2, repeat: Infinity, ease: "linear" }
                }}
              >
                <GrMysql size={45} color="#4479A1" className='absolute' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                // initial={{ top: "80%", left: "50%", rotate: -30, opacity: 0, scale: 1 }}
                whileInView={{
                  top: [ "81%","82%" ],
                  left: [ "100%", "-10%"],
                  rotate: [ -20, -60, -90 ],
                  opacity: [ 1, 0.9, 0 ],
                  scale: [ 1, 0.5 ],
                  transition: { duration: 2.5, delay: 0.1, repeat: Infinity, ease: "linear" }
                }}
              >
                <GrMysql size={45} color="#4479A1" className='absolute' />
              </motion.div>

              
            </motion.div>
          
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-0">
          <motion.div 
            className='group overflow flex flex-col items-center justify-center gap-2 w-32 md:w-40 h-48 md:h-64 bg-gray-200 grayscale rounded-[9.375rem]' 
            style={{padding:"3.4375rem .9375rem 2.8125rem"}}
            initial={{ scale: 0.8, filter: "grayscale(100%)" }}
            whileInView={{ scale: 1, filter: "grayscale(0%)", backgroundColor: "#47A24840" }}
            transition={{ duration: 0.2, delay:0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <SiMongodb size={55} color="#47A248" />
            <motion.p className="text-base font-semibold lg:text-lg md:text-base"
              whileInView={{ color: "#47A248" }}
              viewport={{ margin: "-100px" }}
            >
              MongoDB
            </motion.p>
              
            <motion.div className="absolute top-0 left-0 -z-10 w-full h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "80%", left: "30%", rotate: -30, opacity: 0 }}
                whileInView={{
                  top: "-10%", 
                  left: ["60%", "80%"], 
                  rotate: [10, 27, 10, -10], 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 2.8, delay: 0.1, repeat: Infinity} 
                }}
              >
                <SiMongodb size={45} color="#47A248" className='absolute' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "80%", left: "0", rotate: 0, opacity: 0 }}
                whileInView={{
                  top: "-10%", 
                  left: ["60%", "40%"], 
                  rotate: [10, -27, -10, 0], 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 3, delay: 0.4, repeat: Infinity} 
                }}
              >
                <SiMongodb size={45} color="#47A248" className='absolute' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "90%", left: "-10%", rotate: -5, opacity: 0 }}
                whileInView={{
                  top: "-10%", 
                  left: ["20%", "10%"], 
                  rotate: [10, -20, -8, 0], 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 2.3, delay: 0.3, repeat: Infinity} 
                }}
              >
                <SiMongodb size={45} color="#47A248" className='absolute' />
              </motion.div>
              <motion.div
                style={{position:"absolute"}}
                initial={{ top: "80%", left: "40%", rotate: -10, opacity: 0 }}
                whileInView={{
                  top: "-10%", 
                  left: ["-20%", "10%"], 
                  rotate: [0, -20, 8, 3], 
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 2.3, delay: 0.1, repeat: Infinity} 
                }}
              >
                <SiMongodb size={45} color="#47A248" className='absolute' />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

    </>
  )
}


