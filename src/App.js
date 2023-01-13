import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { CrystalHeart } from './crystal_golem_heart_draco'


export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1.1], fov: 50 }}>
      <ambientLight intensity={0.1} />
      <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={0.2} castShadow shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={0.1} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[5, -5, 5]} angle={Math.PI/4} penumbra={1} intensity={0.15} castShadow={true} shadow-mapSize={[256, 256]} color="#ff5555" />
      <Suspense fallback={null}>
        <CrystalHeart scale={0.0170} position={[0, -0.09, 0]}/>
        <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.33, 0]} far={0.4} width={2} height={2} blur={4} />
      </Suspense>
    </Canvas>
  )
}
