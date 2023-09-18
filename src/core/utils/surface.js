import { Raycaster, Vector3 } from "three";

export default function surfaceDetect(xMin, xMax, xStep, zMin, zMax, zStep, mesh) {
    const dir = new Vector3(0, -1, 0);
    const rayCaster = new Raycaster();

    const result = [];

    for (let x = xMin; x < xMax; x += xStep) {
        for (let z = zMin; z < zMax; z += zStep) {
            const ro = new Vector3(x, 1000, z);
            rayCaster.set(ro, dir);

            const intersects = rayCaster.intersectObject(mesh);

            if (intersects.length) result.push({
                "x": intersects[0].point.x,
                "y": intersects[0].point.y,
                "z": intersects[0].point.z
            });
        }
    }
    console.log(JSON.stringify(result));
}