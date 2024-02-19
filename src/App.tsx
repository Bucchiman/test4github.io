import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import terre from './img_5terre.jpg';
import forest from './img_forest.jpg';
import lights from './img_lights.jpg';
import mountains from './img_mountains.jpg';

import terreGif from './animated.gif';
import forestGif from './animated.gif';
import lightsGif from './mugen.gif';
import mountainsGif from './samurai_champloo.gif';

import githubIcon from './github.svg'; // Import the GitHub icon SVG file

interface GalleryItemProps {
  src: string;
  alt: string;
  desc: string;
  gifSrc: string;
  delay: number;
  iconSrc: string;
  githubUrl: string;
  style?: React.CSSProperties;
  webglWidth: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, desc, gifSrc, delay, iconSrc, githubUrl, style, webglWidth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    const id = window.setTimeout(() => {
      setIsHovered(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    setIsHovered(false);
  };

  const handleIconClick = () => {
    window.open(githubUrl, '_blank'); // Open the specified URL in a new tab
  };

  return (
    <div className="gallery"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, width: `${webglWidth / 4}px` }} // Set width dynamically
    >
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={isHovered ? gifSrc : src} alt={alt} />
        {isHovered && (
          <div className="overlay">
            <img src={iconSrc} alt="GitHub" onClick={handleIconClick} />
          </div>
        )}
      </a>
      <div className={`description ${isHovered ? 'visible' : ''}`}>{desc}</div>
      <div className={`overlay ${isHovered ? 'visible' : ''}`}></div>
    </div>
  );
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglWidth, setWebglWidth] = useState(0);

  useEffect(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x090D17); // Set background color here
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

        // Set the width of the WebGL content
        setWebglWidth(newWidth);
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

  return (
    <div>
      <div className="bucchiman" ref={containerRef}></div>
      <div className="gallery-container">
        <GalleryItem src={terre} alt="Cinque Terre" desc="Add a description of the image here" gifSrc={terreGif} delay={500} iconSrc={githubIcon} githubUrl="https://github.com/Bucchiman/Jetson_Style_Transfer" webglWidth={webglWidth} />
        <GalleryItem src={forest} alt="Forest" desc="Add a description of the image here" gifSrc={forestGif} delay={500} iconSrc={githubIcon} githubUrl="https://github.com/Bucchiman/mycyclegan" webglWidth={webglWidth} />
        <GalleryItem src={lights} alt="Northern Lights" desc="Add a description of the image here" gifSrc={lightsGif} delay={500} iconSrc={githubIcon} githubUrl="https://github.com/Bucchiman/dotfiles" webglWidth={webglWidth} />
        <GalleryItem src={mountains} alt="Mountains" desc="Add a description of the image here" gifSrc={mountainsGif} delay={500} iconSrc={githubIcon} githubUrl="https://github.com/Bucchiman/IoT" webglWidth={webglWidth} />
      </div>
    </div>
  );
};

export default App;
