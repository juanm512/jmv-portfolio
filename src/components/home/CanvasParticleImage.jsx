"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function CanvasParticleImage({
  src,
  onLoad,
  particleSize = 12,
  vibrateIntensity = 0.5
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
      // Canvas pequeño para samplear colores
      const sampleSize = 80
      canvas.width = sampleSize
      canvas.height = sampleSize
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
      
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
      const data = imageData.data
      
      // Crear partículas
      const newParticles = []
      const cols = Math.ceil(window.innerWidth / particleSize)
      const rows = Math.ceil(window.innerHeight / particleSize)
      
      const centerX = cols / 2
      const centerY = rows / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Mapear a coordenadas de imagen
          const imgX = Math.floor((col / cols) * sampleSize)
          const imgY = Math.floor((row / rows) * sampleSize)
          const idx = (imgY * sampleSize + imgX) * 4
          
          // Color promedio
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          
          // Distancia al centro para delay
          const dist = Math.sqrt(
            Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2)
          )
          const normalizedDist = dist / maxDist
          
          // Delay: de 0 a 2 segundos, ease-out
          const delay = (1 - Math.pow(1 - normalizedDist, 2)) * 2
          
          newParticles.push({
            x: col * particleSize,
            y: row * particleSize,
            size: particleSize,
            color: `rgb(${r},${g},${b})`,
            delay,
            scale: 0,
            vibeX: 0,
            vibeY: 0
          })
        }
      }
      
      setParticles(newParticles)
      setIsReady(true)
      onLoad?.()
    }
    
    img.onerror = () => onLoad?.()
  }, [src, particleSize, onLoad])

  // Animación
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || particles.length === 0) return
    
    const ctx = canvas.getContext('2d')
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
      // Calcular progreso de animación
      const progress = Math.max(0, Math.min(1, (elapsed - p.delay) * 2))
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      if (progress <= 0) return
      
      // Escala desde 0
      const scale = easeProgress
      
      // Vibración
      const vibeX = Math.sin(elapsed * 10 + p.x * 0.1) * vibrateIntensity
      const vibeY = Math.cos(elapsed * 8 + p.y * 0.1) * vibrateIntensity
      
      const drawSize = p.size * scale
      const drawX = p.x + vibeX
      const drawY = p.y + vibeY
      
      ctx.fillStyle = p.color
      ctx.fillRect(drawX, drawY, drawSize, drawSize)
    })
    
    animationRef.current = requestAnimationFrame(animate)
  }, [particles, vibrateIntensity])

  // Iniciar animación
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
        style={{ imageRendering: 'pixelated' }}
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
