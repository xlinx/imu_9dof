import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
//decade.tw v.YSLin
const Phone3D = ({ xyz, abg, absabg, useAbsolute = false }) => {
  const phoneRef = useRef()
  const screenRef = useRef()
  
  // Update phone position and rotation on each frame
  useFrame(() => {
    if (phoneRef.current) {
      // Apply acceleration data to position (scaled down for visibility)
      const scale = 0.01
      phoneRef.current.position.x = (xyz.x || 0) * scale
      phoneRef.current.position.y = (xyz.y || 0) * scale
      phoneRef.current.position.z = (xyz.z || 0) * scale
      
      // Apply orientation data
      if (useAbsolute && absabg) {
        // Use absolute orientation
        phoneRef.current.rotation.x = (absabg.b || 0) * Math.PI / 180 // beta (pitch)
        phoneRef.current.rotation.y = (absabg.g || 0) * Math.PI / 180 // gamma (roll)
        phoneRef.current.rotation.z = -(absabg.a || 0) * Math.PI / 180 // alpha (yaw)
      } else if (abg) {
        // Use relative orientation
        phoneRef.current.rotation.x = (abg.b || 0) * Math.PI / 180 // beta (pitch)
        phoneRef.current.rotation.y = (abg.g || 0) * Math.PI / 180 // gamma (roll)
        phoneRef.current.rotation.z = -(abg.a || 0) * Math.PI / 180 // alpha (yaw)
      }
    }
  })

  return (
    <group ref={phoneRef}>
      {/* Phone Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 0.2]} />
        <meshStandardMaterial color="#333" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Phone Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.11]}>
        <boxGeometry args={[1.8, 3.6, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#0f0f1a" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Screen Content - Grid pattern */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[1.7, 3.5]} />
        <meshStandardMaterial color="#0f3460" transparent opacity={0.8} />
      </mesh>
      
      {/* Home Button */}
      <mesh position={[0, -1.5, 0.11]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Camera Bump */}
      <mesh position={[0.5, 1.5, 0.11]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.3, 1.5, 0.11]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 1.5, 0.11]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Data Labels */}
      <Html position={[0, -2.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center',
          minWidth: '200px'
        }}>
          <div>Acc: X:{xyz.x?.toFixed(1) || 0} Y:{xyz.y?.toFixed(1) || 0} Z:{xyz.z?.toFixed(1) || 0}</div>
          <div>Rot: α:{abg.a?.toFixed(0) || 0}° β:{abg.b?.toFixed(0) || 0}° γ:{abg.g?.toFixed(0) || 0}°</div>
          <div style={{ color: useAbsolute ? '#4CAF50' : '#666' }}>
            Abs: α:{absabg.a?.toFixed(0) || 0}° β:{absabg.b?.toFixed(0) || 0}° γ:{absabg.g?.toFixed(0) || 0}°
          </div>
        </div>
      </Html>
    </group>
  )
}

export default Phone3D
