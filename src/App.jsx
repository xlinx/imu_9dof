import {useCallback, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
    const [count, setCount] = useState(0)
    const [xyz, setxyz] = useState({x: 0, y: 0, z: 0,rotationRate:null})
    const [abg, setabg] = useState({a: 0, b: 0, g: 0})
    const [absabg, setabsabg] = useState({a: 0, b: 0, g: 0})
    const handle_devicemotion = useCallback((event) => {
        const {x, y, z} = event.accelerationIncludingGravity

        setxyz({x: x, y: y, z: z,rotationRate:event.rotationRate})
        // console.log(`devicemotion:`,xyz);
    }, []);
    const handle_deviceorientation = useCallback((event) => {
        const {alpha, beta, gamma} = event
        setabg({a: alpha, b: beta, g: gamma})
        // console.log(`deviceorientation:`,abg);
    }, []); // Empty dependency array ensures the same function instance is used

    const handle_deviceorientationabsolute = useCallback((event) => {
        const {alpha, beta, gamma} = event
        setabsabg({a: alpha, b: beta, g: gamma})
        // console.log(`devicemotion:`,xyz);
    }, []);
    useEffect(() => {
        // Add event listener when the component mounts
        window.addEventListener('devicemotion', handle_devicemotion);
        window.addEventListener('deviceorientation', handle_deviceorientation);
        window.addEventListener('deviceorientationabsolute', handle_deviceorientationabsolute);


        // Return a cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('devicemotion', handle_devicemotion);
            window.removeEventListener('devicemotion', handle_deviceorientation);
            window.removeEventListener('deviceorientation', handle_deviceorientationabsolute);

        };
    }, [handle_deviceorientation, handle_devicemotion, handle_deviceorientationabsolute]); // Dependency on handleDeviceOrientation

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
            <h3>9DoF on mobile</h3>
            <div >
                <button onClick={() => {

                    setCount((count) => count + 1)
                }}>
                    accXYZ={xyz.x?.toFixed(2)}（西到東）|
                    {xyz.y?.toFixed(2)}（南到北）|
                    {xyz.z?.toFixed(2)}（下到上）|


                </button>
            </div>
            <div >
                <button onClick={() => {

                    setCount((count) => count + 1)
                }}>
                    rotationRateXYZ=
                    {xyz.rotationRate?.alpha?.toFixed(2)}（）|
                    {xyz.rotationRate?.beta?.toFixed(2)}（）|
                    {xyz.rotationRate?.gamma?.toFixed(2)}（）|

                </button>
            </div><div >
                <button onClick={() => {

                    setCount((count) => count + 1)
                }}>
                    ABG(Yaw,Pitch,Roll)= {abg.a?.toFixed(2)}<span style={{ color: 'gray' }}>(0~360)</span> |
                    {abg.b?.toFixed(2)}<span style={{ color: 'gray' }}>(-180~180)</span> |
                    {abg.g?.toFixed(2)}<span style={{ color: 'gray' }}>(-90~90) </span>|

                </button>
        </div><div >
                <button onClick={() => {

                    setCount((count) => count + 1)
                }}>
                    ABS_ABG(Yaw,Pitch,Roll)= {absabg.a?.toFixed(2)}<span style={{ color: 'gray' }}>(0~360)</span> |
                    {absabg.b?.toFixed(2)}<span style={{ color: 'gray' }}>(-180~180)</span> |
                    {absabg.g?.toFixed(2)}<span style={{ color: 'gray' }}>(-90~90) </span>|

                </button>
        </div><div >
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                {/*<GyroscopeDisplay></GyroscopeDisplay>*/}
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
