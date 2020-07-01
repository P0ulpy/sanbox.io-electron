import {
    getUserData,
    logout
} from "./conectionManager.js";

/*
    /!\ ce script a imperativement besoin d'un balise avec l'id "userData" pour fonctionner

    ce script gère le si un utilisateur est connecter ou non et cutomise le contenu de la balise userData en fonction
    si il est connecter il ecrit hi {username} et affiche un lien pour aller a sont panel
    dans la cas contraire il affiche deux lien "sign in" (login) et "sign up" (register)

    ps. oui le code est a dégeu mais bon paltemp
*/

const DOM = {
    user: document.getElementById("user")
}

if (!DOM.user) {
    console.error('you add userData script to this page but there is not user div');
} else {

    function showConnected(userData) {
        DOM.user.innerHTML = "";

        const wellcomeH1 = document.createElement("div");
        wellcomeH1.innerHTML = `Hello ${userData.username}`;

        const panelURL = document.createElement("a");
        panelURL.setAttribute("href", "./panel.html");
        panelURL.innerHTML = "panel";

        const redirectURL = document.createElement("a");
        redirectURL.setAttribute("hiddens", "");
        redirectURL.setAttribute("href", "./index.html");

        const logoutButton = document.createElement("button");
        logoutButton.innerHTML = "Logout";
        logoutButton.addEventListener('click', () => {
            logout().then(() => {
                redirectURL.click();
            });
        });

        DOM.user.appendChild(wellcomeH1);
        DOM.user.appendChild(panelURL);
        DOM.user.appendChild(logoutButton);
    }

    function showDiconnected() {
        DOM.user.innerHTML = "";

        DOM.user.innerHTML =
            `
        <div class="row">
        <div class="col s6 offset-s3">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">You need to login / register</span>
                    <p>You need to be logged in in order to access the full experienxe</p>
                    </div>
                    <div class="card-action">
                    <a class="waves-effect waves-light btn" href="./login.html">login</a>
                    <a class="waves.effect waves-lgith btn" href="./register.html" >register</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    getUserData()
        .then((response) => {
            if (response.status === 'OK') {
                showConnected(response.userData);
            } else {
                showDiconnected();
            }
        }).catch((err) => {
            throw err;
        })
}