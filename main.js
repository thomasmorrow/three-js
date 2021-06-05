import * as THREE from 'three';
import './style.css'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render(scene, camera);

// Torus

/*const torus = new THREE.Mesh(
    new THREE.TorusGeometry(10, 3, 16, 100),
    new THREE.MeshToonMaterial({ color: 0xff6347, wireframe: true })
);

torus.geometry.center();

const outer_torus = new THREE.Mesh(
    new THREE.TorusGeometry(20, 1, 16, 100),
    new THREE.MeshToonMaterial({ color: 0x545478, wireframe: true })
)

outer_torus.geometry.center();

scene.add(torus);
scene.add(outer_torus);*/

const torus_1 = new THREE.Mesh(
  new THREE.TorusGeometry(5, 0.5, 16, 100),
  new THREE.MeshToonMaterial({ color: 0xff6347, wireframe: false })
);

const torus_2 = new THREE.Mesh(
  new THREE.TorusGeometry(7.5, 0.5, 16, 100),
  new THREE.MeshToonMaterial({ color: 0xff6347, wireframe: false })
);

const torus_3 = new THREE.Mesh(
  new THREE.TorusGeometry(10, 0.5, 16, 100),
  new THREE.MeshToonMaterial({ color: 0xff6347, wireframe: false })
);

torus_1.geometry.center();
torus_2.geometry.center();
torus_3.geometry.center();

scene.add(torus_1, torus_2, torus_3);

torus_1.rotation.x = 30;
torus_2.rotation.x = -30;


// Icosahedron

const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.MeshStandardMaterial({ color: 0xf31232, wireframe: false, emissive: 0xffffff })
);

scene.add(ico);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 2);
scene.add(pointLight)

//scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

window.addEventListener('resize', onWindowResize);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight )
}

let time = 0;

// Animation Loop

function animate(t) {
    requestAnimationFrame(animate);
  
    let rotation_speed = 0.01
    //torus.rotation.x += 0.024546;
    //torus.rotation.y += 0.003333;
    //torus.rotation.z += 0.0147687;
    torus_1.rotateY(rotation_speed+0.005)
    torus_2.rotateY(rotation_speed-0.005)
    torus_3.rotateY(rotation_speed)

    ico.rotation.x += -0.01;
    ico.rotation.y += -0.025;
    ico.rotation.z += -0.05;

    ico.position.y = Math.sin(time) * 2
    
    time += 0.03

    if(time > 2*Math.PI){
      time = 0
    }
    

  
    //moon.rotation.x += 0.005;
  
    // controls.update();
  
    renderer.render(scene, camera);
  }
  
  animate();