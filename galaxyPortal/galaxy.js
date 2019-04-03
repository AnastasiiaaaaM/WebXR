let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );

let galaxySphere = document.getElementById('galaxySphere').object3D;

// Galaxy
let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
let galaxyMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide
});
let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Load Galaxy Textures
let textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;
textureLoader.load(
    './assets/img/galaxy.jpg',
    function(texture) {
        galaxyMaterial.map = texture;
        galaxySphere.add(galaxy);
    }
);

