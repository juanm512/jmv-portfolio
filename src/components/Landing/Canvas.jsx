import { Canvas } from "@react-three/offscreen"
import dynamic from "next/dynamic"

// This is the fallback component that will be rendered on the main thread
// This will happen on systems where OffscreenCanvas is not supported

const Scene = dynamic(() => import("./Scene"), { ssr: false })

// This is the worker thread that will render the scene
// This is the worker thread that will render the scene
const worker = new Worker(new URL("./worker.jsx", import.meta.url))

export default function Index() {
  return (
    <Canvas
      className="pointer-events-auto"
      shadows
      dpr={[0.2, 2]}
      gl={{ antialias: false }}
      camera={{ fov: 50, position: [0, 0, 120] }}
      worker={worker}
      fallback={<Scene />}
    />
  )
}
