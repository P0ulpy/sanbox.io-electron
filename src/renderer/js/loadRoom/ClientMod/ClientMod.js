import EventEmitter from "../../../vendor/EventEmitter.js";

export default class ClientMod extends EventEmitter
{
    constructor(config)
    {
        super();
        this.UID = config.UID;
        this.category = config.category;
        this.description = config.description;
        this.loadedResources = config.loadedResources;
        this.name = config.name;
        this.resources = config.resources;

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