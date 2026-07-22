import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

export function createWorld(scene){

    // ---------- Roads ----------

    const roadMaterial = new THREE.MeshStandardMaterial({
        color:0x222222
    });

    const road1 = new THREE.Mesh(
        new THREE.BoxGeometry(60,0.1,8),
        roadMaterial
    );

    road1.position.y = 0.05;
    scene.add(road1);

    const road2 = road1.clone();
    road2.position.z = -20;
    scene.add(road2);

    // ---------- Buildings ----------

    const buildingMaterial = new THREE.MeshStandardMaterial({
        color:0x666666
    });

    for(let i=-20;i<=20;i+=20){

        const building = new THREE.Mesh(

            new THREE.BoxGeometry(8,12,8),

            buildingMaterial

        );

        building.position.set(i,6,-10);

        scene.add(building);

    }

    // ---------- Trees ----------

    for(let i=-25;i<=25;i+=25){

        const trunk = new THREE.Mesh(

            new THREE.CylinderGeometry(0.4,0.4,2),

            new THREE.MeshStandardMaterial({
                color:0x8B4513
            })

        );

        trunk.position.set(i,1,10);

        scene.add(trunk);

        const leaves = new THREE.Mesh(

            new THREE.SphereGeometry(2),

            new THREE.MeshStandardMaterial({
                color:0x228B22
            })

        );

        leaves.position.set(i,3,10);

        scene.add(leaves);

    }

    // ---------- Street Lights ----------

    for(let i=-20;i<=20;i+=20){

        const pole = new THREE.Mesh(

            new THREE.CylinderGeometry(0.1,0.1,5),

            new THREE.MeshStandardMaterial({
                color:0xaaaaaa
            })

        );

        pole.position.set(i,2.5,5);

        scene.add(pole);

        const lamp = new THREE.PointLight(
            0xfff2cc,
            5,
            15
        );

        lamp.position.set(i,5,5);

        scene.add(lamp);

    }

}