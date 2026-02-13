"use client"

import { useRef, useEffect, useState, useCallback } from "react"

// Quantize a color to reduce unique fillStyle changes
function quantizeColor(r, g, b, levels = 12) {
  const step = 256 / levels
  return (
    (Math.floor(r / step) * levels + Math.floor(g / step)) * levels +
    Math.floor(b / step)
  )
}

export default function CanvasParticleImage({
  src,
  onLoad,
  baseParticleSize = 20,
  maxGridParticles = 2200,
  extraOnCenter = 500,
  disperseProgressRef,
  paused = false,
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef(null) // Typed arrays for perf
  const colorGroupsRef = useRef(new Map())
  const particleCountRef = useRef(0)
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef()
  const onLoadRef = useRef(onLoad)
  const startTimeRef = useRef(null)
  const isMobileRef = useRef(false)

  useEffect(() => {
    onLoadRef.current = onLoad
  }, [onLoad])

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    const img = new Image()

    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      const sampleWidth = 200
      const sampleHeight = Math.floor(
        sampleWidth * (img.height / img.width)
      )
      canvas.width = sampleWidth
      canvas.height = sampleHeight
      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight)

      const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight)
      const data = imageData.data

      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

      // Mobile scaling — reduce particle count on small screens
      const isMobile = width < 768
      const isTablet = width < 1024 && !isMobile
      const scaleFactor = isMobile ? 0.3 : isTablet ? 0.6 : 2
      const effectiveGridMax = Math.floor(maxGridParticles * scaleFactor)
      const effectiveCenterExtra = Math.floor(extraOnCenter * scaleFactor * 0.5)
      const effectiveParticleSize = isMobile ? baseParticleSize * 1.4 : baseParticleSize
      isMobileRef.current = isMobile

      // Aspect-ratio-aware mapping (cover fit)
      const imgAspect = img.width / img.height
      const vpAspect = width / height
      let imgAreaW, imgAreaH, imgOffX, imgOffY
      if (vpAspect > imgAspect) {
        // Viewport wider than image — fit width, crop height
        imgAreaW = width
        imgAreaH = width / imgAspect
        imgOffX = 0
        imgOffY = (height - imgAreaH) / 2
      } else {
        // Viewport taller than image — fit height, crop width
        imgAreaH = height
        imgAreaW = height * imgAspect
        imgOffX = (width - imgAreaW) / 2
        imgOffY = 0
      }

      const tempParticles = []

      function pushParticle(x, y, size, distFromCenter) {
        // Map particle position to image coordinates using cover fit
        const normX = Math.max(0, Math.min(1, (x - imgOffX) / imgAreaW))
        const normY = Math.max(0, Math.min(1, (y - imgOffY) / imgAreaH))
        const imgX = Math.floor(normX * (sampleWidth - 1))
        const imgY = Math.floor(normY * (sampleHeight - 1))
        const idx = (imgY * sampleWidth + imgX) * 4

        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]

        const jitter = size * 0.2
        const finalX = x + (Math.random() - 0.5) * jitter
        const finalY = y + (Math.random() - 0.5) * jitter

        const delay = 0.2 + distFromCenter * 2.0
        const colorKey = quantizeColor(r, g, b)

        tempParticles.push({
          x: finalX,
          y: finalY,
          size,
          r, g, b,
          colorKey,
          delay,
          distFromCenter,
        })
      }

      // PASS 1: Grid — sparse at edges, dense toward center
      const cols = Math.ceil(width / effectiveParticleSize)
      const rows = Math.ceil(height / effectiveParticleSize)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (tempParticles.length >= effectiveGridMax) break

          const x = col * effectiveParticleSize + effectiveParticleSize / 2
          const y = row * effectiveParticleSize + effectiveParticleSize / 2

          const distFromCenter =
            Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            ) / maxDist

          // Aggressively skip edges
          if (distFromCenter > 0.35) {
            const skipChance = ((distFromCenter - 0.35) / 0.65) * 0.95
            if (Math.random() < skipChance) continue
          }

          const size = effectiveParticleSize * (0.7 + Math.random() * 0.3)
          pushParticle(x, y, size, distFromCenter)
        }
        if (tempParticles.length >= effectiveGridMax) break
      }

      // PASS 2: Dense center detail — smaller particles, gaussian distribution
      const centerRadius = Math.min(width, height) * 0.5
      for (let i = 0; i < effectiveCenterExtra; i++) {
        const angle = Math.random() * Math.PI * 2
        // Gaussian-like distribution: more particles toward center
        const u1 = Math.random()
        const u2 = Math.random()
        const gaussR = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        const r = Math.min(Math.abs(gaussR) * 0.4, 1.0) * centerRadius
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        const distFromCenter = r / maxDist
        // Smaller particles for finer detail in center
        const size = effectiveParticleSize * (0.35 + Math.random() * 0.3)
        pushParticle(x, y, size, Math.min(distFromCenter, 0.3))
      }

      // PASS 3: Super-fine center core for image clarity
      const coreRadius = Math.min(width, height) * 0.15
      const CORE_EXTRA = Math.floor(effectiveCenterExtra * 0.4)
      for (let i = 0; i < CORE_EXTRA; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.pow(Math.random(), 0.5) * coreRadius
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        const distFromCenter = r / maxDist
        const size = effectiveParticleSize * (0.25 + Math.random() * 0.2)
        pushParticle(x, y, size, Math.min(distFromCenter, 0.15))
      }

      tempParticles.sort((a, b) => b.distFromCenter - a.distFromCenter)

      const count = tempParticles.length
      particleCountRef.current = count

      // Pack into typed arrays for cache-friendly access during animation
      // Layout per particle: x, y, size, delay, distFromCenter
      const STRIDE = 5
      const floats = new Float32Array(count * STRIDE)
      for (let i = 0; i < count; i++) {
        const p = tempParticles[i]
        const off = i * STRIDE
        floats[off + 0] = p.x
        floats[off + 1] = p.y
        floats[off + 2] = p.size
        floats[off + 3] = p.delay
        floats[off + 4] = p.distFromCenter
      }
      particlesRef.current = floats

      // Pre-group by quantized color for batch rendering
      const groups = new Map()
      for (let i = 0; i < count; i++) {
        const p = tempParticles[i]
        if (!groups.has(p.colorKey)) {
          groups.set(p.colorKey, { r: p.r, g: p.g, b: p.b, indices: [] })
        }
        groups.get(p.colorKey).indices.push(i)
      }
      // Convert indices arrays to typed arrays AND pre-render circle sprites
      const SPRITE_SIZE = 32
      for (const [key, group] of groups) {
        group.indices = new Int32Array(group.indices)
        // Pre-render a colored circle sprite
        const spriteCanvas = document.createElement("canvas")
        spriteCanvas.width = SPRITE_SIZE
        spriteCanvas.height = SPRITE_SIZE
        const sCtx = spriteCanvas.getContext("2d")
        sCtx.fillStyle = `rgb(${group.r},${group.g},${group.b})`
        sCtx.beginPath()
        sCtx.arc(SPRITE_SIZE / 2, SPRITE_SIZE / 2, SPRITE_SIZE / 2, 0, Math.PI * 2)
        sCtx.fill()
        group.sprite = spriteCanvas
      }

      colorGroupsRef.current = groups
      setIsReady(true)
      onLoadRef.current?.()
    }

    img.onerror = () => onLoadRef.current?.()
  }, [src, baseParticleSize, maxGridParticles, extraOnCenter])



  const animate = useCallback((rafTime) => {
    const canvas = canvasRef.current
    const floats = particlesRef.current
    const colorGroups = colorGroupsRef.current
    const count = particleCountRef.current

    if (!canvas || !floats || count === 0) return

    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
    // Track relative time from when animation started/resumed
    if (startTimeRef.current === null) startTimeRef.current = rafTime
    const elapsed = (rafTime - startTimeRef.current) / 1000
    const disperseProgress = disperseProgressRef?.current ?? 0

    // Clear
    ctx.fillStyle = "#050B08"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const cw = canvas.width
    const ch = canvas.height
    const centerX = cw / 2
    const centerY = ch / 2

    const baseAlpha = 0.96 * (1 - disperseProgress * 0.7)
    const disperseFactor =
      disperseProgress > 0 ? disperseProgress * disperseProgress * disperseProgress * 0.5 + disperseProgress * 0.5 : 0

    const STRIDE = 5

    // Render particles
    const useFillRect = isMobileRef.current
    if (useFillRect) {
      // MOBILE: batched fillRect per color group (fastest path)
      for (const [, group] of colorGroups) {
        ctx.fillStyle = `rgba(${group.r},${group.g},${group.b},${baseAlpha})`
        const indices = group.indices
        for (let j = 0; j < indices.length; j++) {
          const off = indices[j] * STRIDE
          const px = floats[off + 0]
          const py = floats[off + 1]
          const pSize = floats[off + 2]
          const pDelay = floats[off + 3]

          const rawProgress = (elapsed - pDelay) * 0.8
          if (rawProgress <= 0.001) continue
          const progress = rawProgress > 1 ? 1 : rawProgress
          const easeProgress = 1 - (1 - progress) * (1 - progress)
          const scale = easeProgress * (1 - disperseProgress * 0.5)

          let disperseX = 0
          let disperseY = 0
          if (disperseFactor > 0.001) {
            let dx = px - centerX
            let dy = py - centerY
            let dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 1) {
              const angle = (indices[j] * 2.399) % (Math.PI * 2)
              dx = Math.cos(angle)
              dy = Math.sin(angle)
              dist = 1
            }
            const invDist = 1 / dist
            const maxDisperse = dist * 1.5 + 300 * disperseFactor
            disperseX = dx * invDist * maxDisperse * disperseFactor
            disperseY = dy * invDist * maxDisperse * disperseFactor
          }

          const diameter = pSize * scale
          if (diameter > 0.8) {
            const half = diameter / 2
            ctx.fillRect(px + disperseX - half, py + disperseY - half, diameter, diameter)
          }
        }
      }
    } else {
      // DESKTOP: sprite-based drawImage (round particles)
      ctx.globalAlpha = baseAlpha
      for (const [, group] of colorGroups) {
        const sprite = group.sprite
        const indices = group.indices
        for (let j = 0; j < indices.length; j++) {
          const off = indices[j] * STRIDE
          const px = floats[off + 0]
          const py = floats[off + 1]
          const pSize = floats[off + 2]
          const pDelay = floats[off + 3]

          const rawProgress = (elapsed - pDelay) * 0.8
          if (rawProgress <= 0.001) continue
          const progress = rawProgress > 1 ? 1 : rawProgress
          const easeProgress = 1 - (1 - progress) * (1 - progress)
          const scale = easeProgress * (1 - disperseProgress * 0.5)

          let disperseX = 0
          let disperseY = 0
          if (disperseFactor > 0.001) {
            let dx = px - centerX
            let dy = py - centerY
            let dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 1) {
              const angle = (indices[j] * 2.399) % (Math.PI * 2)
              dx = Math.cos(angle)
              dy = Math.sin(angle)
              dist = 1
            }
            const invDist = 1 / dist
            const maxDisperse = dist * 1.5 + 300 * disperseFactor
            disperseX = dx * invDist * maxDisperse * disperseFactor
            disperseY = dy * invDist * maxDisperse * disperseFactor
          }

          const diameter = pSize * scale
          if (diameter > 0.8) {
            ctx.drawImage(sprite, px + disperseX - diameter / 2, py + disperseY - diameter / 2, diameter, diameter)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [disperseProgressRef])

  // Pause/resume based on prop
  useEffect(() => {
    if (paused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    } else if (isReady && particlesRef.current && !animationRef.current) {
      startTimeRef.current = null
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [paused, isReady, animate])

  useEffect(() => {
    if (isReady && particlesRef.current) {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      if (!paused) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isReady, animate])

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
