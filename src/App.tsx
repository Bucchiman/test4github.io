import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Mesh } from 'three';
//import * as THREE from 'three';

const Cube: React.FC = () => {
  const cubeRef = useRef<Mesh>();

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef as React.MutableRefObject<Mesh>}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  );
};

const WebGLScene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <Cube />
    </Canvas>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WebGLScene />
    </div>
  );
};

export default App;
