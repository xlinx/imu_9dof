import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Phone3DScene from './components/Phone3DScene'

function App() {
  const [count, setCount] = useState(0)
  const [xyz, setxyz] = useState({x: 0, y: 0, z: 0, rotationRate: null})
  const [abg, setabg] = useState({a: 0, b: 0, g: 0})
  const [absabg, setabsabg] = useState({a: 0, b: 0, g: 0})
  const [useAbsolute, setUseAbsolute] = useState(false)
  const [showRawData, setShowRawData] = useState(false)

  const handle_devicemotion = useCallback((event) => {
    const {x, y, z} = event.accelerationIncludingGravity
    setxyz({x: x, y: y, z: z, rotationRate: event.rotationRate})
  }, [])

  const handle_deviceorientation = useCallback((event) => {
    const {alpha, beta, gamma} = event
    setabg({a: alpha, b: beta, g: gamma})
  }, [])

  const handle_deviceorientationabsolute = useCallback((event) => {
    const {alpha, beta, gamma} = event
    setabsabg({a: alpha, b: beta, g: gamma})
  }, [])

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('devicemotion', handle_devicemotion)
    window.addEventListener('deviceorientation', handle_deviceorientation)
    window.addEventListener('deviceorientationabsolute', handle_deviceorientationabsolute)

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('devicemotion', handle_devicemotion)
      window.removeEventListener('deviceorientation', handle_deviceorientation)
      window.removeEventListener('deviceorientationabsolute', handle_deviceorientationabsolute)
    }
  }, [handle_deviceorientation, handle_devicemotion, handle_deviceorientationabsolute])

  const toggleOrientationMode = () => {
    setUseAbsolute(!useAbsolute)
  }

  const toggleDataView = () => {
    setShowRawData(!showRawData)
  }

  return (
    <>
      <div>
        <a href="https://decade.tw" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://decade.tw" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
        <a href="https://decade.tw" target="_blank">
          <img src={'https://www.decade.tw/images/logo/decade_logo.png'} style={{height:'50px'}}/>
        </a>
      </div>
      
      <h3>9DoF Sensor Visualization</h3>
      
      {/* 3D Phone Visualization */}
      <div style={{ marginBottom: '20px' }}>
        <Phone3DScene 
          xyz={xyz} 
          abg={abg} 
          absabg={absabg} 
          useAbsolute={useAbsolute}
          showControls={true}
        />
      </div>
      
      {/* Control Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={toggleOrientationMode}
          style={{ 
            backgroundColor: useAbsolute ? '#4CAF50' : '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Using {useAbsolute ? 'Absolute' : 'Relative'} Orientation
        </button>
        
        <button 
          onClick={toggleDataView}
          style={{ 
            backgroundColor: showRawData ? '#FF9800' : '#9E9E9E',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
        </button>
        
        <button 
          onClick={() => setCount((count) => count + 1)}
          style={{ 
            backgroundColor: '#607D8B',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Count: {count}
        </button>
      </div>
      
      {/* Raw Data Display (Optional) */}
      {showRawData && (
        <div style={{ 
          background: 'rgba(0,0,0,0.1)', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h4>Raw Sensor Data</h4>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Acceleration (m/s²):</strong><br/>
            X: {xyz.x?.toFixed(2) || 0} | Y: {xyz.y?.toFixed(2) || 0} | Z: {xyz.z?.toFixed(2) || 0}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Rotation Rate (°/s):</strong><br/>
            α: {xyz.rotationRate?.alpha?.toFixed(2) || 0} | 
            β: {xyz.rotationRate?.beta?.toFixed(2) || 0} | 
            γ: {xyz.rotationRate?.gamma?.toFixed(2) || 0}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Device Orientation (Relative):</strong><br/>
            α (Yaw): {abg.a?.toFixed(2) || 0}° (0~360) | 
            β (Pitch): {abg.b?.toFixed(2) || 0}° (-180~180) | 
            γ (Roll): {abg.g?.toFixed(2) || 0}° (-90~90)
          </div>
          
          <div>
            <strong>Device Orientation (Absolute):</strong><br/>
            α (Yaw): {absabg.a?.toFixed(2) || 0}° (0~360) | 
            β (Pitch): {absabg.b?.toFixed(2) || 0}° (-180~180) | 
            γ (Roll): {absabg.g?.toFixed(2) || 0}° (-90~90)
          </div>
        </div>
      )}
      
      <p className="read-the-docs">
        📱 Move your device to see the 3D phone respond in real-time<br/>
        🖱️ Use mouse to rotate/zoom the 3D view<br/>
        🔄 Toggle between relative/absolute orientation modes
      </p>
    </>
  )
}

export default App
