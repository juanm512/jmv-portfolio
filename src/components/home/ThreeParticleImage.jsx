"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { motion, useScroll, useTransform } from "framer-motion"
import * as THREE from "three"

// Número máximo de partículas para rendimiento
const MAX_PARTICLES = 15000

// Geometría de partícula (cuadrado)
const particleGeometry = new THREE.PlaneGeometry(1, 1)

// Material base
const createParticleMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uProgress;
      
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      attribute float aDistance;
      
      varying vec3 vColor;
      varying float vDistance;
      varying float vAlpha;
      
      // Función de ease-out
      float easeOut(float x) {
        return 1.0 - pow(1.0 - x, 3.0);
      }
      
      void main() {
        vColor = aColor;
        vDistance = aDistance;
        
        // Animación de entrada desde el centro
        float delay = aDistance * 0.8;
        float localProgress = clamp((uProgress - delay) / 0.2, 0.0, 1.0);
        localProgress = easeOut(localProgress);
        
        // Escala desde 0 hasta tamaño final
        float scale = localProgress * aSize;
        
        // Vibration effect (movimiento microscópico)
        float vibeX = sin(uTime * 10.0 + aPhase) * 0.3 * (1.0 - aDistance * 0.5);
        float vibeY = cos(uTime * 8.0 + aPhase) * 0.3 * (1.0 - aDistance * 0.5);
        
        vec3 pos = position;
        pos.x *= scale;
        pos.y *= scale;
        pos.x += vibeX;
        pos.y += vibeY;
        
        // Alpha basado en progreso de animación
        vAlpha = localProgress;
        
        vec4 mvPosition = modelViewMatrix * vec4(instanceMatrix[3].xyz + pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vDistance;
      varying float vAlpha;
      
      void main() {
        // Blur en los costados (partículas más lejanas del centro)
        float blurAmount = smoothstep(0.3, 0.8, vDistance);
        
        // Las partículas del centro son más nítidas
        vec3 finalColor = vColor * (1.0 - blurAmount * 0.4);
        
        // Alpha con blur en bordes
        float alpha = vAlpha * (0.9 - blurAmount * 0.3);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  })
}

// Componente de partículas
function Particles({ imageUrl, onLoad, loadingDelay = 0 }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const { viewport } = useThree()
  
  // Cargar imagen y crear partículas
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl
    
    img.onload = () => {
      // Crear canvas pequeño para samplear colores
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const sampleSize = 80 // Tamaño del grid de sampleo
      canvas.width = sampleSize
      canvas.height = sampleSize
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
      
      // Generar posiciones de partículas con densidad variable
      const positions = []
      const colors = []
      const sizes = []
      const phases = []
      const distances = []
      
      const centerX = 0
      const centerY = 0
      const aspectRatio = viewport.width / viewport.height
      
      for (let i = 0; i < MAX_PARTICLES; i++) {
        // Distribución con más densidad en el centro usando distribución normal
        const angle = Math.random() * Math.PI * 2
        // Radio con distribución que favorece el centro
        const r = Math.sqrt(Math.random()) * Math.sqrt(Math.random()) * 0.8
        
        let x = centerX + Math.cos(angle) * r * aspectRatio
        let y = centerY + Math.sin(angle) * r
        
        // Mapear a coordenadas de imagen
        const imgX = Math.floor(((x / aspectRatio + 1) / 2) * sampleSize)
        const imgY = Math.floor(((-y + 1) / 2) * sampleSize)
        
        // Obtener color
        const idx = (Math.max(0, Math.min(sampleSize - 1, imgY)) * sampleSize + Math.max(0, Math.min(sampleSize - 1, imgX))) * 4
        const rColor = imageData.data[idx] / 255
        const gColor = imageData.data[idx + 1] / 255
        const bColor = imageData.data[idx + 2] / 255
        
        // Calcular distancia al centro
        const dist = Math.sqrt(x * x + y * y)
        
        // Tamaño variable: más grandes en los costados
        const sizeBase = 0.008 + dist * 0.025
        const sizeVariation = (Math.random() - 0.5) * 0.003
        
        positions.push(x * viewport.width, y * viewport.height, 0)
        colors.push(rColor, gColor, bColor)
        sizes.push(Math.max(0.005, sizeBase + sizeVariation))
        phases.push(Math.random() * Math.PI * 2)
        distances.push(dist)
      }
      
      // Actualizar geometría instanciada
      if (meshRef.current) {
        const dummy = new THREE.Object3D()
        
        for (let i = 0; i < MAX_PARTICLES; i++) {
          dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
          dummy.updateMatrix()
          meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        
        meshRef.current.instanceMatrix.needsUpdate = true
        
        // Guardar atributos
        meshRef.current.geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(colors), 3))
        meshRef.current.geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(new Float32Array(sizes), 1))
        meshRef.current.geometry.setAttribute('aPhase', new THREE.InstancedBufferAttribute(new Float32Array(phases), 1))
        meshRef.current.geometry.setAttribute('aDistance', new THREE.InstancedBufferAttribute(new Float32Array(distances), 1))
      }
      
      setIsReady(true)
      setTimeout(() => onLoad?.(), loadingDelay * 1000)
    }
  }, [imageUrl, viewport, onLoad, loadingDelay])
  
  // Animación
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      
      // Animación de progreso de carga (2 segundos)
      if (isReady && progress < 1) {
        const newProgress = Math.min(1, progress + 0.016 / 2) // 60fps * 2s
        setProgress(newProgress)
        materialRef.current.uniforms.uProgress.value = newProgress
      }
    }
  })
  
  const material = useMemo(() => createParticleMaterial(), [])
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[particleGeometry, material, MAX_PARTICLES]}
    />
  )
}

// Escena
function Scene({ imageUrl, onLoad, loadingDelay }) {
  return (
    <>
      <ambientLight intensity={1} />
      <Particles imageUrl={imageUrl} onLoad={onLoad} loadingDelay={loadingDelay} />
    </>
  )
}

// Componente principal
export default function ThreeParticleImage({
  src,
  className = "",
  loadingDelay = 0,
  onLoad,
  scrollProgress,
  zoomRange = [1, 3]
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef()
  
  // Zoom basado en scroll
  const scale = useTransform(scrollProgress || 0, [0, 1], zoomRange)
  
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Canvas de Three.js */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]} // Limitar DPR para rendimiento
        >
          <Scene 
            imageUrl={src} 
            onLoad={() => {
              setIsLoaded(true)
              onLoad?.()
            }}
            loadingDelay={loadingDelay}
          />
        </Canvas>
      </motion.div>
      
      {/* Overlay mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background-dark flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none z-20" />
    </div>
  )
}
