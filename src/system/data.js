import { airInit, airUpdate } from "../data/air_data.js";
import { personnelInit, personnelUpdate } from "../data/personnel_data.js";
import { conveyorUpdate } from "../data/conveyor_data.js";
import { tramUpdate } from "../data/tram_data.js";


export const data = {
    'personnel_init': personnelInit,
    'personnel_update': personnelUpdate,

    'air_init': airInit,
    'air_update': airUpdate,

    'conveyor_update': conveyorUpdate,

    'tram_update': tramUpdate,
}