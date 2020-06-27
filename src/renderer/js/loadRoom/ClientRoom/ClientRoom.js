export default class ClientRoom
{
    constructor(config, mods)
    {
        this.config = config;

        this.environmentMod = mods.environmentMod;
        this.gameplayMod = mods.gameplayMod;
        this.overlayMod = mods.overlayMod;
    }
}