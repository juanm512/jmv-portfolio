import React from "react"
import Image from "next/image"
// import { motion } from "framer-motion";

import {
  IoDownload,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoDiscord
} from "react-icons/io5"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isDiscordCopied, setIsDiscordCopied] = React.useState(false)

  const handleDiscordCopy = () => {
    navigator.clipboard.writeText("juanm512#5622")
    setIsDiscordCopied(true)

    setTimeout(() => {
      setIsDiscordCopied(false)
    }, 3000)
  }

  return (
    <nav className="fixed z-50 w-full md:flex border-gray-200 px-3 md:px-20 md:py-8 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        {/* <div className="md:flex md:justify-center md:w-auto md:order-2 mt-8 mx-2 md:mt-0">
          <div className="relative md:basis-1/3 text-xl font-bold text-palette-400 font-mono text-center ml-8">
            <div className="relative flex justify-center items-center group w-16 h-16 p-8 border-gray-900 border-offset-[96px]">
             
              <Image
                src="/Ai5.jpg"
                alt="Logo"
                style={{
                  transform: "scaleX(-1)",
                  filter: "invert(0) brightness(1.1)",
                }}
                className="rounded-full w-12 h-12 p-2 border-2 border-palette-400"
                layout="fill"
                objectFit="cover"
              />
              <svg
                className="absolute top-0 left-0 w-full h-full scale-[2] transition-transform rotate-360 duration-1000 delay-300 group-hover:rotate-180"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  id="curve"
                  d="M 50 100 A 50 50 0 1 1 150 100 A 50 50 0 1 1 50 100 "
                />
                <text width="500">
                  <textPath
                    alignmentBaseline="top"
                    href="#curve"
                    style={{ letterSpacing: "0.27em" }}
                  >
                    AVAILABLE FOR HIRE
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div> */}
        <div className="md:basis-1/3 flex justify-center mt-6 lg:flex md:mt-0 md:order-3">
          <div className={"hidden md:flex p-4 bg-white rounded-lg"}>
            <a
              rel="noreferrer"
              target={"_blank"}
              href="https://drive.google.com/uc?id=132L4f_w39rZHRaTpHu5Mo4FsX-Oe9FZn"
              className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
              aria-label="Github"
            >
              <IoDownload size={25} />
            </a>
            <a
              rel="noreferrer"
              target={"_blank"}
              href="https://github.com/juanm512"
              className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
              aria-label="Github"
            >
              <IoLogoGithub size={25} />
            </a>
            <a
              rel="noreferrer"
              target={"_blank"}
              href="https://www.instagram.com/juuanmav/"
              className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
              aria-label="Instagram"
            >
              <IoLogoInstagram size={25} />
            </a>
            <a
              rel="noreferrer"
              target={"_blank"}
              href="https://www.linkedin.com/in/juanmanuelvila"
              className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
              aria-label="Linkedin"
            >
              <IoLogoLinkedin size={25} />
            </a>
            <button
              onClick={() => handleDiscordCopy()}
              className="cursor-pointer group relative mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
              aria-label="Discord"
            >
              <IoLogoDiscord size={25} />
              <div
                className={`absolute top-0 left-0 translate-y-[60%] w-fit h-fit text-center rounded-sm px-2 bg-gray-900 bg-opacity-90 text-white text-sm font-bold ${
                  isDiscordCopied ? "block" : "hidden"
                }`}
              >
                Copied succesfully!
              </div>
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen((pV) => !pV)}
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* <div
          className={
            "basis-full md:hidden order-4 flex justify-center mt-6 lg:mt-0" +
            (isMenuOpen ? " " : " hidden")
          }
        >
          <a
            rel="noreferrer"
            target={"_blank"}
            href="https://github.com/juanm512"
            className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
            aria-label="Github"
          >
            <IoLogoGithub size={25} />
          </a>
          <a
            rel="noreferrer"
            target={"_blank"}
            href="https://www.instagram.com/juuanmav/"
            className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
            aria-label="Instagram"
          >
            <IoLogoInstagram size={25} />
          </a>
          <a
            rel="noreferrer"
            target={"_blank"}
            href="https://www.linkedin.com/in/juanmanuelvila"
            className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
            aria-label="Linkedin"
          >
            <IoLogoLinkedin size={25} />
          </a>
          <a
            onClick={() => handleDiscordCopy()}
            className="cursor-pointer group relative mx-2 text-gray-600 transition-colors duration-300 transform dark:text-palette-300 hover:text-palette-300 dark:hover:text-palette-300"
            aria-label="Discord"
          >
            <IoLogoDiscord size={25} />
            <div className="absolute top-0 left-0 translate-y-[60%] w-fit h-fit text-center rounded-sm px-2 block md:hidden md:group-hover:block bg-gray-900 bg-opacity-90 text-white text-sm font-bold">
              {isDiscordCopied ? "Copied succesfully!" : "Copy Username"}
            </div>
          </a>
        </div> */}
        <div
          className={
            "basis-full md:basis-1/3 justify-center mt-6 md:flex md:mt-0 lg:-mx-2 md:order-1" +
            (isMenuOpen ? " " : " hidden")
          }
          id="navbar-cta"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#Home"
                className="block py-2 pr-4 pl-3 font-bold border-b-2 md:rounded-none border-palette-400 text-white bg-palette-400 rounded md:bg-transparent md:text-palette-400 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#Skills"
                className="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-palette-400 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#Projects"
                className="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-palette-400 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Proyects
              </a>
            </li>
            <li>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#Contact"
                className="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-palette-400 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
