"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CSSMaskImage({ src, onLoad }) {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setLoaded(true)
      onLoad?.()
    }
    img.onerror = () => onLoad?.()
  }, [src, onLoad])

  return (
    <div className="relative w-full h-full overflow-hidden bg-background-dark">
      {/* Capa base con la imagen */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Imagen con efecto de pixelado/mosaico */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Efecto de pixelado
            imageRendering: 'pixelated',
            filter: 'contrast(1.1)',
          }}
        />
      </motion.div>
      
      {/* Overlay de grid para simular partículas */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(5, 11, 8, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 11, 8, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Efecto de vibración con CSS */}
      {loaded && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, 0.5, -0.5, 0.3, -0.3, 0],
            y: [0, -0.3, 0.5, -0.5, 0.3, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-dark">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

// Versión alternativa con CSS mask más avanzada
export function CSSMaskDotted({ src, onLoad }) {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setLoaded(true)
      onLoad?.()
    }
    img.onerror = () => onLoad?.()
  }, [src, onLoad])

  return (
    <div className="relative w-full h-full overflow-hidden bg-background-dark">
      {/* Imagen con máscara de puntos */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Máscara de círculos/puntos
          maskImage: `radial-gradient(circle at center, black 2px, transparent 2.5px)`,
          maskSize: '12px 12px',
          WebkitMaskImage: `radial-gradient(circle at center, black 2px, transparent 2.5px)`,
          WebkitMaskSize: '12px 12px',
        }}
      />
      
      {/* Capa de color para el efecto */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-50"
        style={{
          background: 'radial-gradient(circle at center, #0F3D2E 0%, transparent 70%)'
        }}
      />
      
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-dark">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
