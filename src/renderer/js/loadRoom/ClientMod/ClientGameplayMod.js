import ClientMod from "./ClientMod.js";

export default class ClientGameplayMod extends ClientMod
{
    constructor(config)
    {
        super(config);

        this.on("receiveData", (data) =>
        {
            console.log("receiveData from GameplayMod ", data);
        });
    }
}