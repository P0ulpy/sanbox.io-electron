/* 1 : on récupère l'UID de la room et on fait un /rooms/UID/publicData
   2 : on instancie des LoadingClientMod en passant les objets de publicData : ils vont
   charger la classe client, et les ressources. Une Promise<ClientMod> doit être retournée.
   3 : une fois que tous les mods sont récupérés et instanciés côté client, on instancie
   ClientSandbox avec ces mods.
*/
import { LoadingEnvironmentMod, LoadingGameplayMod, LoadingOverlayMod } from "../LoadingMod/index.js";
import ClientRoom from "../ClientRoom/index.js";
const env = require("electron").remote.getGlobal("env");

export default class LoadingRoom
{
    constructor(UID)
    {
        this.UID = UID;

        this.loadingPromise = new Promise(async (resolve, reject) =>
        {
            try
            {
                const clientRoom = await this.load();

                resolve(clientRoom);
            }
            catch (error)
            {
                console.log(error);
                reject(error);
            }
        });
    }

    get promise()
    {
        return this.loadingPromise;
    }

    async load()
    {
        try
        {
            const publicData = await this.loadPublicData();

            const loadingEnvironmentMod = new LoadingEnvironmentMod(publicData.mods.environment);
            const loadingGameplayMod = new LoadingGameplayMod(publicData.mods.gameplay);
            const laodingOverlayMod = new LoadingOverlayMod(publicData.mods.overlay);

            const environmentMod = await loadingEnvironmentMod.promise;
            const gameplayMod = await loadingGameplayMod.promise;
            const overlayMod = await laodingOverlayMod.promise;

            const mods = { environmentMod, gameplayMod, overlayMod };
            const clientRoom = new ClientRoom(publicData, mods);

            return clientRoom;
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    async loadPublicData()
    {
        try
        {
            const response = await fetch(`${env.server}/rooms/${this.UID}/publicData`);
            const responseJSON = await response.json();

            if (responseJSON.status === "OK")
            {
                return responseJSON.data;
            }
            else
            {
                throw new Error(`loadPublicData #${this.UID} : ${responseJSON.data}`);
            }
        }
        catch (error)
        {
            throw error;
        }
    }
}