import { getUserData, logout } from "./conectionManager.js";

/*
    /!\ ce script a imperativement besoin d'un balise avec l'id "userData" pour fonctionner

    ce script gère le si un utilisateur est connecter ou non et cutomise le contenu de la balise userData en fonction
    si il est connecter il ecrit hi {username} et affiche un lien pour aller a sont panel
    dans la cas contraire il affiche deux lien "sign in" (login) et "sign up" (register)

    ps. oui le code est a dégeu mais bon paltemp
*/

const DOM = 
{
    user: document.getElementById("user")
}

if(!DOM.user)
{
    console.error('you add userData script to this page but there is not user div');
}
else
{
    // de base on montre le profil offline
    showDiconnected();

    function showConnected(userData)
    {
        DOM.user.innerHTML = "";

        const wellcomeH1 = document.createElement("h2");
        wellcomeH1.innerHTML = `Hello ${userData.username}`;

        const panelURL = document.createElement("a");
        panelURL.setAttribute("href", "./panel.html");
        panelURL.innerHTML = "panel";

        const redirectURL = document.createElement("a");
        redirectURL.setAttribute("hiddens", "");
        redirectURL.setAttribute("href", "./index.html");
        
        const logoutButton = document.createElement("button");
        logoutButton.innerHTML = "Logout";
        logoutButton.addEventListener('click', () => 
        {
            logout().then(() => 
            {
                redirectURL.click();
            });
        });
    
        DOM.user.appendChild(wellcomeH1);
        DOM.user.appendChild(panelURL);
        DOM.user.appendChild(logoutButton);
    }
    
    function showDiconnected()
    {   
        DOM.user.innerHTML = "";

        DOM.user.innerHTML =
        `
        <a href="./login.html">login</a>
        <a href="./register.html">register</a>
        `;
    }
    
    getUserData()
    .then((response) => 
    {
        if(response.status === 'OK')
        {
            showConnected(response.userData);
        }
        else
        {
            showDiconnected();
        }
    }).catch((err) => {throw err;})    
}