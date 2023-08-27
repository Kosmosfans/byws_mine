import { airInit, airUpdate } from "../data/realtime/air.js";
import { personnelInit, personnelUpdate } from "../data/realtime/personnel.js";
import { conveyorUpdate } from "../data/realtime/conveyor.js";
import { tramUpdate } from "../data/realtime/tram.js";
import { seismicUpdate } from "../data/realtime/seismic.js";


export const data = {
    'personnel_init': personnelInit,
    'personnel_update': personnelUpdate,

    'air_init': airInit,
    'air_update': airUpdate,

    'conveyor_update': conveyorUpdate,

    'tram_update': tramUpdate,

    'seismic_update': seismicUpdate,
}