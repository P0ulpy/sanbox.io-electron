const { remote } = require("electron");
const env = remote.getGlobal("env");

import { requestManager } from "../requestmanager/requestManager.js";

const notyf = new Notyf(env.notyfconfig);

const DOM = 
{
    rooms: document.getElementById('rooms'),
    loadRoomRedirect: document.getElementById('loadRoom-redirect')
}

function onSart()
{

    requestManager.get('/rooms')
    .then((response) => 
    {
        return response.json();
    })
    .then((responseData) => 
    {
        console.log("rooms response data", responseData);
        
        if(responseData.status === "OK")
        {   
            onGetData(responseData.data);
        }
        else
        {
            notyf.error(`can't get rooms data`);
            throw new Error(`can't get rooms data`);
        }
    })
    .catch((err) => { throw err; });
    
}

function onGetData(data)
{
    let tab =  
    `
    <table class="tftable" border="1">
    <tr>
        <th>Nom</th>
        <th>Mod gameplay</th>
        <th>Mod overlay</th>
        <th>Mod environment</th>
        <th>Joueurs</th>
        <th>Rejoindre</th>
    </tr>    
    `;

    for(const room of data.rooms)
    {
        tab += 
        `
        <tr>
            <td>${room.name}</td>
            <td>${room.mods.gameplay.name}</td>
            <td>${room.mods.overlay.name}</td>
            <td>${room.mods.environment.name}</td>
            <td>${1}/${room.size}</td>
            <td><button onclick="connectRoom('${room.UID}')">join</button></td>
        </tr>
        `;
    }

    tab += "</table>";

    DOM.rooms.innerHTML = tab;
}

window.connectRoom = (roomUID) =>
{
    console.log(roomUID);

    env.openedRoomUID = roomUID;
    DOM.loadRoomRedirect.click();
}


onSart();