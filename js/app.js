const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf8f5f0); // Creamy white background
document.getElementById('city-skyline').appendChild(renderer.domElement);

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Add Grid Helper
const gridHelper = new THREE.GridHelper(40, 40);
scene.add(gridHelper);

// Create Cityscape
const cityGroup = new THREE.Group();
for (let i = 0; i < 100; i++) {
    const width = Math.random() * 1 + 0.5;
    const height = Math.random() * 10 + 1;
    const depth = Math.random() * 1 + 0.5;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(edges, material);

    wireframe.position.set(
        Math.random() * 20 - 10, // X
        height / 2,             // Y
        Math.random() * 20 - 10 // Z
    );

    cityGroup.add(wireframe);
    console.log(`Building ${i}:`, wireframe.position);
}
scene.add(cityGroup);

// Camera Position
camera.position.set(0, 10, 30);
camera.lookAt(cityGroup.position);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    cityGroup.rotation.y += 0.002; // Rotate cityscape
    renderer.render(scene, camera);
}
animate();

// Adjust Renderer Size on Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
