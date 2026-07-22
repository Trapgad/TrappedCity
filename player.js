// =================================
// TRAP CITY 3D
// PLAYER MOVEMENT SYSTEM V1
// =================================


export const keys = {};

let velocity = {
    x:0,
    z:0
};


window.addEventListener("keydown",(event)=>{

    keys[event.key.toLowerCase()] = true;

});


window.addEventListener("keyup",(event)=>{

    keys[event.key.toLowerCase()] = false;

});



export function updatePlayer(player, delta){


    const speed = 5;


    let direction = {
        x:0,
        z:0
    };


    // Movement input

    if(keys["w"])
        direction.z -= 1;


    if(keys["s"])
        direction.z += 1;


    if(keys["a"])
        direction.x -= 1;


    if(keys["d"])
        direction.x += 1;



    // Normalize diagonal movement

    const length = Math.sqrt(
        direction.x ** 2 +
        direction.z ** 2
    );


    if(length > 0){

        direction.x /= length;
        direction.z /= length;

    }



    // Smooth movement

    velocity.x +=
    (direction.x * speed - velocity.x) * 0.15;


    velocity.z +=
    (direction.z * speed - velocity.z) * 0.15;



    player.position.x +=
    velocity.x * delta;


    player.position.z +=
    velocity.z * delta;


}