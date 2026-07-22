import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

import { buildings } from "./world.js";


// =================================
// TRAP CITY 3D
// PLAYER SYSTEM + COLLISION
// =================================


export const keys = {};



window.addEventListener(
"keydown",
(e)=>{

keys[e.key.toLowerCase()] = true;

});



window.addEventListener(
"keyup",
(e)=>{

keys[e.key.toLowerCase()] = false;

});





export function updatePlayer(
player,
delta
){


const speed = 5;



let direction = {
    x:0,
    z:0
};



// CONTROLS

if(keys["w"])
direction.z -= 1;


if(keys["s"])
direction.z += 1;


if(keys["a"])
direction.x -= 1;


if(keys["d"])
direction.x += 1;




// NORMALIZE MOVEMENT

const length =
Math.sqrt(
    direction.x ** 2 +
    direction.z ** 2
);


if(length > 0){

direction.x /= length;
direction.z /= length;

}




// STORE OLD POSITION

const oldPosition = {
    x: player.position.x,
    z: player.position.z
};




// MOVE PLAYER

player.position.x +=
direction.x * speed * delta;


player.position.z +=
direction.z * speed * delta;





// PLAYER COLLISION BOX

const playerBox =
new THREE.Box3()
.setFromObject(player);





// CHECK BUILDINGS

for(
let building of buildings
){


const buildingBox =
new THREE.Box3()
.setFromObject(building);



if(
playerBox.intersectsBox(
buildingBox
)
){


    // BLOCK MOVEMENT

    player.position.x =
    oldPosition.x;


    player.position.z =
    oldPosition.z;


}



}



}