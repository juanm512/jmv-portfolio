"use client"

import { useRef, useEffect, useState, useCallback } from "react"

// Quantize a color to reduce unique fillStyle changes
function quantizeColor(r, g, b, levels = 8) {
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
  disperseProgressRef,
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const colorGroupsRef = useRef(new Map())
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef()
  const startTimeRef = useRef(Date.now())
  const onLoadRef = useRef(onLoad)

  // Keep onLoad ref stable to avoid re-running the image load effect
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
      // Smaller sample for faster pixel reads
      const sampleWidth = 80
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

      const newParticles = []

      // Helper to sample color and push a particle
      function pushParticle(x, y, size, distFromCenter) {
        const normX = Math.max(0, Math.min(1, x / width))
        const normY = Math.max(0, Math.min(1, y / height))
        const imgX = Math.floor(normX * (sampleWidth - 1))
        const imgY = Math.floor(normY * (sampleHeight - 1))
        const idx = (imgY * sampleWidth + imgX) * 4

        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]

        const jitter = size * 0.25
        const finalX = x + (Math.random() - 0.5) * jitter
        const finalY = y + (Math.random() - 0.5) * jitter

        const delay = 0.2 + distFromCenter * 2.0
        const colorKey = quantizeColor(r, g, b)

        newParticles.push({
          x: finalX,
          y: finalY,
          size,
          r,
          g,
          b,
          colorKey,
          delay,
          distFromCenter,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          freqX: 0.4 + Math.random() * 0.3,
          freqY: 0.3 + Math.random() * 0.3,
          amp: 0.8 + distFromCenter * 1.2,
        })
      }

      // PASS 1: Grid base — skip more at edges to leave room for center detail
      const cols = Math.ceil(width / baseParticleSize)
      const rows = Math.ceil(height / baseParticleSize)
      const GRID_MAX = 2200

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (newParticles.length >= GRID_MAX) break

          const x = col * baseParticleSize + baseParticleSize / 2
          const y = row * baseParticleSize + baseParticleSize / 2

          const distFromCenter =
            Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            ) / maxDist

          // Skip more particles at the edges
          if (distFromCenter > 0.4) {
            const skipChance = ((distFromCenter - 0.4) / 0.6) * 0.9
            if (Math.random() < skipChance) continue
          }

          const size = baseParticleSize * (0.75 + Math.random() * 0.5)
          pushParticle(x, y, size, distFromCenter)
        }
        if (newParticles.length >= GRID_MAX) break
      }

      // PASS 2: Extra detail in center — 400 smaller particles for sharpness
      const CENTER_EXTRA = 400
      const centerRadius = Math.min(width, height) * 0.4
      for (let i = 0; i < CENTER_EXTRA; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.pow(Math.random(), 0.6) * centerRadius
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        const distFromCenter = r / (maxDist * Math.min(width, height) / Math.sqrt(width * width + height * height))
        const size = baseParticleSize * (0.55 + Math.random() * 0.35)
        pushParticle(x, y, size, Math.min(distFromCenter, 0.4))
      }

      newParticles.sort((a, b) => b.distFromCenter - a.distFromCenter)

      // Pre-group particles by quantized color for batch rendering
      const groups = new Map()
      for (let i = 0; i < newParticles.length; i++) {
        const p = newParticles[i]
        if (!groups.has(p.colorKey)) {
          // Use the actual RGB of the first particle in each group
          groups.set(p.colorKey, { r: p.r, g: p.g, b: p.b, indices: [] })
        }
        groups.get(p.colorKey).indices.push(i)
      }

      particlesRef.current = newParticles
      colorGroupsRef.current = groups
      setIsReady(true)
      onLoadRef.current?.()
    }

    img.onerror = () => onLoadRef.current?.()
  }, [src, baseParticleSize])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const particles = particlesRef.current
    const colorGroups = colorGroupsRef.current

    if (!canvas || particles.length === 0) return

    const ctx = canvas.getContext("2d")
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const disperseProgress = disperseProgressRef?.current ?? 0

    // Clear
    ctx.fillStyle = "#050B08"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const time = elapsed * 0.3
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const baseAlpha = 0.96 * (1 - disperseProgress * 0.7)
    const disperseFactor =
      disperseProgress > 0 ? Math.pow(disperseProgress, 1.5) : 0

    // Batch render: one beginPath + fill per color group
    for (const [, group] of colorGroups) {
      ctx.fillStyle = `rgba(${group.r},${group.g},${group.b},${baseAlpha})`
      ctx.beginPath()

      for (let j = 0; j < group.indices.length; j++) {
        const p = particles[group.indices[j]]

        // Entrance animation
        const rawProgress = (elapsed - p.delay) * 0.8
        const progress = Math.max(0, Math.min(1, rawProgress))
        if (progress <= 0.001) continue

        const easeProgress = 1 - Math.pow(1 - progress, 2.5)
        const scale = easeProgress * (1 - disperseProgress * 0.5)

        // Organic fluid movement
        const moveX =
          (Math.sin(time * p.freqX + p.phaseX) +
            Math.sin(time * 0.7 + p.phaseY) * 0.5) *
          p.amp *
          0.8
        const moveY =
          (Math.cos(time * p.freqY + p.phaseY) +
            Math.cos(time * 0.6 + p.phaseX) * 0.5) *
          p.amp *
          0.8

        // Disperse outward from center
        let disperseX = 0
        let disperseY = 0
        if (disperseFactor > 0) {
          const dx = p.x - centerX
          const dy = p.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0) {
            const dirX = dx / dist
            const dirY = dy / dist
            const maxDisperse = dist * 1.5 + 300 * disperseFactor
            disperseX = dirX * maxDisperse * disperseFactor
            disperseY = dirY * maxDisperse * disperseFactor
          }
        }

        const drawX = p.x + moveX + disperseX
        const drawY = p.y + moveY + disperseY
        const radius = (p.size * scale) / 2

        if (radius > 0.5) {
          ctx.moveTo(drawX + radius, drawY)
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
        }
      }

      ctx.fill()
    }

    // Vignette drawn directly on canvas — replaces the 2 backdropFilter divs
    const vignetteGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      Math.min(canvas.width, canvas.height) * 0.2,
      centerX,
      centerY,
      maxVignetteRadius(canvas.width, canvas.height)
    )
    vignetteGradient.addColorStop(0, "rgba(5, 11, 8, 0)")
    vignetteGradient.addColorStop(0.4, "rgba(5, 11, 8, 0)")
    vignetteGradient.addColorStop(0.65, "rgba(5, 11, 8, 0.3)")
    vignetteGradient.addColorStop(0.85, "rgba(5, 11, 8, 0.7)")
    vignetteGradient.addColorStop(1.0, "rgba(5, 11, 8, 0.92)")

    ctx.fillStyle = vignetteGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animationRef.current = requestAnimationFrame(animate)
  }, [disperseProgressRef])

  useEffect(() => {
    if (isReady && particlesRef.current.length > 0) {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      animate()
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

function maxVignetteRadius(w, h) {
  return Math.sqrt((w / 2) ** 2 + (h / 2) ** 2)
}
