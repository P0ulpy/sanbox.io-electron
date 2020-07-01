import { requestManager } from "../requestmanager/requestManager.js";

// pour les tests
import { login } from "../connection/conectionManager.js";
import RoomList from "../home/roomList.js";

const { remote } = require("electron");
const env = remote.getGlobal("env");

const notyf = new Notyf(env.notyfconfig);

let roomList = null;

const DOM = 
{
    wellcome: document.getElementById('wellcome'),
    logout: document.getElementById('logout'),
    homeRedirect: document.getElementById('home-redirect'),
    loadRoomRedirect: document.getElementById('loadRoom-redirect'),
    rooms: document.getElementById('rooms'),
    room: 
    {
        maindiv: document.getElementById('createRoom-maindiv'),
        UID: document.getElementById('createRoom-UID'),
        loadbutton: document.getElementById('createRoom-loadbutton')
    }
};

function onStart()
{
    loadPanelData();
    roomList = new RoomList(DOM.rooms, DOM.loadRoomRedirect, notyf);
}

function loadPanelData()
{
    requestManager.get('/mypanel')
    .then(async(response) =>
    {
        const responseData = await JSON.parse(await response.text());

        console.log("panel data", responseData);
        
        if(responseData.status === "OK")
        {
            onLoaded(responseData.data);
        }
        else
        {
            notyf.error(responseData?.data?.message);
            DOM.homeRedirect.click();
            throw new Error(responseData?.data?.message);
        }
    })
    .catch((err) => 
    {
        throw err;
    });
}

function onLoaded(panelData)
{   
    //DOM.wellcome.innerHTML = `Welcome ${panelData.user.username}`;

    DOM.room.loadbutton.addEventListener('click', (event) => 
    {
        requestManager.post('/createRoom', { UID: DOM.room.UID.value })
        .then(async(response) => 
        {
            const responseData = await JSON.parse(await response.text());
            console.log(responseData);

            if(responseData.status === "OK")
            {
                notyf.success(`Successfully created Sandbox ${responseData.data.UID}`);
            }
            else
            {
                notyf.error(responseData?.data?.message);
                throw new Error(responseData?.data?.message);
            }
        })
        .catch((err) => { throw err });
    });
}

onStart();