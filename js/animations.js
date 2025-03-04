// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl'),
    alpha: true,
    antialias: true
});

// Device detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Texture loader with NPOT handling
const textureLoader = new THREE.TextureLoader();
const createNPOTTexture = (path) => {
    const texture = textureLoader.load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    return texture;
};

// Lighting setup with mobile adjustments
const directionalLight = new THREE.DirectionalLight(0xfff4e6, isMobile ? 3.5 : 2.5);
directionalLight.position.set(5, 3, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, isMobile ? 0.5 : 0.3);
scene.add(ambientLight);

// Earth material (adjust emissive and specular intensity)
const earthMaterial = new THREE.MeshPhongMaterial({
    map: createNPOTTexture('Images/00_earthmap1k.jpg'),
    normalMap: createNPOTTexture('Images/01_earthbump1k.jpg'),
    specularMap: createNPOTTexture('Images/02_earthspec1k.jpg'),
    emissiveMap: createNPOTTexture('Images/03_earthlights1k.jpg'),
    emissive: 0xffffff,
    emissiveIntensity: 0.3,
    shininess: 15,
    specular: 0x333333,
    bumpScale: 0.05
});

// Earth mesh
const earthGeometry = new THREE.SphereGeometry(2, 128, 128);
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.rotation.z = 0.41;
earthMesh.renderOrder = 1;
scene.add(earthMesh);

// Cloud material with improved blending
const cloudMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('Images/04_earthcloudmap.jpg'),
    alphaMap: textureLoader.load('Images/05_earthcloudmaptrans.jpg'),
    transparent: true,
    opacity: 0.4,
    metalness: 0.1,
    roughness: 1.0,
    depthWrite: false,
    blending: THREE.NormalBlending
});

const cloudGeometry = new THREE.SphereGeometry(2.005, 128, 128);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloudMesh.renderOrder = 2;
scene.add(cloudMesh);

// Star background
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    starVertices.push(
        THREE.MathUtils.randFloatSpread(2500),
        THREE.MathUtils.randFloatSpread(2500),
        THREE.MathUtils.randFloatSpread(2500)
    );
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.65,
    depthWrite: false
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0005;
    const rotationSpeed = isMobile ? 0.0005 : 0.0008;
    
    earthMesh.rotation.y += rotationSpeed;
    cloudMesh.rotation.y += rotationSpeed * 1.25;
    
    directionalLight.position.x = Math.sin(time) * 6;
    directionalLight.position.z = Math.cos(time) * 6;
    
    renderer.render(scene, camera);
}

animate();

// Responsive handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});