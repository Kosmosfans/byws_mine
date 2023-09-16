import camera_states from "/src/config/camera_states.json" assert { type: 'JSON' };
import api from "./api.js";

const $ = id => document.getElementById(id);
const $$ = name => document.getElementsByClassName(name);

const uiCameraMenu = $('camera_menu');
const uiFunctionMenu = $('function_menu');

const uiCameraGroup = Array.from($$('camera'));
const uiModuleGroup = Array.from($$('module'));
const uiFunctionGroup = Array.from($$('function'));

const buttonBind = {
    'module_btn_air': module_btn_air_clicked,
    'module_btn_personnel': module_btn_personnel_clicked,
    'module_btn_coal': module_btn_coal_clicked,
    'module_btn_tram': module_btn_tram_clicked,
    'module_btn_electro': module_btn_electro_clicked,
    'module_btn_surveillance': module_btn_surveillance_clicked,
    'module_btn_patrol': module_btn_patrol_clicked,
    'module_btn_monitor': module_btn_monitor_clicked,
    'module_btn_navigator': module_btn_navigator_clicked,
    'module_btn_detail': module_btn_detail_clicked,

    'module_btn_ct': module_btn_ct_clicked,
    'module_btn_seismic': module_btn_seismic_clicked,

    'function_btn_air_1': function_btn_air_1_clicked,
    'function_btn_air_2': function_btn_air_2_clicked,
    'function_btn_air_3': function_btn_air_3_clicked,
    'function_btn_air_4': function_btn_air_4_clicked,

    'function_btn_ct_1': function_btn_ct_1_clicked,
    'function_btn_ct_2': function_btn_ct_2_clicked,
    'function_btn_ct_3': function_btn_ct_3_clicked,
    'function_btn_ct_4': function_btn_ct_4_clicked,
}

function init() {
    uiModuleGroup.forEach(b => b.addEventListener('click', () => buttonBind[b.id].call()));

    uiFunctionGroup.filter(v => buttonBind[v.id]).forEach(b => b.addEventListener('click', () => buttonBind[b.id].call()));
    $('function_slider_ct_1').addEventListener('input', e => function_slider_ct_1_changed(e));
    $('function_slider_ct_2').addEventListener('input', e => function_slider_ct_2_changed(e));

    uiCameraGroup.forEach(b => b.addEventListener('click', e => cameraBtnClicked(e.target)));

    setDefaultState();
}

function setDefaultState() {
    uiModuleGroup[0].dispatchEvent(new Event('click'));
    uiCameraGroup[0].dispatchEvent(new Event('click'));

    $('function_btn_air_1').dispatchEvent(new Event('click'));
    [1, 2, 3, 4].forEach(i => $('function_btn_ct_' + i).dispatchEvent(new Event('click')));
}

function cameraBtnClicked(btn) {
    const lut = {
        camera_btn_1: camera_states.default,
        camera_btn_2: camera_states.surface,
        camera_btn_3: camera_states.layer_1,
        camera_btn_4: camera_states.layer_2,
        camera_btn_5: camera_states.top_view,
        camera_btn_6: camera_states.default,
    };
    api.setCameraState(lut[btn.id]);
}

export default {
    init,
}

function module_btn_air_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_air' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    const sub = ['function_btn_air_1', 'function_btn_air_2', 'function_btn_air_3', 'function_btn_air_4'];
    uiFunctionGroup.forEach(b => sub.includes(b.id) ? b.style.display = 'inline' : b.style.display = 'none');
    uiFunctionMenu.style.visibility = 'visible';
    api.setScenario('tunnel');
    api.setModule('air');
    api.enableInteraction();
}

function module_btn_personnel_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_personnel' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('personnel');
    api.enableInteraction();
}

function module_btn_coal_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_coal' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('coal');
    api.enableInteraction();
}

function module_btn_tram_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_tram' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('tram');
    api.enableInteraction();
}

function module_btn_electro_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_electro' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('electro');
    api.enableInteraction();
}

function module_btn_surveillance_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_surveillance' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('surveillance');
    api.enableInteraction();
}

function module_btn_patrol_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_patrol' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('patrol');
    api.enableInteraction();
}

function module_btn_monitor_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_monitor' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('monitor');
    api.enableInteraction();
}

function module_btn_navigator_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_navigator' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('navigator');
    api.enableInteraction();
}

function module_btn_detail_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_detail' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'visible';
    uiFunctionMenu.style.visibility = 'hidden';
    api.setScenario('tunnel');
    api.setModule('detail');
    api.enableInteraction();
}

function module_btn_ct_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_ct' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'hidden';
    const sub = ['function_btn_ct_1', 'function_btn_ct_2', 'function_btn_ct_3', 'function_btn_ct_4', 'function_slider_ct_1', 'function_slider_ct_2'];
    uiFunctionGroup.forEach(b => sub.includes(b.id) ? b.style.display = 'inline' : b.style.display = 'none');
    uiFunctionMenu.style.visibility = 'visible';
    api.enableClipping();
    api.setScenario('stratum');
    api.setModule('ct');
    api.disableInteraction();
}

function module_btn_seismic_clicked() {
    uiModuleGroup.forEach(b => b.id === 'module_btn_seismic' ? b.classList.add('selected') : b.classList.remove('selected'));
    uiCameraMenu.style.visibility = 'hidden';
    uiFunctionMenu.style.visibility = 'hidden';
    api.disableClipping();
    api.setScenario('stratum');
    api.setModule('seismic');
    api.disableInteraction();
}

function function_btn_air_1_clicked() {
    const group = ['function_btn_air_1', 'function_btn_air_2', 'function_btn_air_3', 'function_btn_air_4'];
    uiFunctionGroup.filter(v => group.includes(v.id)).forEach(b => b.id === 'function_btn_air_1' ? b.classList.add('selected') : b.classList.remove('selected'));
    api.setFlowMaterial(0);
}

function function_btn_air_2_clicked() {
    const group = ['function_btn_air_1', 'function_btn_air_2', 'function_btn_air_3', 'function_btn_air_4'];
    uiFunctionGroup.filter(v => group.includes(v.id)).forEach(b => b.id === 'function_btn_air_2' ? b.classList.add('selected') : b.classList.remove('selected'));
    api.setFlowMaterial(1);
}

function function_btn_air_3_clicked() {
    const group = ['function_btn_air_1', 'function_btn_air_2', 'function_btn_air_3', 'function_btn_air_4'];
    uiFunctionGroup.filter(v => group.includes(v.id)).forEach(b => b.id === 'function_btn_air_3' ? b.classList.add('selected') : b.classList.remove('selected'));
    api.setFlowMaterial(2);
}

function function_btn_air_4_clicked() {
    const group = ['function_btn_air_1', 'function_btn_air_2', 'function_btn_air_3', 'function_btn_air_4'];
    uiFunctionGroup.filter(v => group.includes(v.id)).forEach(b => b.id === 'function_btn_air_4' ? b.classList.add('selected') : b.classList.remove('selected'));
    api.setFlowMaterial(3);
}

function function_btn_ct_1_clicked() {
    const btn = $('function_btn_ct_1');
    const selected = Array.from(btn.classList).includes('selected');
    selected ? btn.classList.remove('selected') : btn.classList.add('selected');
    selected ? api.hideStratumLayer(0) : api.showStratumLayer(0);
}

function function_btn_ct_2_clicked() {
    const btn = $('function_btn_ct_2');
    const selected = Array.from(btn.classList).includes('selected');
    selected ? btn.classList.remove('selected') : btn.classList.add('selected');
    selected ? api.hideStratumLayer(1) : api.showStratumLayer(1);
}

function function_btn_ct_3_clicked() {
    const btn = $('function_btn_ct_3');
    const selected = Array.from(btn.classList).includes('selected');
    selected ? btn.classList.remove('selected') : btn.classList.add('selected');
    selected ? api.hideStratumLayer(2) : api.showStratumLayer(2);
}

function function_btn_ct_4_clicked() {
    const btn = $('function_btn_ct_4');
    const selected = Array.from(btn.classList).includes('selected');
    selected ? btn.classList.remove('selected') : btn.classList.add('selected');
    selected ? api.hideStratumLayer(3) : api.showStratumLayer(3);
}

function function_slider_ct_1_changed(e) {
    const pct = e.target.value / e.target.max;
    api.ctClippingX(pct);
}

function function_slider_ct_2_changed(e) {
    const pct = e.target.value / e.target.max;
    api.ctClippingZ(pct);
}