"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 4000

function Particles({ imageUrl, onLoad }) {
  const meshRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const startTime = useRef(Date.now())
  
  // Generar datos de partículas
  const particleData = useMemo(() => {
    const positions = []
    const colors = []
    const sizes = []
    const delays = []
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribución circular con más densidad en el centro
      const angle = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 0.5) * 2 // Radio máximo 2
      
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      
      positions.push(x, y, 0)
      colors.push(1, 1, 1) // Temporal, se actualiza con la imagen
      
      // Tamaño: más grandes en los bordes
      sizes.push(0.15 + r * 0.1)
      
      // Delay para animación desde centro
      delays.push(r / 2)
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes),
      delays: new Float32Array(delays)
    }
  }, [])
  
  // Cargar colores de imagen
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 50
      canvas.height = 50
      ctx.drawImage(img, 0, 0, 50, 50)
      
      const data = ctx.getImageData(0, 0, 50, 50).data
      const newColors = []
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = particleData.positions[i * 3]
        const y = particleData.positions[i * 3 + 1]
        
        // Mapear posición a coordenadas de imagen
        const imgX = Math.floor(((x / 2 + 1) / 2) * 49)
        const imgY = Math.floor(((-y / 2 + 1) / 2) * 49)
        
        const clampedX = Math.max(0, Math.min(49, imgX))
        const clampedY = Math.max(0, Math.min(49, imgY))
        
        const idx = (clampedY * 50 + clampedX) * 4
        
        newColors.push(
          data[idx] / 255,
          data[idx + 1] / 255,
          data[idx + 2] / 255
        )
      }
      
      // Actualizar atributo de color
      if (meshRef.current) {
        const geometry = meshRef.current.geometry
        geometry.setAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(newColors), 3))
        geometry.attributes.color.needsUpdate = true
      }
      
      setLoaded(true)
      onLoad?.()
    }
    
    img.onerror = () => {
      setLoaded(true)
      onLoad?.()
    }
  }, [imageUrl, particleData, onLoad])
  
  // Crear geometría
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1)
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3))
    geo.setAttribute('color', new THREE.InstancedBufferAttribute(particleData.colors, 3))
    geo.setAttribute('size', new THREE.InstancedBufferAttribute(particleData.sizes, 1))
    geo.setAttribute('delay', new THREE.InstancedBufferAttribute(particleData.delays, 1))
    return geo
  }, [particleData])
  
  // Material con shader
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 }
      },
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        attribute float delay;
        varying vec3 vColor;
        varying float vDist;
        uniform float uTime;
        uniform float uProgress;
        
        float easeOut(float x) {
          return 1.0 - pow(1.0 - x, 3.0);
        }
        
        void main() {
          vColor = color;
          vDist = length(position.xy);
          
          // Animación de entrada
          float anim = clamp((uProgress - delay) * 2.0, 0.0, 1.0);
          anim = easeOut(anim);
          
          // Vibración sutil
          float vx = sin(uTime * 8.0 + position.x * 10.0) * 0.01;
          float vy = cos(uTime * 6.0 + position.y * 10.0) * 0.01;
          
          vec3 pos = position;
          pos.x += vx;
          pos.y += vy;
          
          // Escalar desde 0 hasta tamaño final
          float finalSize = size * anim;
          pos.xy *= finalSize;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDist;
        
        void main() {
          // Blur en bordes
          float blur = smoothstep(1.0, 2.0, vDist);
          vec3 finalColor = vColor * (1.0 - blur * 0.4);
          float alpha = 0.95 - blur * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }, [])
  
  // Crear instanced mesh
  useEffect(() => {
    if (meshRef.current && geometry) {
      const dummy = new THREE.Object3D()
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        dummy.position.set(
          particleData.positions[i * 3],
          particleData.positions[i * 3 + 1],
          particleData.positions[i * 3 + 2]
        )
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [geometry, particleData])
  
  // Animación
  useFrame(() => {
    if (material) {
      material.uniforms.uTime.value = Date.now() * 0.001
      const elapsed = (Date.now() - startTime.current) / 1000
      material.uniforms.uProgress.value = Math.min(1.5, elapsed / 2)
    }
  })
  
  if (!geometry) return null
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, PARTICLE_COUNT]}
    />
  )
}

function Scene({ imageUrl, onLoad }) {
  return (
    <>
      <ambientLight intensity={1} />
      <Particles imageUrl={imageUrl} onLoad={onLoad} />
    </>
  )
}

export default function ThreeParticleImage({ src, onLoad }) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <div className="relative w-full h-full bg-background-dark">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 55 }}
          gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance"
          }}
          dpr={[1, 1.5]}
        >
          <Scene 
            imageUrl={src} 
            onLoad={() => {
              setIsLoaded(true)
              onLoad?.()
            }}
          />
        </Canvas>
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-background-dark flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-green-glow/30 border-t-green-glow rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
