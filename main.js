import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const positionRange = {
    minX: -10,
    maxX: 10,
    minY: -5,
    maxY: 5,
    minZ: -10,
    maxZ: 10,
  };
  
const group = new THREE.Group();
const o2m = new THREE.Group();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const torus_geometry = new THREE.TorusGeometry(0.030, 0.02, 28, 176, 6.283185307179586)
const material = new THREE.MeshNormalMaterial();

const loader = new FontLoader();
loader.load('anurati.json', function (font){
    const text1_geometry = new TextGeometry( 'MANAN \n    JAIN', {
		font: font,
		size: 0.8,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    } );
    const text1 = new THREE.Mesh(text1_geometry, material);
    text1.position.set(-2, 0, 0)
    group.add(text1);
} );

loader.load('blanka.json', function (font) {
    const text2_geometry = new TextGeometry('YEAH ITS TIME TO CODE', {
        font : font,
        size: 0.4,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    });
    const text2 = new THREE.Mesh(text2_geometry, material);
    text2.position.set(-2, -1.5, 0)
    group.add(text2);
});
  
const cube = new THREE.Mesh( geometry, material );
const torus = new THREE.Mesh(torus_geometry, material);

cube.position.z = 5
torus.position.set(0, 0, 4)

scene.add(group)

for(let i=0;i<20;i++) {
    const posX = THREE.MathUtils.randFloat(positionRange.minX,  positionRange.maxX);
    const posY = THREE.MathUtils.randFloat(positionRange.minY, positionRange.maxY);
    const posZ = THREE.MathUtils.randFloat(positionRange.minZ, positionRange.maxZ);

    const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(cube_geometry, material)
    cube.position.set(posX, posY, posZ);
    o2m.add(cube);
}

scene.add(o2m);

camera.position.z = 8;
controls.maxDistance = 8;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = false;
controls.enablePan = true;
controls.enableKeys = false;
controls.enableRotate = true;
controls.update();

camera.rotation.set(0, 0, 0)

const animate = () => {
    requestAnimationFrame( animate );
    controls.update();

    const delta = 0.1;
    const del = 0;
    

    group.rotation.x += 0.003;
    group.rotation.y += 0.003;
    // console.log(group.position)
	renderer.render( scene, camera );}


animate()