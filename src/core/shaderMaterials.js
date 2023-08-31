import { AdditiveBlending, DoubleSide, NormalBlending, ShaderMaterial, Vector4 } from "three";

import v_flow from "../shaders/flow.vert";
import f_cloud from "../shaders/flow_cloud.frag";
import f_particle from "../shaders/flow_particle.frag";
import f_flame from "../shaders/flow_flame.frag";
import f_drop from "../shaders/flow_drop.frag";
import f_billowing from "../shaders/flow_billowing.frag";
import f_electro from "../shaders/flow_electro.frag";

import v_highlight from "../shaders/highlight.vert";
import f_highlight from "../shaders/highlight.frag";

import v_blink from "../shaders/blink.vert";
import f_blink from "../shaders/blink.frag";

import v_scanner from "../shaders/scanner.vert";
import f_scanner from "../shaders/scanner.frag";

import v_thread from "../shaders/thread.vert";
import f_thread from "../shaders/thread.frag";


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

export const electro_material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: v_flow,
    fragmentShader: f_electro,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
});

export const highlight_material = new ShaderMaterial({
    uniforms: { uNormalOff: { value: 0.01 }, uColor: { value: new Vector4(1., 1., 1., 0.25) } },
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
