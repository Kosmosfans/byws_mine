import { AdditiveBlending, DoubleSide, NormalBlending, ShaderMaterial, Vector2, Vector3 } from "three";

import v_flow from "../shaders/flow.vert";
import f_cloud from "../shaders/flow_cloud.frag";
import f_particle from "../shaders/flow_particle.frag";
import f_flame from "../shaders/flow_flame.frag";
import f_drop from "../shaders/flow_drop.frag";
import f_billowing from "../shaders/flow_billowing.frag";
import f_electro from "../shaders/flow_electro.frag";
import f_navigator from "../shaders/flow_navigator.frag";

import v_highlight from "../shaders/highlight.vert";
import f_highlight from "../shaders/highlight.frag";

import v_blink from "../shaders/blink.vert";
import f_blink from "../shaders/blink.frag";

import v_scanner from "../shaders/scanner.vert";
import f_scanner from "../shaders/scanner.frag";

import v_thread from "../shaders/thread.vert";
import f_thread from "../shaders/thread.frag";

import v_sensor from "../shaders/sensor.vert";
import f_sensor from "../shaders/sensor.frag";

import v_smoke from "../shaders/smoke.vert";
import f_smoke from "../shaders/smoke.frag";

import v_jet from "../shaders/jet.vert";
import f_jet from "../shaders/jet.frag";

import f_cloud3d from "../shaders/flow_cloud3d.frag";
import f_ct from "../shaders/ct.frag";

import v_terrain from "../shaders/terrain.vert";
import f_terrain from "../shaders/terrain.frag";

export const cloud_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_cloud,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const particle_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_particle,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const flame_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_flame,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const drop_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_drop,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
})

export const billowing_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_billowing,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const navigator_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_navigator,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});


export const electro_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_electro,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const jet_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_jet,
    fragmentShader: f_jet,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const highlight_material = new ShaderMaterial({
    uniforms: { uNormalOff: { value: 0.01 }, uTime: { value: 0 } },
    vertexShader: v_highlight,
    fragmentShader: f_highlight,
    transparent: true,
    blending: AdditiveBlending
});

export const blink_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_blink,
    fragmentShader: f_blink,
    transparent: false,
    blending: NormalBlending,
    vertexColors: true
});

export const scanner_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_scanner,
    fragmentShader: f_scanner,
    transparent: true,
    blending: AdditiveBlending,
    side: DoubleSide
});

export const thread_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_thread,
    fragmentShader: f_thread,
    transparent: true,
    blending: AdditiveBlending,
    side: DoubleSide
});

export const ct_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSize: { value: new Vector2() }, uColor: { value: new Vector3() } },
    vertexShader: v_thread,
    fragmentShader: f_ct,
    transparent: true,
    blending: AdditiveBlending,
    side: DoubleSide
});

export const smoke_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_smoke,
    fragmentShader: f_smoke,
    transparent: true,
    blending: AdditiveBlending,
    side: DoubleSide
});

export const sensor_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_sensor,
    fragmentShader: f_sensor,
    transparent: false,
    blending: NormalBlending,
    vertexColors: true
});

export const cloud3d_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_cloud3d,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const terrain_material = new ShaderMaterial({
    uniforms: {
        uWavePos: { value: [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()] },
        uElapsed: { value: [0, 0, 0, 0, 0] }
    },
    vertexShader: v_terrain,
    fragmentShader: f_terrain,
    transparent: true,
    blending: AdditiveBlending,
});