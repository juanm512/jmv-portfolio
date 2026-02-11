"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import Image from "next/image"

// Componente individual de partícula rectangular
function Particle({
  x,
  y,
  width,
  height,
  imageUrl,
  totalWidth,
  totalHeight,
  delay,
  isLoaded,
  vibrateIntensity = 0.5
}) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Posición base con vibración aleatoria
  const vibrateX = useMotionValue(0)
  const vibrateY = useMotionValue(0)
  
  // Spring suave para la vibración
  const springX = useSpring(vibrateX, { stiffness: 300, damping: 20 })
  const springY = useSpring(vibrateY, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (!isLoaded) return
    
    // Animación de entrada desde el centro
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
      if (time - lastTime > 50) { // Actualizar cada 50ms
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
      className="absolute overflow-hidden"
      style={{
        left: x,
        top: y,
        width,
        height,
        x: springX,
        y: springY,
      }}
      initial={{ 
        scale: 0, 
        opacity: 0,
        x: totalWidth / 2 - x - width / 2,
        y: totalHeight / 2 - y - height / 2
      }}
      animate={isVisible ? { 
        scale: 1, 
        opacity: 1,
        x: 0,
        y: 0
      } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${-x}px ${-y}px`,
          backgroundSize: `${totalWidth}px ${totalHeight}px`,
          backgroundRepeat: "no-repeat"
        }}
      />
      {/* Borde sutil para definir las partículas */}
      <div className="absolute inset-0 border-[0.5px] border-green-glow/10" />
    </motion.div>
  )
}

// Componente principal de imagen de partículas
export default function ParticleImage({
  src,
  alt,
  className = "",
  particleSize = 40,
  particleGap = 2,
  vibrateIntensity = 0.8,
  loadingDelay = 0,
  scrollZoom = true,
  zoomRange = [1, 3],
  externalScale, // Escala externa desde el contenedor padre
  onLoad
}) {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [isReady, setIsReady] = useState(false)

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

  // Precargar imagen para obtener dimensiones
  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height })
      setImageLoaded(true)
      setTimeout(() => {
        setIsReady(true)
        onLoad?.()
      }, loadingDelay * 1000)
    }
  }, [src, loadingDelay, onLoad])

  // Generar grid de partículas
  const particles = useMemo(() => {
    if (!imageLoaded || imageDimensions.width === 0) return []

    const particlesArray = []
    const effectiveSize = particleSize + particleGap
    
    // Calcular cuántas partículas caben
    const cols = Math.ceil(imageDimensions.width / effectiveSize)
    const rows = Math.ceil(imageDimensions.height / effectiveSize)
    
    const totalWidth = cols * effectiveSize
    const totalHeight = rows * effectiveSize
    
    // Centrar el grid
    const offsetX = (totalWidth - imageDimensions.width) / 2
    const offsetY = (totalHeight - imageDimensions.height) / 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * effectiveSize - offsetX
        const y = row * effectiveSize - offsetY
        
        // Calcular delay basado en distancia al centro (efecto onda)
        const centerCol = cols / 2
        const centerRow = rows / 2
        const distance = Math.sqrt(
          Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
        )
        const maxDistance = Math.sqrt(
          Math.pow(cols / 2, 2) + Math.pow(rows / 2, 2)
        )
        const delay = (distance / maxDistance) * 0.5 + Math.random() * 0.1

        particlesArray.push({
          id: `${row}-${col}`,
          x,
          y,
          width: effectiveSize,
          height: effectiveSize,
          delay,
          totalWidth: imageDimensions.width,
          totalHeight: imageDimensions.height
        })
      }
    }

    return particlesArray
  }, [imageLoaded, imageDimensions, particleSize, particleGap])

  if (!imageLoaded) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="absolute inset-0 bg-green-primary/20 animate-pulse" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height
      }}
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
              imageUrl={src}
              isLoaded={isReady}
              vibrateIntensity={vibrateIntensity}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
