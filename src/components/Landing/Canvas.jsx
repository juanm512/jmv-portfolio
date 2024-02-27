import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"
import { useState } from "react"

// This is the fallback component that will be rendered on the main thread
// This will happen on systems where OffscreenCanvas is not supported

const LightsAndPerformance = dynamic(() => import("./LightsAndPerformance"), {
  ssr: false
})
const Scene = dynamic(() => import("./Scene"), {
  ssr: false
})

export default function Index() {
  const [dpr, setDpr] = useState(0.2)
  return (
    <Canvas
      className="pointer-events-auto"
      shadows
      dpr={dpr}
      gl={{ antialias: false }}
      camera={{ fov: 50, position: [0, 0, 120] }}
    >
      <Scene />
      <LightsAndPerformance setDpr={setDpr} />
    </Canvas>
  )
}
