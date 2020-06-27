import { login } from "../conectionManager.js";

const { remote } = require("electron");
const env = remote.getGlobal("env");

const notyf = new Notyf(env.notyfconfig);

const DOM = 
{
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
    login(DOM.login.email.value, DOM.login.password.value, notyf);
});