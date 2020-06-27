import { requestManager } from "./requestManager.js";

// TODO : TEMP

const notyf = new Notyf({
    duration: 10000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'error',
        dismissible: true
      },
      {
        type: 'success',
        dismissible: true
      }
    ]
  });

const DOM = 
{
    info: document.getElementById('info'),
    warn: document.getElementById('warn'),
    error: document.getElementById('error'),

    wellcome : document.getElementById('wellcome'),
    room : 
    {
        maindiv: document.getElementById('createRoom-maindiv'),
        UID: document.getElementById('createRoom-UID'),
        loadbutton: document.getElementById('createRoom-loadbutton')
    },
    sandbox : 
    {
        
    }
}

let panelData = null;


// TODO : Connection (TEMP)

function connectUser()
{
    requestManager.post('/login', {'email': 'admin@admin', 'password': 'admin'})
    .then(async(response) => 
    {
        const responseData = await JSON.parse(await response.text());
        
        console.log("login response data", responseData);
        
        if(responseData.status === "OK")
        {
            loadPanelData();
        }
        else
        {
            notyf.error(responseData?.data?.message);
            throw new Error(responseData?.data?.message);
        }
    })
    .catch((err) => 
    {
        throw err;
    });
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
            panelData = responseData.data;
            onLoaded();
        }
        else
        {
            notyf.error(responseData?.data?.message);
            throw new Error(responseData?.data?.message);
        }
    })
    .catch((err) => 
    {
        throw err;
    });
}

function onLoaded()
{   
    DOM.wellcome.innerHTML = `Wellcome ${panelData.user.username}`;

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

connectUser();