import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";
import { updatePlayer } from "./player.js";
import { createWorld } from "./world.js";

// =================================
// TRAP CITY 3D
// MAIN ENGINE
// =================================

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 12);

// RENDERER
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// =================================
// LIGHTING
// =================================

const light = new THREE.DirectionalLight(
    0xffffff,
    2
);

light.position.set(10, 20, 10);

scene.add(light);

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambient);

// =================================
// WORLD
// =================================

createWorld(scene);

// =================================
// PLAYER
// =================================

const player = new THREE.Mesh(

    new THREE.BoxGeometry(1, 2, 1),

    new THREE.MeshStandardMaterial({
        color: 0xff0055
    })

);

player.position.set(0, 1, 0);

scene.add(player);

// =================================
// REMOVE LOADING SCREEN
// =================================

const loading = document.getElementById("loading");

if (loading) {
    loading.remove();
}

// =================================
// GAME LOOP
// =================================


let clock = new THREE.Clock();


function animate(){

    requestAnimationFrame(animate);


    let delta = clock.getDelta();


    updatePlayer(player, delta);


    camera.position.x =
    player.position.x;


    camera.position.y =
    player.position.y + 8;


    camera.position.z =
    player.position.z + 10;


    camera.lookAt(player.position);


    renderer.render(
        scene,
        camera
    );

}
    requestAnimationFrame(animate);

    // PLAYER MOVEMENT
    updatePlayer(player);

    // THIRD PERSON CAMERA
    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 8;
    camera.position.z = player.position.z + 10;

    camera.lookAt(player.position);

    renderer.render(scene, camera);

}

animate();

// =================================
// WINDOW RESIZE
// =================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight);

});