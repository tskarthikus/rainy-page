import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { CrystalHeart } from './crystal_golem_heart_draco'
import { BufferGeometry, CubeTextureLoader } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RoundPlatform } from './Round_platform';
import { BufferAttribute } from "three";

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
      <RainParticles />
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

// // Rain particles
// function RainParticles() {
//   const { scene } = useThree();
//   const textureLoader = new TextureLoader()
//   const particleTexture = textureLoader.load('/Assets/rain_particle.png')
//   const particlesGeometry = new BufferGeometry(1, 32, 32);
//   const count = 5000;
  
//   const positions = new Float32Array(count * 3)
  
//   for (let i = 0; i < count * 3; i++){
//       positions[i] = (Math.random() - 0.5) * 20 ;
//   }
//   particlesGeometry.setAttribute(
//       'position',
//       new BufferAttribute(positions, 3)
//   )
//   const particlesMaterial = new PointsMaterial({
//     size: 0.1,
//     sizeAttenuation: true
//   })
//   particlesMaterial.color = new Color("darkgrey")
//   particlesMaterial.transparent = true
//   particlesMaterial.alphaMap = particleTexture
//   particlesMaterial.alphaTest = 0.001
//   particleTexture.depthWrite = false;

//   // Points
//   const particles = new Points(
//     particlesGeometry, particlesMaterial
//   );
//   scene.add(particles)

// }


const state = {
  // this can be used as prop in initial render
  // but eventually it should be updated manually via ref.
  // and most importantly, length of array should not be changed.
  points: new Float32Array([/* ... */]),
  requireUpdate: false
};

function RainParticles({ count = 1200 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (Math.random() - 0.5) * 20);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);
  const particleTexture = useMemo(() => {
    const textureLoader = new TextureLoader()
    return textureLoader.load('/Assets/rain_particle.png')
  });
  const ref = useRef()
  const refPoints = useRef();
  useFrame((frameState) => {
    const t = frameState.clock.getElapsedTime() 
    if (refPoints.current /*&& state.requireUpdate*/) {
      // manually inject numbers into property. so that it won't trigger re-render.
      let pos = refPoints.current.geometry.getAttribute('position');
      refPoints.current.geometry.setAttribute('position', pos);
      let isModified = false;
      for (let i = 0; i <= pos.array.length; i+=3) {
        if (pos.array[i+1] < -1){
          pos.array[i+1] = 3;
        }
        pos.array[i+1] -= t * 0.0005;
      }
      refPoints.current.geometry.setAttribute('position', pos);
      refPoints.current.geometry.attributes.position.needsUpdate = true;
      // state.requireUpdate = false;
    }
    // refPoints.current.rotation.x += t * 0.0001;
  });

  return (
    <points ref={refPoints}>
      <bufferGeometry ref={ref}>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color={"lightgrey"}
        sizeAttenuation={true}
        alphaMap={particleTexture}
        transparent={true}
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  );
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
            map={colorMap}
            normalMap={normalMap}
        />
      </mesh>    
    </>
  );
}