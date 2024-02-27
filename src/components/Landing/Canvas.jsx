import { MathUtils } from "three"
import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  useDetectGPU,
  Instances,
  Instance,
  MeshTransmissionMaterial,
  BakeShadows,
  Float,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor
} from "@react-three/drei"
import {
  EffectComposer,
  Bloom,
  DepthOfField
} from "@react-three/postprocessing"

import dataJSON from "./newData.json"

const params = {
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75)
}

const dims = {
  w: 640,
  h: 361
}

let data = dataJSON

const parseColor = (color) =>
  "#" +
  color[0].toString(16).padStart(2, "0") +
  color[1].toString(16).padStart(2, "0") +
  color[2].toString(16).padStart(2, "0")
const parseNumbers = (x, max, range) => (x / max) * range - range / 2

export default function App() {
  const [dpr, setDpr] = useState(0.5)
  return (
    <Canvas
      className=" pointer-events-auto"
      shadows
      // dpr={[1, 2]}
      dpr={dpr}
      gl={{ antialias: false }}
      camera={{ fov: 50, position: [0, 0, 120] }}
    >
      <color
        attach="background"
        args={["#222222"]}
      />
      <fog
        attach="fog"
        args={["red", 70, -5]}
      />
      <hemisphereLight
        intensity={7.5}
        groundColor="white"
      />

      {/* Plane reflections + distance blur */}
      <mesh
        position={[0, 0, 50]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <boxGeometry args={[500, 500, 5]} />
        <MeshTransmissionMaterial
          thickness={0.25}
          distortion={0.1}
          chromaticAberration={0.75}
          resolution={300}
          ior={1.8}
          roughness={0}
          transmission={0.99}
        />
      </mesh>

      <Bubbles />

      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={5}
        />
        <DepthOfField
          target={[0, 0, 5]}
          focalLength={0.3}
          bokehScale={1}
          height={100}
        />
      </EffectComposer>

      {/* performance */}
      <BakeShadows />
      <Preload all />
      {/* <AdaptiveDpr pixelated /> */}
      <AdaptiveEvents />
      <PerformanceMonitor
        factor={1}
        onChange={({ factor }) => setDpr(Math.floor(0.1 + 1.5 * factor, 1))}
      />
    </Canvas>
  )
}

function Bubbles() {
  const ref = useRef()

  return (
    <Instances
      limit={data.length}
      ref={ref}
      castShadow
      position={[0, 0, 0]}
    >
      <boxGeometry args={[10, 10, 2]} />
      <meshPhongMaterial
        attach="material"
        metalness={0.2}
        emissive={0xff0800}
        emissiveIntensity={0.05}
      />
      {data.map((data, i) => (
        <Float
          key={i}
          speed={10} // Animation speed, defaults to 1
          rotationIntensity={0} // XYZ rotation intensity, defaults to 1
          floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <Bubble
            key={i}
            index={i}
            w={data.w}
            color={parseColor(data.color)}
            position={[
              parseNumbers(data.x, dims.w, 240),
              parseNumbers(dims.h - data.y, dims.h, 135),
              data.w
            ]}
            rotation={[0, 0, 0]}
          />
        </Float>
      ))}
    </Instances>
  )
}

function Bubble({ index, w, ...props }) {
  const GPUTier = useDetectGPU()

  const ref = useRef()
  useFrame((state, delta) => {
    const t = params.factor + state.clock.elapsedTime * 0.2

    ref.current.scale.setScalar(
      Math.max(1.5 * (1 / w), Math.cos(t) * 5 * (1 / w))
    )
    if (!GPUTier.tier === "0" || !GPUTier.isMobile) {
      ref.current.rotation.x = MathUtils.damp(
        ref.current.rotation.x,
        (-state.mouse.y * Math.PI) / 2,
        1.8,
        delta
      )
      ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (state.mouse.x * Math.PI) / 2,
        1.8,
        delta
      )
    }
  })
  return (
    <Instance
      ref={ref}
      {...props}
    />
  )
}
