// =================================
// TRAP CITY 3D
// PLAYER + COLLISION SYSTEM
// =================================


import { buildings } from "./world.js";


export const keys = {};


let velocity = {
    x:0,
    z:0
};



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



if(keys["w"])
direction.z -= 1;


if(keys["s"])
direction.z += 1;


if(keys["a"])
direction.x -= 1;


if(keys["d"])
direction.x += 1;



const length =
Math.sqrt(
direction.x ** 2 +
direction.z ** 2
);



if(length > 0){

direction.x /= length;
direction.z /= length;

}




// Calculate movement

let moveX =
direction.x * speed * delta;


let moveZ =
direction.z * speed * delta;




// Save old position

let oldX =
player.position.x;


let oldZ =
player.position.z;



// Move player

player.position.x += moveX;

player.position.z += moveZ;



// Collision check

const playerBox =
new THREE.Box3()
.setFromObject(player);



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


    // Cancel movement

    player.position.x =
    oldX;


    player.position.z =
    oldZ;


}


}



}