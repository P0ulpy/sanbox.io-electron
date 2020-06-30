const env = require("electron").remote.getGlobal("env");

export default class ClientRoom
{
    constructor(config, mods)
    {
        this.config = config;

        this.environmentMod = mods.environmentMod;
        this.gameplayMod = mods.gameplayMod;
        this.overlayMod = mods.overlayMod;

        console.log(`${env.server}/${config.UID}`);
        
        this.socket = io(`${env.server}/${config.UID}`);
        window.socket = this.socket;

        this.initModEvents();
        this.initSocket();
    }

    initModEvents()
    {
        this.gameplayMod.on("sendData", (event, data) => this.sendData("gameplay", event, data));
        this.environmentMod.on("sendData", (event, data) => this.sendData("environment", event, data));
        this.overlayMod.on("sendData", (event, data) => this.sendData("overlay", event, data));
    }

    initSocket()
    {
        // @TODO faire notyf
        this.socket.on("connect", () =>
        {
            console.log("Connexion OK");
        });

        this.socket.on("connect_error", (error) =>
        {
            alert(error);
        });

        this.socket.on("disconnect", (reason) =>
        {
            alert(reason);
        });

        this.socket.on("error", (error) =>
        {
            alert(error);
        });

        this.socket.on("overlay", (data) =>
        {
            this.overlayMod.emit("receiveData", data);
        })

        .on("gameplay", (data) =>
        {
            this.gameplayMod.emit("receiveData", data);
        })

        .on("environment", (data) =>
        {
            this.environmentMod.emit("receiveData", data);
        });
    }

    sendData(targetMod, event, data)
    {
        this.socket.emit(targetMod, { targetEvent: event, data: data });
    }
}