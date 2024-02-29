"use client"
import { useTranslations } from "next-intl"
import { useLayoutEffect, useState } from "react"

import IconCard from "./IconPerspectiveCard"
import NormalCard from "./NormalCard"

export default function Index() {
  const t = useTranslations("Contact")

  const indexes = [
    { row: 1, col: 1 },
    { row: 3, col: 1 },
    { row: 3, col: 4 },
    { row: 1, col: 4 }
  ]

  const [windowsWidth, setWindowsWidth] = useState(0)

  useLayoutEffect(() => {
    // createIndexesArray()
    setWindowsWidth(window.innerWidth)
  }, [])

  // const createIndexesArray = () => {
  //   const blockSize =
  //     window.innerWidth <= 770
  //       ? window.innerWidth * 0.15
  //       : window.innerWidth * 0.05
  //   const rows = 4
  //   const cols = window.innerWidth <= 770 ? 5 : 19

  //   let i = 0
  //   while (i != 4) {
  //     const row = Math.round(Math.random() * rows)
  //     const col = Math.round(Math.random() * cols)
  //     if (-1 == indexes.findIndex((val) => row == val.row && col == val.col)) {
  //       setIndexes((prev) => {
  //         prev[i] = { col, row }
  //         return prev
  //       })
  //       i++
  //     }
  //   }
  //   // console.log(indexes)
  // }

  const getBlocks = (col) => {
    const blockSize =
      window.innerWidth <= 770
        ? window.innerWidth * 0.15
        : window.innerWidth * 0.05
    const rows = 5
    const shuffledIndexes = shuffle([...Array(rows)].map((_, i) => i))

    return shuffledIndexes.map((randomIndex, index) => {
      const indexFount = indexes.findIndex(
        (val) => index == val.row && col == val.col
      )
      return indexFount !== -1 ? (
        <IconCard
          data={indexes[indexFount]}
          key={index + "" + col}
          randomIndex={randomIndex}
        />
      ) : (
        <NormalCard
          key={index + "" + col}
          randomIndex={randomIndex}
        />
      )
    })
  }

  return (
    <footer
      id="contact"
      className="w-full h-[75vh] flex flex-col justify-end items-end"
    >
      <div className="w-full h-fit flex gap-[0.1vw] px-4 py-8 overflow-hidden will-change-auto">
        {windowsWidth > 0 &&
          [...Array(window.innerWidth <= 770 ? 6 : 20).keys()].map(
            (_, index) => {
              return (
                <div
                  key={"b_" + index}
                  className="flex flex-col gap-[0.1vw] w-[15vw] md:w-[5vw]"
                >
                  {getBlocks(index)}
                </div>
              )
            }
          )}
      </div>
    </footer>
  )
}

const shuffle = (a) => {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
