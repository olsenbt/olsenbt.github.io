const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Set up renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('city-skyline').appendChild(renderer.domElement);

// Create cityscape
const cityGroup = new THREE.Group();
for (let i = 0; i < 100; i++) {
    // Random building dimensions
    const width = Math.random() * 1 + 0.5;
    const height = Math.random() * 10 + 1;
    const depth = Math.random() * 1 + 0.5;

    // Building geometry and wireframe material
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(edges, material);

    // Random position for each building
    wireframe.position.set(
        Math.random() * 20 - 10, // X
        height / 2,             // Y (center at base)
        Math.random() * 20 - 10 // Z
    );

    cityGroup.add(wireframe);
}

// Add cityscape to scene
scene.add(cityGroup);

// Set camera position
camera.position.set(0, 15, 25);
camera.lookAt(cityGroup.position);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cityGroup.rotation.y += 0.002; // Rotate the city
    renderer.render(scene, camera);
}
animate();

// Adjust renderer size on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
