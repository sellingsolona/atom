import * as THREE from 'three';
import * as TSL from 'three/nodes';
import * as THREE from 'three';

const renderer = new THREE.WebGPURenderer();

import { OrbitControls } from 'three/examples/controls/OrbitControls.js';
import { GUI } from 'three/examples/libs/lil-gui.module.min.js';
import WebGPU from 'three/examples/capabilities/WebGPU.js';

let camera, scene, renderer, controls, clock, light;
let particles = [];

const nbParticles = Math.pow(2, 12); // Reduce particles for testing
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(nbParticles * 3);

for (let i = 0; i < nbParticles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Random position
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

function init() {
    if (!navigator.gpu) {
        console.error("WebGPU is NOT supported in your browser.");
        return;
    }

    // Initialize Scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    renderer = new WebGPURenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add particles
    scene.add(particleSystem);

    // Lighting
    light = new THREE.PointLight(0xffffff, 1);
    scene.add(light);

    // Start animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();

