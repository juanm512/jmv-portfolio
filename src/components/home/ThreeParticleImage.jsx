"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 6000

function Particles({ imageUrl, onLoad }) {
  const meshRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const startTime = useRef(Date.now())
  
  // Datos de instancia
  const { positions, colors, scales, delays } = useMemo(() => {
    const pos = []
    const col = []
    const scl = []
    const del = []
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 0.6) * 3
      
      pos.push(Math.cos(angle) * r, Math.sin(angle) * r, 0)
      col.push(1, 1, 1)
      scl.push(1)
      del.push(r / 3)
    }
    
    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      scales: new Float32Array(scl),
      delays: new Float32Array(del)
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
        const x = positions[i * 3]
        const y = positions[i * 3 + 1]
        
        const imgX = Math.floor(((x / 3 + 1) / 2) * 49)
        const imgY = Math.floor(((-y / 3 + 1) / 2) * 49)
        const idx = (Math.max(0, Math.min(49, imgY)) * 50 + Math.max(0, Math.min(49, imgX))) * 4
        
        newColors.push(data[idx] / 255, data[idx + 1] / 255, data[idx + 2] / 255)
      }
      
      if (meshRef.current) {
        meshRef.current.geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(newColors), 3))
        meshRef.current.geometry.attributes.aColor.needsUpdate = true
      }
      
      setLoaded(true)
      onLoad?.()
    }
    
    img.onerror = () => {
      setLoaded(true)
      onLoad?.()
    }
  }, [imageUrl, positions, onLoad])
  
  // Shader
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uProgress;
        attribute vec3 aColor;
        attribute float aScale;
        attribute float aDelay;
        varying vec3 vColor;
        varying float vBlur;
        
        float easeOut(float x) {
          return 1.0 - pow(1.0 - x, 3.0);
        }
        
        void main() {
          vColor = aColor;
          
          float dist = length(position.xy);
          vBlur = smoothstep(0.8, 3.0, dist);
          
          float anim = clamp((uProgress - aDelay) * 1.5, 0.0, 1.0);
          anim = easeOut(anim);
          
          float vibe = sin(uTime * 10.0 + position.x * 5.0) * 0.015;
          
          vec3 pos = position;
          pos.x += vibe;
          pos.y += cos(uTime * 8.0 + position.y * 5.0) * 0.015;
          
          float size = (0.04 + dist * 0.03) * anim;
          pos.xy *= size;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vBlur;
        
        void main() {
          vec3 finalColor = vColor * (1.0 - vBlur * 0.6);
          float alpha = 0.9 - vBlur * 0.5;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false
    })
  }, [])
  
  // Geometría base (cuadrado)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1)
    geo.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3))
    geo.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1))
    geo.setAttribute('aDelay', new THREE.InstancedBufferAttribute(delays, 1))
    return geo
  }, [colors, scales, delays])
  
  // Instanced mesh
  const mesh = useMemo(() => {
    const m = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT)
    const dummy = new THREE.Object3D()
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    
    m.instanceMatrix.needsUpdate = true
    return m
  }, [geometry, material, positions])
  
  // Animación
  useFrame(() => {
    if (material) {
      material.uniforms.uTime.value = Date.now() * 0.001
      const elapsed = (Date.now() - startTime.current) / 1000
      material.uniforms.uProgress.value = Math.min(1.5, elapsed / 2)
    }
  })
  
  return <primitive ref={meshRef} object={mesh} />
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
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={1}
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
