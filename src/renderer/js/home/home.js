const { remote } = require("electron");
const env = remote.getGlobal("env");

import RoomList from "./roomList.js";

const notyf = new Notyf(env.notyfconfig);

let roomList = null; 

const DOM = 
{
    rooms: document.getElementById('rooms'),
    loadRoomRedirect: document.getElementById('loadRoom-redirect')
}

function onSart()
{
    roomList = new RoomList(DOM.rooms, DOM.loadRoomRedirect, notyf);
}

onSart();