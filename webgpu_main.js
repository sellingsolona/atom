import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js';
import * as TSL from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r172/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/libs/lil-gui.module.min.js';
import WebGPU from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/capabilities/WebGPU.js';

// Create the WebGPU Renderer
const renderer = new THREE.WebGPURenderer();

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
