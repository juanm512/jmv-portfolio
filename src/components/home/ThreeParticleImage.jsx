"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Image sampling + particle generation (runs once on mount)
function generateParticles(img, width, height, baseParticleSize, maxGridParticles, extraOnCenter) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", { willReadFrequently: true })

  const sampleWidth = 200
  const sampleHeight = Math.floor(sampleWidth * (img.height / img.width))
  canvas.width = sampleWidth
  canvas.height = sampleHeight
  ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight)

  const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight)
  const data = imageData.data

  const centerX = width / 2
  const centerY = height / 2
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

  // Mobile scaling
  const isMobile = width < 768
  const isTablet = width < 1024 && !isMobile
  const scaleFactor = isMobile ? 0.3 : isTablet ? 0.6 : 2
  const effectiveGridMax = Math.floor(maxGridParticles * scaleFactor)
  const effectiveCenterExtra = Math.floor(extraOnCenter * scaleFactor * 0.5)
  const effectiveSize = isMobile ? baseParticleSize * 1.4 : baseParticleSize

  // Aspect-ratio-aware mapping (cover fit)
  const imgAspect = img.width / img.height
  const vpAspect = width / height
  let imgAreaW, imgAreaH, imgOffX, imgOffY
  if (vpAspect > imgAspect) {
    imgAreaW = width
    imgAreaH = width / imgAspect
    imgOffX = 0
    imgOffY = (height - imgAreaH) / 2
  } else {
    imgAreaH = height
    imgAreaW = height * imgAspect
    imgOffX = (width - imgAreaW) / 2
    imgOffY = 0
  }

  const particles = []

  function push(x, y, size, distFromCenter) {
    const normX = Math.max(0, Math.min(1, (x - imgOffX) / imgAreaW))
    const normY = Math.max(0, Math.min(1, (y - imgOffY) / imgAreaH))
    const imgX = Math.floor(normX * (sampleWidth - 1))
    const imgY = Math.floor(normY * (sampleHeight - 1))
    const idx = (imgY * sampleWidth + imgX) * 4

    const jitter = size * 0.2
    particles.push({
      x: x + (Math.random() - 0.5) * jitter,
      y: y + (Math.random() - 0.5) * jitter,
      size,
      r: data[idx] / 255,
      g: data[idx + 1] / 255,
      b: data[idx + 2] / 255,
      delay: 0.2 + distFromCenter * 2.0,
      dist: distFromCenter,
    })
  }

  // PASS 1: Grid
  const cols = Math.ceil(width / effectiveSize)
  const rows = Math.ceil(height / effectiveSize)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (particles.length >= effectiveGridMax) break
      const x = col * effectiveSize + effectiveSize / 2
      const y = row * effectiveSize + effectiveSize / 2
      const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / maxDist
      if (distFromCenter > 0.35) {
        const skipChance = ((distFromCenter - 0.35) / 0.65) * 0.95
        if (Math.random() < skipChance) continue
      }
      push(x, y, effectiveSize * (0.7 + Math.random() * 0.3), distFromCenter)
    }
    if (particles.length >= effectiveGridMax) break
  }

  // PASS 2: Gaussian center
  const centerRadius = Math.min(width, height) * 0.5
  for (let i = 0; i < effectiveCenterExtra; i++) {
    const angle = Math.random() * Math.PI * 2
    const u1 = Math.random()
    const u2 = Math.random()
    const gaussR = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    const r = Math.min(Math.abs(gaussR) * 0.4, 1.0) * centerRadius
    const x = centerX + Math.cos(angle) * r
    const y = centerY + Math.sin(angle) * r
    push(x, y, effectiveSize * (0.35 + Math.random() * 0.3), Math.min(r / maxDist, 0.3))
  }

  // PASS 3: Fine core
  const coreRadius = Math.min(width, height) * 0.15
  const CORE_EXTRA = Math.floor(effectiveCenterExtra * 0.4)
  for (let i = 0; i < CORE_EXTRA; i++) {
    const angle = Math.random() * Math.PI * 2
    const r = Math.pow(Math.random(), 0.5) * coreRadius
    const x = centerX + Math.cos(angle) * r
    const y = centerY + Math.sin(angle) * r
    push(x, y, effectiveSize * (0.25 + Math.random() * 0.2), Math.min(r / maxDist, 0.15))
  }

  return particles
}

// ─── Particle shaders ───────────────────────────────────────────

const particleVertexShader = `
  attribute float aSize;
  attribute float aDelay;
  attribute float aDist;

  uniform float uTime;
  uniform float uExitProgress;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;

    // Entrance
    float rawProgress = (uTime - aDelay) * 0.8;
    if (rawProgress <= 0.001) {
      gl_PointSize = 0.0;
      gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
      return;
    }
    float progress = clamp(rawProgress, 0.0, 1.0);
    float entranceEase = 1.0 - (1.0 - progress) * (1.0 - progress);

    // Breathing: subtle position drift
    float driftX = sin(uTime * 0.6 + position.x * 0.005 + position.y * 0.007) * 1.25
                 + sin(uTime * 1.1 - position.y * 0.004) * 0.75;
    float driftY = cos(uTime * 0.5 + position.y * 0.006 - position.x * 0.003) * 1.25
                 + cos(uTime * 0.9 + position.x * 0.005) * 0.75;

    // Exit: disperse outward
    float exitScale = 1.0;  
    vec3 disperseOffset = vec3(0.0);
    vAlpha = 1.0;

    if (uExitProgress > 0.001) {
      float exitStart = (1.0 - aDist) * 0.6;
      float exitP = clamp((uExitProgress - exitStart) / (1.0 - exitStart), 0.0, 1.0);
      float easedExit = exitP * exitP;

      exitScale = 1.0 - easedExit * 0.5;
      vAlpha = 1.0 - easedExit;

      vec3 dir = normalize(position + vec3(0.001));
      float disperseStrength = easedExit * (150.0 + length(position) * 0.8);
      disperseOffset = dir * disperseStrength;

      if (vAlpha < 0.01) {
        gl_PointSize = 0.0;
        gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
        return;
      }
    }

    vec3 finalPos = position + disperseOffset + vec3(driftX, driftY, 0.0) * entranceEase;
    gl_PointSize = aSize * entranceEase * exitScale * uPixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  }
`

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = 0.96 * smoothstep(0.5, 0.35, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`



// ─── Scene ──────────────────────────────────────────────────────

function ParticleScene({ particles, disperseProgressRef, width, height, paused }) {
  const pointsRef = useRef()
  const startTimeRef = useRef(null)
  const wasPausedRef = useRef(paused)
  const { camera, size, invalidate } = useThree()

  // Keep camera bounds synced
  useEffect(() => {
    if (camera.isOrthographicCamera) {
      camera.left = -size.width / 2
      camera.right = size.width / 2
      camera.top = size.height / 2
      camera.bottom = -size.height / 2
      camera.updateProjectionMatrix()
    }
  }, [camera, size])

  // Build particle buffer geometry
  const geometry = useMemo(() => {
    const count = particles.length
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const delays = new Float32Array(count)
    const dists = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const p = particles[i]
      positions[i * 3] = p.x - width / 2
      positions[i * 3 + 1] = -(p.y - height / 2)
      positions[i * 3 + 2] = 0

      colors[i * 3] = p.r
      colors[i * 3 + 1] = p.g
      colors[i * 3 + 2] = p.b

      sizes[i] = p.size
      delays[i] = p.delay
      dists[i] = p.dist
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1))
    geo.setAttribute("aDist", new THREE.BufferAttribute(dists, 1))

    return geo
  }, [particles, width, height])

  // Particle shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uExitProgress: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
  }, [])

  // Reset startTime when unpausing
  useEffect(() => {
    if (wasPausedRef.current && !paused) {
      startTimeRef.current = null
      invalidate()
    }
    wasPausedRef.current = paused
  }, [paused, invalidate])

  // Update uniforms every frame
  useFrame((state) => {
    if (!material) return

    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime
    const elapsed = state.clock.elapsedTime - startTimeRef.current

    material.uniforms.uTime.value = elapsed
    material.uniforms.uExitProgress.value = disperseProgressRef?.current ?? 0

  })

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  )
}

// Detect mobile for DPR optimization
const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768

// Main component
export default function ThreeParticleImage({
  src,
  onLoad,
  baseParticleSize = 20,
  maxGridParticles = 2200,
  extraOnCenter = 500,
  disperseProgressRef,
  paused = false,
}) {
  const [particles, setParticles] = useState(null)
  const [dimensions, setDimensions] = useState(null)
  const onLoadRef = useRef(onLoad)

  useEffect(() => {
    onLoadRef.current = onLoad
  }, [onLoad])

  // Load image and generate particles
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const result = generateParticles(img, w, h, baseParticleSize, maxGridParticles, extraOnCenter)
      setParticles(result)
      setDimensions({ w, h })
      onLoadRef.current?.()
    }

    img.onerror = () => onLoadRef.current?.()
  }, [src, baseParticleSize, maxGridParticles, extraOnCenter])

  if (!particles || !dimensions) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 2)}
        orthographic
        camera={{ position: [0, 0, 1], near: 0.1, far: 10, zoom: 1 }}
        frameloop={paused ? "never" : "always"}
        style={{ background: "#050B08" }}
      >
        <ParticleScene
          particles={particles}
          disperseProgressRef={disperseProgressRef}
          width={dimensions.w}
          height={dimensions.h}
          paused={paused}
        />
      </Canvas>
    </div>
  )
}
