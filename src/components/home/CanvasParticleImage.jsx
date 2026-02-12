"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function CanvasParticleImage({
  src,
  onLoad,
  baseParticleSize = 14
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef()
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = () => {
      const sampleWidth = 120
      const sampleHeight = Math.floor(sampleWidth * (img.height / img.width))
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
      
      // PASADA 1: Grid base
      const cols = Math.ceil(width / baseParticleSize)
      const rows = Math.ceil(height / baseParticleSize)
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * baseParticleSize + baseParticleSize / 2
          const y = row * baseParticleSize + baseParticleSize / 2
          
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          ) / maxDist
          
          if (distFromCenter > 0.5) {
            const skipChance = (distFromCenter - 0.6) / 0.4 * 0.8
            if (Math.random() < skipChance) continue
          }
          
          const size = baseParticleSize * (0.75 + Math.random() * 0.5)
          addParticle(x, y, size, data, sampleWidth, sampleHeight, width, height, centerX, centerY, maxDist, newParticles)
        }
      }
      
      // PASADA 2: Extra en centro
      const centerRadius = Math.min(width, height) * 1.55
      const extraCount = Math.floor((centerRadius * centerRadius) / (baseParticleSize * baseParticleSize) * 2.0)
      
      for (let i = 0; i < extraCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.pow(Math.random(), 0.7) * centerRadius
        
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        
        const size = baseParticleSize * (0.8 + Math.random() * 0.35)
        addParticle(x, y, size, data, sampleWidth, sampleHeight, width, height, centerX, centerY, maxDist, newParticles, true)
      }
      
      newParticles.sort((a, b) => b.distFromCenter - a.distFromCenter)
      
      particlesRef.current = newParticles
      setIsReady(true)
      onLoad?.()
    }
    
    img.onerror = () => onLoad?.()
  }, [src, baseParticleSize, onLoad])
  
  function addParticle(x, y, size, data, sampleW, sampleH, width, height, centerX, centerY, maxDist, particles, isExtra = false) {
    const normX = Math.max(0, Math.min(1, x / width))
    const normY = Math.max(0, Math.min(1, y / height))
    const imgX = Math.floor(normX * (sampleW - 1))
    const imgY = Math.floor(normY * (sampleH - 1))
    const idx = (imgY * sampleW + imgX) * 4
    
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]
    
    const distFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    ) / maxDist
    
    const jitter = size * 0.25
    const finalX = x + (Math.random() - 0.5) * jitter
    const finalY = y + (Math.random() - 0.5) * jitter
    
    // Delay: centro tiene delay mínimo pequeño, bordes más delay
    // Todas las partículas animan, el centro solo un poco antes
    const delay = 0.2 + distFromCenter * 2.0 // 0.2s mínimo, hasta 2.2s máximo
    
    particles.push({
      x: finalX,
      y: finalY,
      size,
      r,
      g,
      b,
      delay,
      distFromCenter,
      isExtra,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX: 0.3 + Math.random() * 0.4,
      freqY: 0.2 + Math.random() * 0.4,
      amp: 0.8 + distFromCenter * 1.2
    })
  }

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const particles = particlesRef.current
    
    if (!canvas || particles.length === 0) return
    
    const ctx = canvas.getContext('2d')
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    
    ctx.fillStyle = '#050B08'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const time = elapsed
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      
      // ANIMACIÓN MÁS LENTA: factor 0.8 en lugar de 2.2
      const rawProgress = (elapsed - p.delay) * 0.8
      const progress = Math.max(0, Math.min(1, rawProgress))
      if (progress <= 0.001) continue
      
      // Ease más suave al inicio
      const easeProgress = 1 - Math.pow(1 - progress, 2.5)
      const scale = easeProgress
      
      const moveX = Math.sin(time * p.freqX + p.phaseX) * p.amp
      const moveY = Math.cos(time * p.freqY + p.phaseY) * p.amp
      
      const drawX = p.x + moveX
      const drawY = p.y + moveY
      
      const drawSize = p.size * scale
      const radius = drawSize / 2
      
      ctx.beginPath()
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},0.96)`
      ctx.fill()
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }, [])

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
    <div className="relative w-full h-full bg-background-dark overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 25%,
            rgba(5, 11, 8, 0.3) 50%,
            rgba(5, 11, 8, 0.7) 75%,
            rgba(5, 11, 8, 0.9) 100%
          )`
        }}
      />
      
      {/* Blur tenue */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          maskImage: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 35%,
            black 60%,
            black 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 35%,
            black 60%,
            black 100%
          )`,
        }}
      />
      
      {/* Blur fuerte */}
      <div 
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          maskImage: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 55%,
            black 80%,
            black 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 55%,
            black 80%,
            black 100%
          )`,
        }}
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
