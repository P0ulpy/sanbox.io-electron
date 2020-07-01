const { remote } = require("electron");
const env = remote.getGlobal("env");

import { register } from "./conectionManager.js";



const notyf = new Notyf(env.notyfconfig);

const DOM = 
{
    loginRedirect: document.getElementById('login-redirect'), 
    register:
    {
        maindiv: document.getElementById('register-maindiv'),
        username: document.getElementById('register-username'),
        email: document.getElementById('register-email'),
        password: document.getElementById('register-password'),
        button: document.getElementById('register-button')
    }
}

DOM.register.button.addEventListener('click', () => 
{
    register(DOM.register.username.value, DOM.register.email.value, DOM.register.password.value, notyf)
    .then(() => 
    {
        DOM.loginRedirect.click();
    })
    .catch((err) => {throw err;});
});