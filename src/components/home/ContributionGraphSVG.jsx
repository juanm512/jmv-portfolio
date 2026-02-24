"use client"

import { useState, useEffect } from "react"
import { motion, useTransform, useSpring } from "framer-motion"

const FloatingParticles = ({ count = 60, fillOpacity }) => {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    // Generate particles client-side to avoid hydration errors since we use Math.random()
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 920, // distribute across the SVG width
      y: 120 + Math.random() * 140, // distribute mostly in the bottom half of the SVG (120 to 260)
      size: 0.5 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      yOffset: -20 - Math.random() * 40
    }))
    setParticles(newParticles)
  }, [count])

  // Tie overall visibility to the graph's fill opacity, but animate individually
  return (
    <motion.g style={{ opacity: fillOpacity }}>
      {particles.map(p => (
        <motion.circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={p.size}
          fill="#00ff87"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, p.yOffset]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.g>
  )
}

export default function ContributionGraphSVG({ scrollProgress }) {
  // Graph enters between 0.0 and 0.15
  const pathLength = useTransform(scrollProgress, [0.0, 0.15], [0, 1])
  // The fill fades in slightly after the line draws
  const fillOpacity = useTransform(scrollProgress, [0.05, 0.2], [0, 1])
  // The dots at the end pop in when the line finishes
  const dotScale = useTransform(scrollProgress, [0.14, 0.18], [0, 1])
  
  // The entire graph fades out at the very end (0.8 -> 0.9)
  const exitOpacity = useTransform(scrollProgress, [0.8, 0.9], [1, 0])
  const yExit = useTransform(scrollProgress, [0.8, 0.9], [0, -50])

  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center p-4 md:p-8"
      style={{ opacity: exitOpacity, y: yExit }}
    >
      <svg 
        viewBox="0 0 920 300" 
        role="img" 
        aria-label="Monthly contribution trend"
        className="w-full h-auto drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.2"></stop>
            <stop offset="100%" stopColor="#00ff87" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.4"></stop>
            <stop offset="30%" stopColor="#00ff87" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#00ff87" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <line x1="0" y1="82" x2="920" y2="82" stroke="rgba(255,255,255,0.04)" strokeWidth="1"></line>
        <line x1="0" y1="144" x2="920" y2="144" stroke="rgba(255,255,255,0.04)" strokeWidth="1"></line>
        <line x1="0" y1="206" x2="920" y2="206" stroke="rgba(255,255,255,0.04)" strokeWidth="1"></line>
        
        {/* Animated Area Fill */}
        <motion.path 
          d="M0,268 L10.823529411764707,268 L21.647058823529413,268 L32.470588235294116,268 L43.294117647058826,268 L54.11764705882353,268 L64.94117647058823,268 L75.76470588235294,268 L86.58823529411765,268 L97.41176470588235,268 L108.23529411764706,268 L119.05882352941178,268 L129.88235294117646,268 L140.7058823529412,268 L151.52941176470588,268 L162.3529411764706,268 L173.1764705882353,268 L184,268 L194.8235294117647,268 L205.64705882352942,268 L216.47058823529412,268 L227.29411764705884,268 L238.11764705882356,268 L248.94117647058823,268 L259.7647058823529,268 L270.5882352941177,268 L281.4117647058824,268 L292.235294117647,268 L303.05882352941177,246.11764705882354 L313.88235294117646,246.11764705882354 L324.7058823529412,246.11764705882354 L335.52941176470586,268 L346.3529411764706,268 L357.1764705882353,268 L368,268 L378.8235294117647,268 L389.6470588235294,268 L400.47058823529414,268 L411.29411764705884,235.1764705882353 L422.11764705882354,209.6470588235294 L432.94117647058823,198.7058823529412 L443.7647058823529,216.94117647058826 L454.5882352941177,238.8235294117647 L465.4117647058823,202.3529411764706 L476.23529411764713,198.7058823529412 L487.05882352941177,202.3529411764706 L497.88235294117646,246.11764705882354 L508.7058823529412,260.7058823529412 L519.5294117647059,169.5294117647059 L530.3529411764705,136.70588235294116 L541.1764705882354,20 L552,96.58823529411765 L562.8235294117648,125.76470588235296 L573.6470588235294,238.8235294117647 L584.470588235294,213.2941176470588 L595.2941176470589,216.94117647058826 L606.1176470588235,224.23529411764704 L616.9411764705882,268 L627.7647058823529,268 L638.5882352941177,268 L649.4117647058824,242.47058823529412 L660.2352941176471,202.3529411764706 L671.0588235294117,118.47058823529413 L681.8823529411765,56.47058823529412 L692.7058823529412,74.70588235294117 L703.5294117647059,129.41176470588235 L714.3529411764706,173.1764705882353 L725.1764705882352,133.05882352941177 L736,162.23529411764704 L746.8235294117648,180.4705882352941 L757.6470588235294,224.23529411764704 L768.4705882352941,173.1764705882353 L779.2941176470588,118.47058823529413 L790.1176470588235,60.11764705882352 L800.9411764705883,41.88235294117648 L811.7647058823529,114.8235294117647 L822.5882352941177,136.70588235294116 L833.4117647058823,202.3529411764706 L844.2352941176471,213.2941176470588 L855.0588235294118,260.7058823529412 L865.8823529411765,242.47058823529412 L876.7058823529411,176.8235294117647 L887.5294117647059,74.70588235294117 L898.3529411764706,49.176470588235304 L909.1764705882354,41.88235294117648 L909.1764705882354,268 L0,268 Z" 
          fill="url(#area-fill)"
          style={{ opacity: fillOpacity }}
        ></motion.path>
        
        {/* Floating Particles Overlay */}
        <FloatingParticles fillOpacity={fillOpacity} count={60} />
        
        {/* Animated Polyline Chart stroke */}
        <motion.polyline  
          points="0,268 10.823529411764707,268 21.647058823529413,268 32.470588235294116,268 43.294117647058826,268 54.11764705882353,268 64.94117647058823,268 75.76470588235294,268 86.58823529411765,268 97.41176470588235,268 108.23529411764706,268 119.05882352941178,268 129.88235294117646,268 140.7058823529412,268 151.52941176470588,268 162.3529411764706,268 173.1764705882353,268 184,268 194.8235294117647,268 205.64705882352942,268 216.47058823529412,268 227.29411764705884,268 238.11764705882356,268 248.94117647058823,268 259.7647058823529,268 270.5882352941177,268 281.4117647058824,268 292.235294117647,268 303.05882352941177,246.11764705882354 313.88235294117646,246.11764705882354 324.7058823529412,246.11764705882354 335.52941176470586,268 346.3529411764706,268 357.1764705882353,268 368,268 378.8235294117647,268 389.6470588235294,268 400.47058823529414,268 411.29411764705884,235.1764705882353 422.11764705882354,209.6470588235294 432.94117647058823,198.7058823529412 443.7647058823529,216.94117647058826 454.5882352941177,238.8235294117647 465.4117647058823,202.3529411764706 476.23529411764713,198.7058823529412 487.05882352941177,202.3529411764706 497.88235294117646,246.11764705882354 508.7058823529412,260.7058823529412 519.5294117647059,169.5294117647059 530.3529411764705,136.70588235294116 541.1764705882354,20 552,96.58823529411765 562.8235294117648,125.76470588235296 573.6470588235294,238.8235294117647 584.470588235294,213.2941176470588 595.2941176470589,216.94117647058826 606.1176470588235,224.23529411764704 616.9411764705882,268 627.7647058823529,268 638.5882352941177,268 649.4117647058824,242.47058823529412 660.2352941176471,202.3529411764706 671.0588235294117,118.47058823529413 681.8823529411765,56.47058823529412 692.7058823529412,74.70588235294117 703.5294117647059,129.41176470588235 714.3529411764706,173.1764705882353 725.1764705882352,133.05882352941177 736,162.23529411764704 746.8235294117648,180.4705882352941 757.6470588235294,224.23529411764704 768.4705882352941,173.1764705882353 779.2941176470588,118.47058823529413 790.1176470588235,60.11764705882352 800.9411764705883,41.88235294117648 811.7647058823529,114.8235294117647 822.5882352941177,136.70588235294116 833.4117647058823,202.3529411764706 844.2352941176471,213.2941176470588 855.0588235294118,260.7058823529412 865.8823529411765,242.47058823529412 876.7058823529411,176.8235294117647 887.5294117647059,74.70588235294117 898.3529411764706,49.176470588235304 909.1764705882354,41.88235294117648" 
          fill="none" 
          stroke="url(#line-stroke)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ pathLength }}
        ></motion.polyline>
        
        {/* Animated End Dots */}
        <motion.circle 
          cx="909.1764705882354" cy="41.88235294117648" r="8" fill="#00ff87" opacity="0.15"
          style={{ scale: dotScale }}
        ></motion.circle>
        <motion.circle 
          cx="909.1764705882354" cy="41.88235294117648" r="3.5" fill="#00ff87"
          style={{ scale: dotScale }}
        ></motion.circle>
        
        {/* Animated Text labels */}
        <motion.g style={{ opacity: fillOpacity }}>
          <text x="0" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Jan &apos;19</text>
          <text x="86.58823529411765" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Sep &apos;19</text>
          <text x="162.3529411764706" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Apr &apos;20</text>
          <text x="248.94117647058823" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Dec &apos;20</text>
          <text x="335.52941176470586" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Aug &apos;21</text>
          <text x="422.11764705882354" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Apr &apos;22</text>
          <text x="497.88235294117646" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Nov &apos;22</text>
          <text x="584.470588235294" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Jul &apos;23</text>
          <text x="671.0588235294117" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Mar &apos;24</text>
          <text x="757.6470588235294" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Nov &apos;24</text>
          <text x="833.4117647058823" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Jun &apos;25</text>
          <text x="920" y="294" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="var(--font-mono), monospace">Feb &apos;26</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
