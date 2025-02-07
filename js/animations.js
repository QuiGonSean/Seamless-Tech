// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-5, 3, 5);
scene.add(directionalLight);

// Earth material with enhanced emissive properties
const textureLoader = new THREE.TextureLoader();
const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('Images/00_earthmap1k.jpg'),
    normalMap: textureLoader.load('Images/01_earthbump1k.jpg'),
    specularMap: textureLoader.load('Images/02_earthspec1k.jpg'),
    emissiveMap: textureLoader.load('Images/03_earthlights1k.jpg'),
    emissive: 0xffffff,
    emissiveIntensity: 0.2,
    shininess: 15,
    transparent: true,
    opacity: 1
});

// Earth mesh
const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.rotation.z = 0.41;
scene.add(earthMesh);

// Atmosphere effect
const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x80a7e6,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide
});
const atmosphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(2.05, 64, 64),
    atmosphereMaterial
);
scene.add(atmosphereMesh);

// Cloud layer setup
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('Images/04_earthcloudmap.jpg'),
    alphaMap: textureLoader.load('Images/05_earthcloudmaptrans.jpg'),
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const cloudGeometry = new THREE.SphereGeometry(2.02, 64, 64);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// Star background
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.7 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate Earth and atmospheric elements at different speeds
    earthMesh.rotation.y += 0.002;
    atmosphereMesh.rotation.y += 0.002;
    cloudMesh.rotation.y += 0.0025; // Clouds rotate slightly faster
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});