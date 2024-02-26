"use client"
import React from "react"
import Link from "next/link"
// import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { opacity, background } from "./animation.js"

import Nav from "./Nav"

export default function index({ lang }) {
  const [isActive, setIsActive] = React.useState(false)
  const [languageChange, setLanguageChange] = React.useState(false)

  const handleKeyPressed = React.useCallback((event) => {
    console.log(`key pressed: `, event)
    if (event.key == "Escape" || event.keyCode == 27) setIsActive(!isActive)
    if (event.key == "l" || event.key == "L" || event.keyCode == 76)
      setLanguageChange(!languageChange)
  })
  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyPressed)
    return () => window.removeEventListener("keyup", handleKeyPressed)
  }, [handleKeyPressed])

  return (
    // bg-red-950/30
    <div className="backdrop-blur-lg fixed w-full p-3 box-border z-20">
      <div className="relative flex justify-center gap-4 uppercase text-md">
        <Link
          className="absolute left-0 text-white"
          href="/"
        >
          Olivier
        </Link>
        <motion.div
          onClick={() => setIsActive(!isActive)}
          animate={{
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : "white"
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-8 cursor-pointer"
        >
          <div className="relative flex flex-row-reverse gap-4 px-2 py-1 items-center transition-all duration-300 hover:ring-2 ring-white">
            <AnimatePresence mode="wait">
              {!isActive ? (
                <motion.p
                  className="m-0 font-semibold"
                  variants={opacity}
                  initial="initial"
                  animate={!isActive ? "open" : "closed"}
                >
                  Menu
                </motion.p>
              ) : (
                <motion.p
                  className="m-0 font-semibold"
                  variants={opacity}
                  initial="closed"
                  closed="initial"
                  animate="open"
                >
                  Close
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div
              variants={opacity}
              initial="initial"
              animate="open"
              className={`sm:hidden block burger ${
                isActive ? "burgerActive" : ""
              }`}
            />
            <motion.p
              className="hidden sm:flex m-0 text-sm font-normal ring-1 ring-white px-1"
              variants={opacity}
              initial="initial"
              animate="open"
            >
              Esc
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          variants={opacity}
          animate={{
            backgroundColor: languageChange ? "white" : "",
            color: languageChange ? "black" : "white"
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguageChange(!languageChange)}
          className="flex gap-8 px-2 py-1 justify-center items-center cursor-pointer transition-all duration-500 hover:ring-2 ring-white"
        >
          <p className="hidden">Language change</p>
          <motion.div
            variants={opacity}
            initial="initial"
            animate="open"
            className="flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="square"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M4 5h7" />
              <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
              <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
              <path d="M12 20l4 -9l4 9" />
              <path d="M19.1 18h-6.2" />
            </svg>
            {/* <motion.p
              className="m-0 font-semibold"
              variants={opacity}
              initial="initial"
              animate={!isActive ? "open" : "closed"}
            >
              {lang}
            </motion.p> */}
            <p className="hidden sm:flex m-0 text-sm font-semibold ring-1 ring-white px-1">
              L
            </p>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute h-full w-full bg-black backdrop-blur opacity-50 left-0 top-full"
      ></motion.div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </div>
  )
}
