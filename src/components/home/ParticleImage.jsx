"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

// Componente individual de partícula rectangular con color promedio
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
  
  // Posición base con vibración aleatoria
  const vibrateX = useMotionValue(0)
  const vibrateY = useMotionValue(0)
  
  // Spring suave para la vibración
  const springX = useSpring(vibrateX, { stiffness: 400, damping: 15 })
  const springY = useSpring(vibrateY, { stiffness: 400, damping: 15 })

  useEffect(() => {
    if (!isLoaded) return
    
    // Animación de entrada con delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [delay, isLoaded])

  // Efecto de vibración continua
  useEffect(() => {
    if (!isVisible) return
    
    let animationId
    let lastTime = 0
    
    const vibrate = (time) => {
      if (time - lastTime > 33) { // ~30fps
        const offsetX = (Math.random() - 0.5) * vibrateIntensity
        const offsetY = (Math.random() - 0.5) * vibrateIntensity
        vibrateX.set(offsetX)
        vibrateY.set(offsetY)
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
      initial={{ 
        scale: 0, 
        opacity: 0
      }}
      animate={isVisible ? { 
        scale: 1, 
        opacity: 1
      } : {}}
      transition={{
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1] // ease-out: lento al principio, rápido al final
      }}
    >
      {/* Borde sutil para definir las partículas */}
      <div className="absolute inset-0 border-[0.5px] border-green-glow/5" />
    </motion.div>
  )
}

// Función para calcular el color promedio de una región de una imagen
function getAverageColor(imageData, startX, startY, width, height, totalWidth) {
  let r = 0, g = 0, b = 0
  let count = 0

  const data = imageData.data
  const rowLength = totalWidth * 4

  for (let y = startY; y < startY + height && y < imageData.height; y++) {
    for (let x = startX; x < startX + width && x < imageData.width; x++) {
      const index = y * rowLength + x * 4
      r += data[index]
      g += data[index + 1]
      b += data[index + 2]
      count++
    }
  }

  if (count === 0) return 'rgb(15, 61, 46)' // color verde por defecto

  return `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`
}

// Componente principal de imagen de partículas
export default function ParticleImage({
  src,
  alt,
  className = "",
  particleSize = 5, // 1/4 del tamaño anterior (era 20)
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
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [isReady, setIsReady] = useState(false)
  const [particleColors, setParticleColors] = useState([])
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 })

  // Scroll progress para zoom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    zoomRange
  )

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

  // Precargar imagen y calcular colores promedio
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = src
    
    img.onload = () => {
      // Crear canvas para extraer colores
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Redimensionar para rendimiento (máximo 200px de ancho)
      const scaleFactor = Math.min(1, 200 / img.width)
      canvas.width = img.width * scaleFactor
      canvas.height = img.height * scaleFactor
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Calcular dimensiones para cover
      const imageAspect = img.width / img.height
      const viewportAspect = viewportSize.width / viewportSize.height
      
      let renderWidth, renderHeight
      
      if (imageAspect > viewportAspect) {
        renderHeight = viewportSize.height
        renderWidth = renderHeight * imageAspect
      } else {
        renderWidth = viewportSize.width
        renderHeight = renderWidth / imageAspect
      }
      
      // Tamaño de partícula efectivo (1/4 del original)
      const effectiveSize = Math.max(3, particleSize)
      
      // Calcular grid
      const cols = Math.ceil(renderWidth / effectiveSize)
      const rows = Math.ceil(renderHeight / effectiveSize)
      
      // Calcular colores para cada partícula
      const colors = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Mapear coordenadas del grid a la imagen escalada
          const imgX = Math.floor((col * effectiveSize / renderWidth) * canvas.width)
          const imgY = Math.floor((row * effectiveSize / renderHeight) * canvas.height)
          const sampleWidth = Math.max(1, Math.floor(effectiveSize / renderWidth * canvas.width))
          const sampleHeight = Math.max(1, Math.floor(effectiveSize / renderHeight * canvas.height))
          
          const color = getAverageColor(imageData, imgX, imgY, sampleWidth, sampleHeight, canvas.width)
          colors.push(color)
        }
      }
      
      setParticleColors(colors)
      setImageDimensions({ width: renderWidth, height: renderHeight })
      setImageLoaded(true)
      
      setTimeout(() => {
        setIsReady(true)
        onLoad?.()
      }, loadingDelay * 1000)
    }
    
    img.onerror = () => {
      // Fallback si la imagen no carga
      setImageDimensions({ 
        width: viewportSize.width, 
        height: viewportSize.height 
      })
      setImageLoaded(true)
      setIsReady(true)
      onLoad?.()
    }
  }, [src, loadingDelay, onLoad, viewportSize, particleSize])

  // Generar grid de partículas
  const particles = useMemo(() => {
    if (!imageLoaded || imageDimensions.width === 0 || particleColors.length === 0) return []

    const particlesArray = []
    const effectiveSize = Math.max(3, particleSize)
    
    const cols = Math.ceil(imageDimensions.width / effectiveSize)
    const rows = Math.ceil(imageDimensions.height / effectiveSize)
    
    const totalWidth = cols * effectiveSize
    const totalHeight = rows * effectiveSize
    
    // Centrar el grid
    const offsetX = (totalWidth - imageDimensions.width) / 2
    const offsetY = (totalHeight - imageDimensions.height) / 2
    
    // Centro del grid
    const centerCol = cols / 2
    const centerRow = rows / 2
    const maxDistance = Math.sqrt(centerCol * centerCol + centerRow * centerRow)

    // Tiempo total de animación: 2 segundos
    const totalAnimationTime = 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * effectiveSize - offsetX
        const y = row * effectiveSize - offsetY
        const colorIndex = row * cols + col
        
        // Calcular delay basado en distancia al centro (efecto onda desde centro)
        const distance = Math.sqrt(
          Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
        )
        const normalizedDistance = distance / maxDistance
        
        // Ease-out: más lento al inicio (centro), más rápido al final (bordes)
        // Usamos ease-out curve: 1 - (1 - x)^2
        const easeOutDelay = 1 - Math.pow(1 - normalizedDistance, 2)
        const delay = easeOutDelay * totalAnimationTime + loadingDelay

        particlesArray.push({
          id: `${row}-${col}`,
          x,
          y,
          width: effectiveSize,
          height: effectiveSize,
          color: particleColors[colorIndex] || 'rgb(15, 61, 46)',
          delay
        })
      }
    }

    return particlesArray
  }, [imageLoaded, imageDimensions, particleSize, particleColors, loadingDelay])

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
            width: imageDimensions.width,
            height: imageDimensions.height
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
