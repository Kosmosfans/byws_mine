import patrol_paths from "../cfg/patrol_paths.json" assert { type: "JSON" };

import patrolMesh from "./patrolMesh.js";
import { Color, Object3D, Vector3 } from "three";
import { clamp, outside, rand, randRange } from "./utils/utils.js";

const AXIS_Y = new Vector3(0, 1, 0);

let _mesh, dummy, robots;

export default class Patrol {
    constructor(robotMesh) {
        init(robotMesh);
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        _mesh.children[1].material.uniforms.uTime.value += delta;
        _mesh.children[2].material.uniforms.uTime.value += delta;
        animate(delta);
    }
}

function init(robotMesh) {
    dummy = new Object3D();

    _mesh = patrolMesh(robotMesh, patrol_paths.length);

    robots = patrol_paths.map(() => new Object());
    initRobots();
    initScanColors();
}

function initRobots() {
    robots.forEach((v, i) => initRobot(i));
}

function initRobot(i) {
    robots[i].prop = rand();
    robots[i].dir = 1;
    robots[i].start = new Vector3(patrol_paths[i].start.x, patrol_paths[i].start.y, patrol_paths[i].start.z);
    robots[i].end = new Vector3(patrol_paths[i].end.x, patrol_paths[i].end.y, patrol_paths[i].end.z);
    robots[i].phase = randRange(0, Math.PI * 2);
    robots[i].angle = robots[i].end.clone().sub(robots[i].start).angleTo(new Vector3(0, 0, 1));
    robots[i].speed = randRange(0.03, 0.1);

    const position = new Vector3().lerpVectors(robots[i].start, robots[i].end, robots[i].prop);

    dummy.setRotationFromAxisAngle(AXIS_Y, robots[i].angle);
    dummy.position.copy(position);
    dummy.updateMatrix();

    _mesh.children[0].setMatrixAt(i, dummy.matrix);

    dummy.setRotationFromAxisAngle(AXIS_Y, robots[i].phase);
    dummy.position.copy(position);
    dummy.updateMatrix();

    _mesh.children[1].setMatrixAt(i, dummy.matrix);
}

function initScanColors() {
    patrol_paths.forEach((v, i) => _mesh.children[1].setColorAt(i, new Color(0.9, 0.2, 0.2)));
}

function animate(delta) {
    robots.forEach((p, i) => updateRobot(i, p, delta));

    _mesh.children[0].instanceMatrix.needsUpdate = true;
    _mesh.children[1].instanceMatrix.needsUpdate = true;
}

function updateRobot(i, p, delta) {
    // robot
    p.prop += p.speed * delta * p.dir;
    const pos = new Vector3().lerpVectors(p.start, p.end, p.prop);

    dummy.setRotationFromAxisAngle(AXIS_Y, p.angle);
    dummy.position.copy(pos);
    dummy.updateMatrix();

    _mesh.children[0].setMatrixAt(i, dummy.matrix);

    // scan effect
    p.phase += 0.01;
    dummy.setRotationFromAxisAngle(AXIS_Y, p.phase);
    dummy.position.copy(pos);
    dummy.updateMatrix();

    _mesh.children[1].setMatrixAt(i, dummy.matrix);

    if (!outside(p.prop, 0, 1)) return;

    p.dir *= -1;
    p.prop = clamp(p.prop, 0, 1);
}