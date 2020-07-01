const { remote } = require("electron");
const env = remote.getGlobal("env");

import { login } from "./conectionManager.js";

const notyf = new Notyf(env.notyfconfig);

const DOM = 
{
    panelRedirect: document.getElementById('panel-redirect'), 
    login:
    {
        maindiv: document.getElementById('login-maindiv'),
        email: document.getElementById('login-email'),
        password: document.getElementById('login-password'),
        button: document.getElementById('login-button')
    }
}

DOM.login.button.addEventListener('click', () => 
{
    login(DOM.login.email.value, DOM.login.password.value, notyf)
    .then(() => 
    {
        DOM.panelRedirect.click();
    })
    .catch((err) => 
    {
        console.log("mdr")
    });
});