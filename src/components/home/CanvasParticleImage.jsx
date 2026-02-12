"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function CanvasParticleImage({
  src,
  onLoad,
  baseSize = 16,
  vibrateIntensity = 1
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef()
  const startTimeRef = useRef(Date.now())
  const frameCountRef = useRef(0)

  // Cargar imagen y generar partículas
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = () => {
      // Canvas más grande para mejor resolución de colores
      const sampleSize = 120
      canvas.width = sampleSize
      canvas.height = sampleSize
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
      
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
      const data = imageData.data
      
      // Menos partículas para rendimiento (1500 en lugar de 3500)
      const newParticles = []
      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
      
      const totalParticles = 1500
      
      for (let i = 0; i < totalParticles; i++) {
        const angle = Math.random() * Math.PI * 2
        // Menos concentración extrema en centro
        const r = Math.pow(Math.random(), 0.7) * maxDist * 1.1
        
        let x = centerX + Math.cos(angle) * r
        let y = centerY + Math.sin(angle) * r
        
        // Jitter moderado
        x += (Math.random() - 0.5) * baseSize
        y += (Math.random() - 0.5) * baseSize
        
        // Clamp a pantalla
        x = Math.max(0, Math.min(width, x))
        y = Math.max(0, Math.min(height, y))
        
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        ) / maxDist
        
        // Sampleo de color más preciso
        const normX = x / width
        const normY = y / height
        const imgX = Math.floor(normX * sampleSize)
        const imgY = Math.floor(normY * sampleSize)
        const idx = (imgY * sampleSize + imgX) * 4
        
        // Tamaño: más grandes en bordes para overlap
        const size = baseSize * (0.8 + distFromCenter * 0.8)
        
        newParticles.push({
          x,
          y,
          size,
          r: data[idx],
          g: data[idx + 1],
          b: data[idx + 2],
          delay: distFromCenter * 1.2,
          distFactor: distFromCenter,
          phase: Math.random() * Math.PI * 2
        })
      }
      
      // Ordenar una sola vez de afuera hacia adentro
      newParticles.sort((a, b) => b.distFactor - a.distFactor)
      
      particlesRef.current = newParticles
      setIsReady(true)
      onLoad?.()
    }
    
    img.onerror = () => onLoad?.()
  }, [src, baseSize, onLoad])

  // Animación optimizada
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const particles = particlesRef.current
    
    if (!canvas || particles.length === 0) return
    
    const ctx = canvas.getContext('2d')
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    
    // Limpiar
    ctx.fillStyle = '#050B08'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Reducir frecuencia de actualización de vibración para rendimiento
    frameCountRef.current++
    const updateVibe = frameCountRef.current % 2 === 0 // Cada 2 frames
    
    // Dibujar partículas
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      
      const progress = Math.max(0, Math.min(1, (elapsed - p.delay) * 1.8))
      if (progress <= 0) continue
      
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const scale = easeProgress
      
      // Vibración calculada solo cada 2 frames
      let drawX = p.x
      let drawY = p.y
      
      if (updateVibe && p.distFactor > 0.1) {
        const vibeAmount = vibrateIntensity * p.distFactor
        drawX += Math.sin(elapsed * 6 + p.phase) * vibeAmount
        drawY += Math.cos(elapsed * 5 + p.phase) * vibeAmount
      }
      
      const drawSize = p.size * scale
      const radius = drawSize / 2
      
      // Color con opacidad basada en distancia (más transparente en bordes)
      const alpha = 0.95 - p.distFactor * 0.25
      
      ctx.beginPath()
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`
      ctx.fill()
    }
    
    // Vignette/blur en bordes (una sola vez por frame)
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width * 0.35,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.75
    )
    gradient.addColorStop(0, 'rgba(5, 11, 8, 0)')
    gradient.addColorStop(0.5, 'rgba(5, 11, 8, 0.2)')
    gradient.addColorStop(0.85, 'rgba(5, 11, 8, 0.7)')
    gradient.addColorStop(1, 'rgba(5, 11, 8, 0.9)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    animationRef.current = requestAnimationFrame(animate)
  }, [vibrateIntensity])

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
    <div className="relative w-full h-full bg-background-dark">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
