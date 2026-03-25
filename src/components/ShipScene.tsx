import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Volume2, VolumeX } from 'lucide-react';

function Wake() {
  const wakeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (wakeRef.current) {
      wakeRef.current.children.forEach((child) => {
        // Ship moves towards +Z globally, local -X is forward.
        // So wake moves towards local +X (backwards)
        child.position.x += delta * 20;
        // Expand outwards to form a V-shape wake
        child.position.z += Math.sign(child.position.z) * delta * 6;
        // Shrink and fade
        const scale = child.scale.x - delta * 0.5;
        if (scale <= 0) {
          child.position.x = Math.random() * 2; // Reset near the stern
          // Start slightly offset from center to form the V
          child.position.z = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5);
          child.scale.setScalar(Math.random() * 1.2 + 0.4);
        } else {
          child.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={wakeRef} position={[6, -1.8, 0]}>
      {Array.from({ length: 150 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[Math.random() * 30, 0, (Math.random() - 0.5) * 8]}
          scale={Math.random()}
        >
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function BowSplash() {
  const splashRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (splashRef.current) {
      splashRef.current.children.forEach((child) => {
        // Move up and slightly forward/outward
        child.position.y += delta * 3; // up
        child.position.x -= delta * 4; // forward (local -X)
        child.position.z += Math.sign(child.position.z || (Math.random() - 0.5)) * delta * 3; // outward

        // Shrink and reset
        const scale = child.scale.x - delta * 1.2;
        if (scale <= 0 || child.position.y > 1.5) {
          // Reset at the bow
          child.position.set(0, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 1.2);
          child.scale.setScalar(Math.random() * 0.5 + 0.2);
        } else {
          child.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={splashRef} position={[-8, -1, 0]}>
      {Array.from({ length: 60 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 1,
            (Math.random() - 0.5) * 2
          ]}
          scale={Math.random() * 0.5}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CargoShip() {
  const shipRef = useRef<THREE.Group>(null);

  // Gentle rolling (side to side)
  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    }
  });

  const containerColors = ['#22d3ee', '#0ea5e9', '#0f172a', '#f8fafc', '#38bdf8'];

  return (
    <group ref={shipRef}>
      <Wake />
      <BowSplash />
      {/* Hull */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 2, 4.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      
      {/* Bow (Front) */}
      <mesh position={[-7.5, -1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0, 2.25, 2, 3]} rotation={[0, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Bridge/Cabin (Back) */}
      <group position={[5, 1, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[3, 2, 4]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Bridge Top */}
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[2.5, 1, 3.5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Windows */}
        <mesh position={[-1.26, 1.5, 0]}>
          <boxGeometry args={[0.1, 0.6, 3.6]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Funnel/Chimney */}
        <mesh position={[0.5, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.5, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.6} />
        </mesh>
      </group>

      {/* Containers */}
      <group position={[-2, 0.5, 0]}>
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) =>
            Array.from({ length: 3 }).map((_, height) => {
              // Randomly skip some containers for a realistic look
              if (Math.random() > 0.8) return null;
              
              const color = containerColors[Math.floor(Math.random() * containerColors.length)];
              return (
                <mesh 
                  key={`${row}-${col}-${height}`} 
                  position={[
                    row * 2.1 - 3, 
                    height * 1.1, 
                    col * 1.1 - 1.1
                  ]}
                  castShadow
                  receiveShadow
                >
                  <boxGeometry args={[2, 1, 1]} />
                  <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
                </mesh>
              );
            })
          )
        )}
      </group>
    </group>
  );
}

const getWaveHeight = (x: number, z: number, time: number) => {
  const wave1 = Math.sin(x * 0.1 + time * 1.5) * 0.5;
  const wave2 = Math.sin(z * 0.15 + time * 1.2) * 0.3;
  const wave3 = Math.sin((x + z) * 0.05 + time * 0.8) * 0.4;
  return wave1 + wave2 + wave3;
};

function OceanWaves() {
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  
  useFrame((state) => {
    if (!geomRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positionAttribute = geomRef.current.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i); // This becomes Z in 3D space after rotation
      
      const z = getWaveHeight(x, y, time);
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geomRef.current.computeVertexNormals();
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry ref={geomRef} args={[150, 150, 60, 60]} />
      <meshStandardMaterial 
        color="#0ea5e9" 
        transparent 
        opacity={0.6} 
        roughness={0.1} 
        metalness={0.8} 
      />
    </mesh>
  );
}

function MovingShip() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      // Varying speed: base 12, varies by +/- 5 based on a sine wave
      const speed = 12 + Math.sin(time * 0.8) * 5;
      
      // Move forward along Z axis (towards the camera)
      groupRef.current.position.z += delta * speed;
      
      const currentZ = groupRef.current.position.z;
      
      // Wave interaction: Bobbing up and down matching the wave height
      const waveHeight = getWaveHeight(0, currentZ, time);
      groupRef.current.position.y = waveHeight * 0.6; // Dampened for heavy ship
      
      // Pitching: Rocking forward and backward based on wave slope
      const waveAhead = getWaveHeight(0, currentZ + 2, time);
      const waveBehind = getWaveHeight(0, currentZ - 2, time);
      groupRef.current.rotation.x = (waveAhead - waveBehind) * 0.15;
      
      // Wrap around when it goes too far forward
      if (currentZ > 40) {
        groupRef.current.position.z = -60;
      }
    }
  });

  return (
    // Rotate -90 degrees on Y so the bow (-X) points towards +Z (the camera)
    <group ref={groupRef} position={[0, 0, -60]} rotation={[0, -Math.PI / 2, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <CargoShip />
      </Float>
    </group>
  );
}

export default function ShipScene() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set a comfortable background volume
      if (!isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback prevented by browser:", error);
            setIsMuted(true);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px] relative rounded-2xl overflow-hidden shadow-2xl border border-blue-800/50 bg-gradient-to-b from-blue-900 to-blue-950 group">
      
      {/* Ambient Ship/Ocean Sound */}
      <audio 
        ref={audioRef} 
        src="https://actions.google.com/sounds/v1/transportation/large_water_vehicle_pass_by.ogg" 
        loop 
        preload="auto"
      />
      
      {/* Sound Toggle Button */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-4 right-4 z-10 bg-blue-950/80 hover:bg-blue-900 text-cyan-400 p-3 rounded-full backdrop-blur-sm border border-cyan-400/30 transition-all shadow-lg flex items-center gap-2 group/btn"
        aria-label={isMuted ? "Unmute ship sound" : "Mute ship sound"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        <span className="text-xs font-medium max-w-0 overflow-hidden whitespace-nowrap group-hover/btn:max-w-xs transition-all duration-300 ease-in-out">
          {isMuted ? "Unmute Sound" : "Mute Sound"}
        </span>
      </button>

      {/* Position camera slightly offset to see the side of the ship as it comes forward */}
      <Canvas shadows camera={{ position: [8, 10, 28], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        <MovingShip />

        {/* Dynamic Water Surface */}
        <OceanWaves />

        <ContactShadows position={[0, -1.9, 0]} opacity={0.5} scale={40} blur={2} far={4} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 6}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
