import ClientMod from "./ClientMod.js";

export default class ClientEnvironmentMod extends ClientMod
{
    constructor(config)
    {
        super(config);

        this.on("receiveData", (data) =>
        {
            console.log("receiveData from EnvMod ", data);
        });
    }
}