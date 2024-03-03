import { motion } from "framer-motion"

const animation = {
  initial: (props) => ({
    backgroundColor: "rgb(163 163 163)",
    filter:
      "drop-shadow(-10px 0px 5px rgb(163 163 163)) drop-shadow(10px 0px 5px rgb(150 150 150))",
    transform: `rotate(0deg) translateY(0rem)`
  }),
  animate: (props) => ({
    backgroundColor: [props[0], "rgb(163 163 163)", props[0]],
    filter: [
      props[1],
      "drop-shadow(-10px 0px 5px rgb(163 163 163)) drop-shadow(10px 0px 5px rgb(150 150 150))",
      props[1]
    ],
    transform: `rotate(${props[2]}deg) translateY(${props[3]}rem)`,
    transition: {
      duration: 1.5,
      delay: 0.2,
      transform: { delay: 1.5, duration: 0.2 }
    }
  })
}

export default function StatusLines({ color }) {
  if (color == "green") {
    return (
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        custom={[
          "rgb(22 163 74)",
          "drop-shadow(-10px 0px 5px rgb(22 163 74)) drop-shadow(10px 0px 5px rgb(62 163 94))",
          0,
          0
        ]}
        className="w-full h-0.5"
      />
    )
  } else if (color == "yellow") {
    return (
      <>
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(202 138 4)",
            "drop-shadow(-10px 0px 5px rgb(202 138 4)) drop-shadow(10px 0px 5px rgb(202 158 54))",
            0,
            0
          ]}
          className="w-10/12 h-0.5"
        />
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(202 138 4)",
            "drop-shadow(-10px 0px 5px rgb(202 138 4)) drop-shadow(10px 0px 5px rgb(202 158 54))",
            -12,
            -0.5
          ]}
          className="w-2/12 h-0.5"
        />
      </>
    )
  } else {
    return (
      <>
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(220 38 38)",
            "drop-shadow(-10px 0px 5px rgb(220 38 38)) drop-shadow(10px 0px 5px rgb(220 78 78))",
            4,
            0
          ]}
          className="w-4/12 h-0.5"
        />
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(220 38 38)",
            "drop-shadow(-10px 0px 5px rgb(220 38 38)) drop-shadow(10px 0px 5px rgb(220 78 78))",
            10,
            2
          ]}
          className="w-2/12 h-0.5"
        />
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(220 38 38)",
            "drop-shadow(-10px 0px 5px rgb(220 38 38)) drop-shadow(10px 0px 5px rgb(220 78 78))",
            -2,
            0
          ]}
          className="w-4/12 h-0.5"
        />
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          custom={[
            "rgb(220 38 38)",
            "drop-shadow(-10px 0px 5px rgb(220 38 38)) drop-shadow(10px 0px 5px rgb(220 78 78))",
            12,
            0.5
          ]}
          className="w-2/12 h-0.5"
        />
      </>
    )
  }
}
