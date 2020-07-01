import { requestManager } from "../requestmanager/requestManager.js";

// pour les tests
import { login } from "../connection/conectionManager.js";

const { remote } = require("electron");
const env = remote.getGlobal("env");

const notyf = new Notyf(env.notyfconfig);

const DOM = 
{
    wellcome: document.getElementById('wellcome'),
    logout: document.getElementById('logout'),
    homeRedirect: document.getElementById('home-redirect'),
    room: 
    {
        maindiv: document.getElementById('createRoom-maindiv'),
        UID: document.getElementById('createRoom-UID'),
        loadbutton: document.getElementById('createRoom-loadbutton')
    },
    sandbox: 
    {
        //TODO :

        maindiv: document.getElementById(''),
        createbutton: document.getElementById('')
    }
};

function onStart()
{
    loadPanelData();

    // pour le debug
    /*login('admin@admin', 'admin')
    .then(() => 
    {
        
    });*/
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
    DOM.wellcome.innerHTML = `Welcome ${panelData.user.username}`;

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