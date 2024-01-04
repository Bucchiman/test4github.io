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
    //<div style={{ width: '100vw', height: '100vh' }}>
    //  <WebGLScene />
    //</div>

    <div className="body">
      <div className="left-column" style={{ width: '100vw', height: '100vh' }}>
        <WebGLScene />
        <h2>Left Column</h2>
      </div>
      <div className="right-column" style={{ width: '100vw', height: '100vh' }}>
        <h2>Right Column</h2>
      </div>
    </div>
  );
};

export default App;

// Reference: https://webglfundamentals.org/webgl/lessons/webgl-text-glyphs.html
// interface GlyphInfo {
//   x: number;
//   y: number;
//   width: number;
// }
// 
// interface FontInfo {
//   letterHeight: number;
//   spaceWidth: number;
//   spacing: number;
//   textureWidth: number;
//   textureHeight: number;
//   glyphInfos: Record<string, GlyphInfo>;
// }
// 
// interface VerticesData {
//   arrays: {
//     position: Float32Array;
//     texcoord: Float32Array;
//   };
//   numVertices: number;
// }
// 
// const MyComponent: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// 
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
// 
//     const gl = canvas.getContext('webgl');
//     if (!gl) return;
// 
//     // Rest of the code...
//     // (Please copy the remaining code from the provided TypeScript code to this point)
//     const textPositions: number[][] = [];
// 
//     const names: string[] = ["8ucchiman"];
// 
//     function drawScene(now: number) {
//       // ... (unchanged code)
// 
//       textPositions.forEach(function (pos: number[], ndx: number) {
//         // ... (unchanged code)
// 
//         var name = names[ndx];
//         var s = name + ":" + pos[0].toFixed(0) + "," + pos[1].toFixed(0) + "," + pos[2].toFixed(0);
//         var vertices = makeVerticesForString(fontInfo, s);
// 
//         // ... (unchanged code)
// 
//         // Draw the text.
//         gl.drawArrays(gl.TRIANGLES, 0, vertices.numVertices);
//       });
// 
//       requestAnimationFrame(drawScene);
//     }
// 
//     drawScene(0); // Initial call to start the animation
// 
//     // Cleanup on unmount
//     return () => cancelAnimationFrame(drawScene);
//   }, []);
// 
//   return <canvas ref={canvasRef} />;
// };
// 
// // export default MyComponent;
// 
// const App: React.FC = () => {
//   return (
//     <div>
//       <MyComponent />
//     </div>
//   );
// };
// 
// export default App;
