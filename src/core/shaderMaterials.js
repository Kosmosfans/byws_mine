import { AdditiveBlending, NormalBlending, ShaderMaterial, Vector4 } from "three";

import v_flow from "../shaders/flow.vert";
import f_cloud from "../shaders/flow_cloud.frag";
import f_particle from "../shaders/flow_particle.frag";
import f_flame from "../shaders/flow_flame.frag";
import f_drop from "../shaders/flow_drop.frag";

import v_highlight from "../shaders/highlight.vert";
import f_highlight from "../shaders/highlight.frag";

import v_blink from "../shaders/blink.vert";
import f_blink from "../shaders/blink.frag";

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
    uniforms: {uTime:{value:0}},
    vertexShader: v_flow,
    fragmentShader: f_drop,
    transparent: true,
    blending: AdditiveBlending,
    vertexColors: true
})

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