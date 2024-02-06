import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import {TextGeometry} from 'three/example/jsm/geometries/TextGeometry.js' ;
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const App: React.FC = () => {
  useEffect(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    const container = document.getElementById('webgl-container');
    container?.appendChild(renderer.domElement);


    // Load font using FontLoader
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      // Create 3D text geometry
      const textGeometry = new TextGeometry('8ucchiman', {
        font: font,
        size: 0.5,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
      });

      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const textMesh = new THREE.Mesh(textGeometry, material);
      scene.add(textMesh);

      // Position the camera
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the text
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
      };

      // Resize handling
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
      };

      // Event listeners
      window.addEventListener('resize', handleResize);

      // Start animation loop
      animate();

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  }, []); // Only run once on mount

  // return null; // No need to render anything in the React component
  return (
    <div style={{ display: 'flex' }}>
      <div id="webgl-container" style={{ flex: 1 }}></div>
      <div style={{ flex: 1 }}>
        {/* Your picture gallery component goes here */}
        <h1>Picture Gallery</h1>
        {/* Add your picture gallery component here */}
      </div>
    </div>
  );

};

export default App;
