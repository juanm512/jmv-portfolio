import { MathUtils } from "three"
import { useRef, useTransition } from "react"
import { useFrame } from "@react-three/fiber"
import {
  useDetectGPU,
  Instances,
  Instance,
  MeshTransmissionMaterial,
  Float
} from "@react-three/drei"

import dataJSON from "./newData.json"
let data = dataJSON

const parseColor = (color) =>
  "#" +
  color[0].toString(16).padStart(2, "0") +
  color[1].toString(16).padStart(2, "0") +
  color[2].toString(16).padStart(2, "0")
const parseNumbers = (x, max, range) => (x / max) * range - range / 2

const params = {
  factor: MathUtils.randInt(20, 100)
}

const dims = {
  w: 640,
  h: 361
}

export default function Scene() {
  return (
    <>
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
    </>
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
  const [isPending, startTransition] = useTransition()

  const ref = useRef()
  useFrame((state, delta) => {
    const t = params.factor + state.clock.elapsedTime * 0.2
    startTransition(() => {
      ref.current.scale.setScalar(
        Math.max(1.5 * (1 / w), Math.cos(t) * 5 * (1 / w))
      )
    })
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
