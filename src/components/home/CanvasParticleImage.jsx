"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function CanvasParticleImage({
  src,
  onLoad,
  baseSize = 18,
  vibrateIntensity = 1.2
}) {
  const canvasRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef()
  const startTimeRef = useRef(Date.now())

  // Cargar imagen y generar partículas
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = () => {
      // Canvas para samplear colores
      const sampleSize = 100
      canvas.width = sampleSize
      canvas.height = sampleSize
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
      
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
      const data = imageData.data
      
      // Generar partículas con distribución orgánica (no grid exacto)
      const newParticles = []
      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
      
      // Más partículas en el centro, menos en bordes
      // Usamos distribución polar con densidad variable
      const totalParticles = 3500
      
      for (let i = 0; i < totalParticles; i++) {
        // Distribución con más densidad en centro
        const angle = Math.random() * Math.PI * 2
        // Radio con distribución que favorece el centro (raíz cuadrada de random)
        const r = Math.sqrt(Math.random()) * maxDist * 1.2 // 1.2 para cubrir bordes
        
        // Posición base
        let x = centerX + Math.cos(angle) * r
        let y = centerY + Math.sin(angle) * r
        
        // Jitter aleatorio para romper el patrón circular
        x += (Math.random() - 0.5) * baseSize * 2
        y += (Math.random() - 0.5) * baseSize * 2
        
        // Calcular distancia desde centro (0-1)
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        ) / maxDist
        
        // Mapear a coordenadas de imagen
        const imgX = Math.floor(((x / width)) * sampleSize)
        const imgY = Math.floor(((y / height)) * sampleSize)
        const clampedX = Math.max(0, Math.min(sampleSize - 1, imgX))
        const clampedY = Math.max(0, Math.min(sampleSize - 1, imgY))
        const idx = (clampedY * sampleSize + clampedX) * 4
        
        // Color
        const rCol = data[idx]
        const gCol = data[idx + 1]
        const bCol = data[idx + 2]
        
        // Tamaño variable: más grandes en bordes para overlap
        // En centro: tamaño base, en bordes: hasta 2x
        const sizeMultiplier = 1 + distFromCenter * 1.5
        const size = baseSize * sizeMultiplier
        
        // Delay para animación desde centro
        const delay = distFromCenter * 1.5
        
        // Blur amount: más blur en bordes
        const blur = distFromCenter * 3
        
        newParticles.push({
          x,
          y,
          size,
          color: `rgb(${rCol},${gCol},${bCol})`,
          delay,
          distFactor: distFromCenter,
          blur,
          scale: 0,
          // Offset de fase único para vibración
          phase: Math.random() * Math.PI * 2
        })
      }
      
      setParticles(newParticles)
      setIsReady(true)
      onLoad?.()
    }
    
    img.onerror = () => onLoad?.()
  }, [src, baseSize, onLoad])

  // Animación
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || particles.length === 0) return
    
    const ctx = canvas.getContext('2d')
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Dibujar partículas de afuera hacia adentro (painter's algorithm)
    // Ordenar por distancia (mayor distancia primero = dibujar primero)
    const sortedParticles = [...particles].sort((a, b) => b.distFactor - a.distFactor)
    
    sortedParticles.forEach(p => {
      // Progreso de animación
      const progress = Math.max(0, Math.min(1, (elapsed - p.delay) * 1.5))
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      if (progress <= 0) return
      
      const scale = easeProgress
      
      // Vibración: más en bordes, menos en centro
      const vibeAmount = vibrateIntensity * p.distFactor
      const vibeX = Math.sin(elapsed * 8 + p.phase) * vibeAmount
      const vibeY = Math.cos(elapsed * 6 + p.phase) * vibeAmount
      
      const drawSize = p.size * scale
      const drawX = p.x + vibeX
      const drawY = p.y + vibeY
      const radius = drawSize / 2
      
      ctx.beginPath()
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      
      // Aplicar blur si es necesario
      if (p.blur > 0) {
        ctx.filter = `blur(${p.blur}px)`
      } else {
        ctx.filter = 'none'
      }
      
      ctx.fill()
      ctx.filter = 'none' // Reset
    })
    
    // Efecto de vignette/blur en bordes (overlay)
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.8
    )
    gradient.addColorStop(0, 'rgba(5, 11, 8, 0)')
    gradient.addColorStop(0.6, 'rgba(5, 11, 8, 0.3)')
    gradient.addColorStop(1, 'rgba(5, 11, 8, 0.85)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    animationRef.current = requestAnimationFrame(animate)
  }, [particles, vibrateIntensity])

  useEffect(() => {
    if (isReady && particles.length > 0) {
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
  }, [isReady, particles, animate])

  return (
    <div className="relative w-full h-full bg-background-dark">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
