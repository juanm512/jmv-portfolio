import {
  BakeShadows,
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

export default function LandP({ isMobile, setDpr }) {
  return (
    <>
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
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PerformanceMonitor
        flipflops={5}
        onFallback={() => setDpr(isMobile ? 0.1 : 0.45)}
        factor={0.5}
        onChange={({ factor }) => setDpr(Math.floor(0.1 + 1.45 * factor, 1))}
      />
    </>
  )
}
