import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useDetectGPU } from "@react-three/drei"

// This is the fallback component that will be rendered on the main thread
// This will happen on systems where OffscreenCanvas is not supported

const LightsAndPerformance = dynamic(() => import("./LightsAndPerformance"), {
  ssr: false
})
const Scene = dynamic(() => import("./Scene"), {
  ssr: false
})

export default function Index({ inView }) {
  const [dpr, setDpr] = useState(0.2)
  const GPUTier = useDetectGPU()
  const isMobile = GPUTier.tier == 0 || GPUTier.isMobile
  // const isMobile =true
  // console.log(isMobile)

  return (
    <Canvas
      className="pointer-events-auto"

      dpr={dpr}
      frameloop={inView ? "always" : "demand"}
      gl={{ antialias: false }}
      camera={{ fov: 50, position: [0, 0, 120] }}
    >
      <Scene />
      <LightsAndPerformance
        isMobile={isMobile}
        setDpr={setDpr}
      />
    </Canvas>
  )
}
