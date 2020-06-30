import EventEmitter from "../../../vendor/EventEmitter.js";

export default class ClientMod extends EventEmitter
{
    constructor()
    {
        super();
        console.log("bonjour");

        setTimeout(() =>
        {
            this.emit("sendData", "skululu", "data");
        }, 1000);
    }
}