import { Scene, PerspectiveCamera, WebGLRenderer, PointLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GridHelper } from 'three';
import { AxesHelper } from 'three';



// Set up the scene
const scene = new Scene();

// Camera setup
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30); // or some larger value to "zoom out"

// Renderer setup
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a point light
const light = new PointLight(0xFFFFFF, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

// Load the GLB model
const loader = new GLTFLoader();
loader.load('/maison.glb',
   (gltf) => {
      console.log("Model loaded successfully.");
      gltf.scene.scale.set(0.1, 0.1, 0.1);  // Adjust this accordingly
      scene.add(gltf.scene);
   },
   undefined,
   (error) => {
      console.error("Error loading the model.", error);
   }
);

const grid = new GridHelper(50, 50);
scene.add(grid);

const axes = new AxesHelper(5);
scene.add(axes);


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
