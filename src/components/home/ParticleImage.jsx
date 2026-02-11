"use client"

import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

// Componente individual de partícula rectangular
function Particle({
  x,
  y,
  width,
  height,
  color,
  delay,
  isLoaded,
  vibrateIntensity = 0.5
}) {
  const [isVisible, setIsVisible] = useState(false)
  const vibrateX = useMotionValue(0)
  const vibrateY = useMotionValue(0)
  const springX = useSpring(vibrateX, { stiffness: 400, damping: 15 })
  const springY = useSpring(vibrateY, { stiffness: 400, damping: 15 })

  useEffect(() => {
    if (!isLoaded) return
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay, isLoaded])

  useEffect(() => {
    if (!isVisible) return
    let animationId
    let lastTime = 0
    
    const vibrate = (time) => {
      if (time - lastTime > 33) {
        vibrateX.set((Math.random() - 0.5) * vibrateIntensity)
        vibrateY.set((Math.random() - 0.5) * vibrateIntensity)
        lastTime = time
      }
      animationId = requestAnimationFrame(vibrate)
    }
    
    animationId = requestAnimationFrame(vibrate)
    return () => cancelAnimationFrame(animationId)
  }, [isVisible, vibrateIntensity, vibrateX, vibrateY])

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: x,
        top: y,
        width,
        height,
        x: springX,
        y: springY,
        backgroundColor: color,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1]
      }}
    >
      <div className="absolute inset-0 border-[0.5px] border-green-glow/5" />
    </motion.div>
  )
}

// Calcular colores en chunks para no bloquear el main thread
const calculateColorsInChunks = async (
  imageData,
  gridCols,
  gridRows,
  onProgress
) => {
  const colors = []
  const data = imageData.data
  const rowLength = imageData.width * 4
  const chunkSize = 500 // Procesar 500 partículas por frame
  
  const sampleStep = 3 // Samplear cada 3er pixel para velocidad
  
  return new Promise((resolve) => {
    let index = 0
    
    const processChunk = () => {
      const chunkEnd = Math.min(index + chunkSize, gridCols * gridRows)
      
      for (let i = index; i < chunkEnd; i++) {
        const row = Math.floor(i / gridCols)
        const col = i % gridCols
        
        const imgX = Math.floor((col / gridCols) * imageData.width)
        const imgY = Math.floor((row / gridRows) * imageData.height)
        const sampleW = Math.max(1, Math.floor(imageData.width / gridCols))
        const sampleH = Math.max(1, Math.floor(imageData.height / gridRows))
        
        let r = 0, g = 0, b = 0, count = 0
        
        // Samplear píxeles con step para rendimiento
        for (let y = imgY; y < imgY + sampleH && y < imageData.height; y += sampleStep) {
          for (let x = imgX; x < imgX + sampleW && x < imageData.width; x += sampleStep) {
            const pixelIndex = y * rowLength + x * 4
            r += data[pixelIndex]
            g += data[pixelIndex + 1]
            b += data[pixelIndex + 2]
            count++
          }
        }
        
        colors[i] = count > 0 
          ? `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`
          : 'rgb(15, 61, 46)'
      }
      
      index = chunkEnd
      onProgress?.(index / (gridCols * gridRows))
      
      if (index < gridCols * gridRows) {
        requestAnimationFrame(processChunk)
      } else {
        resolve(colors)
      }
    }
    
    processChunk()
  })
}

export default function ParticleImage({
  src,
  alt,
  className = "",
  particleSize = 5,
  particleGap = 0,
  vibrateIntensity = 0.5,
  loadingDelay = 0,
  scrollZoom = true,
  zoomRange = [1, 3],
  externalScale,
  onLoad
}) {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [particleColors, setParticleColors] = useState([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [progress, setProgress] = useState(0)
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 })
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0, width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], zoomRange)

  // Obtener tamaño del viewport
  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Calcular grid basado en viewport
  useEffect(() => {
    if (viewportSize.width === 0) return
    
    // Limitar número máximo de partículas para rendimiento
    const maxParticles = 8000
    const screenArea = viewportSize.width * viewportSize.height
    const targetParticleArea = screenArea / maxParticles
    let optimalSize = Math.sqrt(targetParticleArea)
    
    // Asegurar tamaño mínimo y máximo razonable
    optimalSize = Math.max(6, Math.min(25, optimalSize))
    
    // Usar el tamaño proporcionado o el óptimo, el que sea mayor
    const finalSize = Math.max(optimalSize, particleSize)
    
    const cols = Math.ceil(viewportSize.width / finalSize)
    const rows = Math.ceil(viewportSize.height / finalSize)
    
    setGridDimensions({
      cols,
      rows,
      width: viewportSize.width,
      height: viewportSize.height,
      finalSize
    })
  }, [viewportSize, particleSize])

  // Generar colores
  useEffect(() => {
    if (gridDimensions.cols === 0) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = async () => {
      // Canvas pequeño para rendimiento (máximo 60px en el lado mayor)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      
      const maxSize = 60
      const scale = Math.min(1, maxSize / img.width, maxSize / img.height)
      canvas.width = Math.max(20, Math.floor(img.width * scale))
      canvas.height = Math.max(20, Math.floor(img.height * scale))
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Calcular colores en chunks
      const colors = await calculateColorsInChunks(
        imageData,
        gridDimensions.cols,
        gridDimensions.rows,
        setProgress
      )
      
      setParticleColors(colors)
      setIsGenerating(false)
      setImageLoaded(true)
      
      setTimeout(() => {
        setIsReady(true)
        onLoad?.()
      }, loadingDelay * 1000)
    }
    
    img.onerror = () => {
      setIsGenerating(false)
      setImageLoaded(true)
      setIsReady(true)
      onLoad?.()
    }
  }, [src, gridDimensions, loadingDelay, onLoad])

  // Generar partículas
  const particles = useMemo(() => {
    if (!imageLoaded || particleColors.length === 0) return []

    const particlesArray = []
    const { cols, rows, width, height, finalSize } = gridDimensions
    
    const totalWidth = cols * finalSize
    const totalHeight = rows * finalSize
    
    const offsetX = (totalWidth - width) / 2
    const offsetY = (totalHeight - height) / 2
    
    const centerCol = cols / 2
    const centerRow = rows / 2
    const maxDistance = Math.sqrt(centerCol * centerCol + centerRow * centerRow)
    
    const totalAnimationTime = 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * finalSize - offsetX
        const y = row * finalSize - offsetY
        const colorIndex = row * cols + col
        
        const distance = Math.sqrt(
          Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
        )
        const normalizedDistance = distance / maxDistance
        
        const easeOutDelay = 1 - Math.pow(1 - normalizedDistance, 2)
        const delay = easeOutDelay * totalAnimationTime + loadingDelay

        particlesArray.push({
          id: `${row}-${col}`,
          x,
          y,
          width: finalSize,
          height: finalSize,
          color: particleColors[colorIndex] || 'rgb(15, 61, 46)',
          delay
        })
      }
    }

    return particlesArray
  }, [imageLoaded, particleColors, gridDimensions, loadingDelay])

  if (isGenerating) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="absolute inset-0 bg-background-dark flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
            <div className="text-xs font-mono text-green-glow/60">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!imageLoaded) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="absolute inset-0 bg-background-dark" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={scrollZoom && !externalScale ? { scale } : externalScale ? { scale: externalScale } : {}}
      >
        <div
          className="relative"
          style={{
            width: gridDimensions.width,
            height: gridDimensions.height
          }}
        >
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              {...particle}
              isLoaded={isReady}
              vibrateIntensity={vibrateIntensity}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
