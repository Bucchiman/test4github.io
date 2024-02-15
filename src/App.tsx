import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import terre from './img_5terre.jpg';
import forest from './img_forest.jpg';
import lights from './img_lights.jpg';
import mountains from './img_mountains.jpg';


const GalleryItem: React.FC<{ src: string; alt: string; desc: string }> = ({ src, alt, desc }) => (
  <div className="gallery">
    <a target="_blank" href={src}>
      <img src={src} alt={alt} width="600" height="400" />
    </a>
    <div className="desc">{desc}</div>
  </div>
);


const App: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x090D17); // Set background color here
    // const container = document.getElementById('8uGL-container');
    const container = containerRef.current;
    container?.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
 


    // Load font using FontLoader
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      // Create 3D text geometry
      const textGeometry = new TextGeometry('8ucchiman', {
        font: font,
        size: 0.6,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: false,
      });

      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const textMesh = new THREE.Mesh(textGeometry, material);
      scene.add(textMesh);

      // Position the camera
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the text
        // textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
      };

      // Resize handling
      const handleResize = () => {
        const newWidth = window.innerWidth;
        // const newHeight = window.innerHeight;
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
    <div>
    <style>
      {`
        .gallery {
          margin: 5px;
          border: 1px solid #ccc;
          float: left;
          width: 180px;
        }

        .gallery:hover {
          border: 1px solid #777;
        }

        .gallery img {
          width: 100%;
          height: auto;
        }

        .desc {
          padding: 15px;
          text-align: center;
        }
      `}
    </style>

      <div className="bucchiman" ref={containerRef}></div>
      <div className="topic">
        <GalleryItem src={terre} alt="Cinque Terre" desc="Add a description of the image here" />
        <GalleryItem src={forest} alt="Forest" desc="Add a description of the image here" />
        <GalleryItem src={lights} alt="Northern Lights" desc="Add a description of the image here" />
        <GalleryItem src={mountains} alt="Mountains" desc="Add a description of the image here" />
      </div>
    </div>
  );
};

export default App;
