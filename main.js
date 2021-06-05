import * as THREE from 'three';
import './style.css'

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
* Camera
*/

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)


const mat_metal = new THREE.MeshStandardMaterial({ color: 0xff6347, metalness: 0.7, roughness: 0.1 });
const mat_toon = new THREE.MeshToonMaterial({ color: 0x5599ff });

const torus_1 = new THREE.Mesh(
    new THREE.TorusGeometry(5, 0.5, 16, 100),
    mat_toon
);

const ico_1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 8, 8,),
    mat_metal
);

torus_1.geometry.center();
ico_1.geometry.center();

scene.add(torus_1);
scene.add(ico_1);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-30, 50, 30);
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x2121ff);
pointLight2.position.set(-15, 30, 20);
scene.add(pointLight2)

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

//Window resize

window.addEventListener('resize', onWindowResize);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight )
}

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torus_1.rotation.y = .5 * elapsedTime

    ico_1.position.y = Math.sin(elapsedTime)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()