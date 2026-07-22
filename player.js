// =================================
// TRAP CITY 3D
// PLAYER SYSTEM + MOBILE + COLLISION
// =================================


import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

import { buildings } from "./world.js";



// =================================
// KEYBOARD CONTROLS
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




// =================================
// MOBILE JOYSTICK
// =================================


let joystick = {

    x:0,
    z:0

};



const joystickArea =
document.getElementById("joystick");


const stick =
document.getElementById("stick");



if(joystickArea){


joystickArea.addEventListener(
"touchmove",
(e)=>{


e.preventDefault();


const touch =
e.touches[0];


const rect =
joystickArea.getBoundingClientRect();



let x =
touch.clientX -
(rect.left + rect.width / 2);



let y =
touch.clientY -
(rect.top + rect.height / 2);



joystick.x =
Math.max(
-1,
Math.min(
1,
x / 50
)
);



joystick.z =
Math.max(
-1,
Math.min(
1,
y / 50
)
);



if(stick){

stick.style.transform =
`translate(${joystick.x * 30}px, ${joystick.z * 30}px)`;

}


},
{
passive:false
});



joystickArea.addEventListener(
"touchend",
()=>{


joystick.x = 0;

joystick.z = 0;



if(stick){

stick.style.transform =
"translate(0,0)";

}


});


}




// =================================
// PLAYER MOVEMENT
// =================================


export function updatePlayer(
player,
delta
){


const speed = 5;



let direction = {

    x:0,
    z:0

};



// KEYBOARD

if(keys["w"])
direction.z -= 1;


if(keys["s"])
direction.z += 1;


if(keys["a"])
direction.x -= 1;


if(keys["d"])
direction.x += 1;




// MOBILE

direction.x += joystick.x;

direction.z += joystick.z;





// NORMALIZE

const length =
Math.sqrt(
direction.x ** 2 +
direction.z ** 2
);



if(length > 0){

direction.x /= length;

direction.z /= length;

}





// SAVE POSITION

const oldPosition = {

x: player.position.x,

z: player.position.z

};





// MOVE

player.position.x +=
direction.x * speed * delta;


player.position.z +=
direction.z * speed * delta;





// COLLISION

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


player.position.x =
oldPosition.x;


player.position.z =
oldPosition.z;


}


}



}