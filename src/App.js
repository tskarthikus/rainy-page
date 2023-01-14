import { Suspense } from 'react'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { CrystalHeart } from './crystal_golem_heart_draco'
import { CubeTextureLoader } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RoundPlatform } from './Round_platform';

const floorBump = (type) => `/Assets/floor_${type}.jpg`;

export default function App() {
  const scale = Array.from({ length: 50 }, () => 0.5 +  2); 
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.1], fov: 50 }}>
      <OrbitControls makeDefault/>
      <ambientLight intensity={0.3} />
      <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={0.2} castShadow shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={0.1} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[5, -5, 5]} angle={Math.PI/3} penumbra={1} intensity={0.35} castShadow={true} shadow-mapSize={[256, 256]} color="#551111" />
      <Suspense fallback={null}>
        <RoundPlatform scale={0.5} position={[0, -0.98, 0]}/> 
        <CrystalHeart scale={0.02} position={[0, -0.05, 0]}/>
        {/* <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.33, 0]} far={0.4} width={2} height={2} blur={4} /> */}
      </Suspense>
      <SkyBox />
      <Ground />
    </Canvas>
  )
}

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/Assets/TropicalSunnyDay_px.jpg",
    "/Assets/TropicalSunnyDay_nx.jpg",
    "/Assets/TropicalSunnyDay_py.jpg",
    "/Assets/TropicalSunnyDay_ny.jpg",
    "/Assets/TropicalSunnyDay_pz.jpg",
    "/Assets/TropicalSunnyDay_nz.jpg"
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}



function Ground() {
  const [
    colorMap,
    normalMap,
  ] = useLoader(TextureLoader, [
    '/Assets/floor.png',
    '/Assets/floor_bump.png'
  ]);
  return (
    <>
      <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
        <planeGeometry />
        <meshStandardMaterial
            displacementScale={0.2}
            map={colorMap}
            normalMap={normalMap}
        />
      </mesh>    
    </>
  );
}