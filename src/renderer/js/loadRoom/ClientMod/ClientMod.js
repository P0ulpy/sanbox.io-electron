import EventEmitter from "../../../vendor/EventEmitter.js";

export default class ClientMod extends EventEmitter
{
    constructor()
    {
        super();
        console.log("bonjour");

        setTimeout(() =>
        {
            this.sendData("skululu", "data");
        }, 1000);
    }
    
    sendData(event, data)
    {
        this.emit("sendData", event, data);
    }

    onReceiveData(event, data)
    {
        console.log(event, data);
    }
}