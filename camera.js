// =================================
// TRAP CITY 3D
// CAMERA SYSTEM V1
// =================================


export function updateCamera(
    camera,
    player
){


const distance = 10;

const height = 7;



const targetX =
player.position.x;


const targetY =
player.position.y + height;


const targetZ =
player.position.z + distance;



// Smooth follow

camera.position.x +=
(targetX - camera.position.x) * 0.08;


camera.position.y +=
(targetY - camera.position.y) * 0.08;


camera.position.z +=
(targetZ - camera.position.z) * 0.08;



camera.lookAt(
    player.position
);


}