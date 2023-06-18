import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

let width = window.innerWidth;
let height = window.innerHeight; 
let count = 0;
let time = 0;
let group = new THREE.Group();
const rotationAxes1 = [];
const rotationSpeeds1 = [];
const rotationAxes2 = [];
const rotationSpeeds2 = [];
const cubes = [];
const toruses = [];
const positionRange = {
    minX: -20,
    maxX: 25,
    minY: -15,
    maxY: 20,
    minZ: -15,
    maxZ: 22,
  };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener("resize", () => {
    width = innerWidth;
    height = innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
})

const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sound.ogg', function(buffer) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
})

const material = new THREE.MeshNormalMaterial();

const loader = new FontLoader();
loader.load('anurati.json', function (font){
    const text1_geometry = new TextGeometry('  MANAN \n     JAIN', {
		font: font,
		size: 1,
		height: 0.3,
		curveSegments: 12,
		bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    } );
    const text1 = new THREE.Mesh(text1_geometry, material);
    text1.position.set(-3.5, 0, 0)
    scene.add(text1);
    group.add(text1);
});

loader.load('blanka.json', function (font) {
    const text2_geometry = new TextGeometry(' YEAH ITS TIME TO CODE', {
        font : font,
        size: 0.5,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    });
    const text2 = new THREE.Mesh(text2_geometry, material);
    text2.position.set(-4, -2, 0)
  
    const a_geometry = new TextGeometry('    DJANGO \n DEVELOPER', {
        font: font,
        size:1,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    })
    const a = new THREE.Mesh(a_geometry, material);
    a.position.set(3, 5, -6);
    a.lookAt(-3.5, 0, 0);

    const b_geometry = new TextGeometry('          ENI\n @BITS PILANI', {
        font: font,
        size:1,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    })
    const b = new THREE.Mesh(b_geometry, material);
    b.position.set(-14, 3, -3);
    b.lookAt(-3.5, 0, 0);

    const c_geometry = new TextGeometry('     REACT \n DEVELOPER', {
        font: font,
        size:1,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    })
    const c = new THREE.Mesh(c_geometry, material);
    c.position.set(-6, 7, 13);
    c.rotateY(Math.PI);
    c.lookAt(-3.5, 0, 0);

    const d_geometry = new TextGeometry('FULL STACK\nDEVELOPER', {
        font: font,
        size:1,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 0.5,
        bevelThickness: 0.1
    })
    const d = new THREE.Mesh(d_geometry, material);
    d.position.set(14, -3, 10);
    d.rotateY(Math.PI);
    d.lookAt(-3.5, 0, 0);
    group.add(text2, a,b, c, d);
});
  
for(let i=0;i<175;i++) {
    const posX1 = THREE.MathUtils.randFloat(positionRange.minX,  positionRange.maxX) 
    const posY1 = THREE.MathUtils.randFloat(positionRange.minY, positionRange.maxY);
    const posZ1 = THREE.MathUtils.randFloat(positionRange.minZ, positionRange.maxZ);
    const posX2 = THREE.MathUtils.randFloat(positionRange.minX,  positionRange.maxX);
    const posY2 = THREE.MathUtils.randFloat(positionRange.minY, positionRange.maxY);
    const posZ2 = THREE.MathUtils.randFloat(positionRange.minZ, positionRange.maxZ);

    let a = THREE.MathUtils.randFloat(0, 1);
    const cube_geometry = new THREE.BoxGeometry(a, a, a);
    a = a % 0.8;
    const torus_geometry = new THREE.TorusGeometry(a, a*0.5975, 28, 176, 6.283185307179586)
    const cube = new THREE.Mesh(cube_geometry, material);
    const torus = new THREE.Mesh(torus_geometry, material);
    cube.position.set(posX1, posY1, posZ1);
    torus.position.set(posX2, posY2, posZ2);
    torus.rotation.x = Math.random() * Math.PI * 2; 
    torus.rotation.y = Math.random() * Math.PI * 2; 
    torus.rotation.z = Math.random() * Math.PI * 2;
    cube.rotation.x = torus.rotation.x;
    cube.rotation.y = torus.rotation.y;
    cube.rotation.z = torus.rotation.z;
    cubes.push(cube);
    toruses.push(torus);
    rotationAxes1.push(new THREE.Vector3(posX1, posY1, posZ1).normalize());
    rotationAxes2.push(new THREE.Vector3(posX2, posY2, posZ2).normalize());
    rotationSpeeds1.push(0.01);
    rotationSpeeds2.push(0.01);
    group.add(cube, torus);
}

scene.add(group);

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 8;
controls.maxDistance = 8;
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enableZoom = true;
controls.autoRotate = false;
controls.enablePan = true;
controls.enableKeys = false;
controls.enableRotate = true;

camera.position.set(0, 0, 8);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener("click", (e) => {
    pointer.x = e.clientX/window.innerWidth * 2 - 1;
    pointer.y =  - e.clientY/window.innerHeight * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length > 0){
        count++;
        count % 2 ? sound.play() : sound.pause();
    }
});

const animate = () => {
    for (let i = 0; i < 175; i++) {
        const cube = cubes[i];
        const torus = toruses[i];
        const rotationAxis1 = rotationAxes1[i];
        const rotationSpeed1 = rotationSpeeds1[i];
        
        const rotationAxis2 = rotationAxes2[i];
        const rotationSpeed2 = rotationSpeeds2[i];
        
        const quaternion1 = new THREE.Quaternion().setFromAxisAngle(rotationAxis1, rotationSpeed1);
        cube.quaternion.multiplyQuaternions(quaternion1, cube.quaternion);
        
        const quaternion2 = new THREE.Quaternion().setFromAxisAngle(rotationAxis2, rotationSpeed2);
        torus.quaternion.multiplyQuaternions(quaternion2, torus.quaternion);
    }
    time += 0.01
    group.rotation.z = 0.4 * Math.sin(time)
    group.rotation.x = 0.3 * Math.cos(time)
	renderer.render( scene, camera );
    controls.update();
    requestAnimationFrame( animate );
}

animate()