import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Phone3D from './Phone3D'
//decade.tw v.YSLin
const Phone3DScene = ({ xyz, abg, absabg, useAbsolute, showControls = false }) => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Phone 3D Model */}
          <Phone3D xyz={xyz} abg={abg} absabg={absabg} useAbsolute={useAbsolute} />
          
          {/* Ground Shadow */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={4} 
          />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Controls */}
          {showControls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}
        </Suspense>
      </Canvas>
      
      {/* Overlay Instructions */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <div>📱 [decade.tw] Move device to see 3D phone respond</div>
        <div>🖱️ [decade.tw] Drag to rotate view | 🖱️ Scroll to zoom</div>
      </div>
    </div>
  )
}

export default Phone3DScene
