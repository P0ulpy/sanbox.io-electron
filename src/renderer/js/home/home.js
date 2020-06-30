const { remote } = require("electron");
const env = remote.getGlobal("env");

import { requestManager } from "../requestmanager/requestManager.js";

const DOM = 
{
    rooms: document.getElementById('rooms')
}

requestManager.get()