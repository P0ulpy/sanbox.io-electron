import EventEmitter from "../../../vendor/EventEmitter.js";

import { loadImage } from "../Tools/index.js";
import { ClientEnvironmentMod, ClientOverlayMod, ClientGameplayMod } from "../ClientMod/index.js";
const env = require("electron").remote.getGlobal("env");

export default class LoadingMod extends EventEmitter
{
    constructor(config, category)
    {
        super();

        // Données communes à chaque type de mod
        this.UID = config.UID;
        this.category = category;
        this.config = config;
        this.config.category = category;
        this.resources = config.resources;
        // name: string, resource: any (bon, ici on ne prend en charge que Image)
        this.loadedResources = new Map();

        this.clientClass = null;

        this.loadingPromise = new Promise((resolve, reject) =>
        {
            this.on("loadingSuccess", () =>
            {
                console.log(`Successfully loaded mod ${this.category} #${this.UID}`);
                // Instanciation du mod
                const modInstance = new this.clientClass(this.config);
                resolve(modInstance);
            });

            this.on("loadingError", error => reject(error));
        });

        this.on("resourceLoaded", (resourceDetails, resource) =>
        {
            this.loadedResources.set(resourceDetails.name, resource);
            this.checkLoadStatus();
        });

        this.on("resourceError", (resourceDetails, error) =>
        {
            this.emit("loadingError", error);
        });

        this.on("loadingClientClassError", error =>
        {
            this.emit("loadingError", error);
        });

        this.on("clientClassLoaded", clientClass =>
        {
            this.clientClass = clientClass;
            this.checkLoadStatus()
        });

        this.loadClientClass();
        this.loadResources();
    }

    get promise()
    {
        return this.loadingPromise;
    }

    get clientModClass()
    {
        if (this.category === "environment")
        {
            return ClientEnvironmentMod;
        }
        else if (this.category === "overlay")
        {
            return ClientOverlayMod;
        }
        else if (this.category === "gameplay")
        {
            return ClientGameplayMod;
        }
        else
        {
            throw new Error(`Invalid mod category ${this.category}`);
        }
    }

    async loadClientClass()
    {
        try
        {
            const classWrapper = await import(`${env.server}/mods/${this.category}/${this.UID}/clientClass`);
            const clientClass = classWrapper.default(this.clientModClass);
            this.emit("clientClassLoaded", clientClass);
        }
        catch (error)
        {
            this.emit("loadingClientClassError", error);
        }
    }

    checkLoadStatus()
    {
        if (this.loadedResources.size === this.resources.length && this.clientClass)
        {
            this.emit("loadingSuccess");
        }
    }

    loadResources()
    {
        for (const resource of this.resources)
        {
            this.loadResource(resource);
        }
    }

    loadResource(resource)
    {
        try
        {
            // Pour l'instant, on ne supporte que les resources de type "image"
            if (resource.type === "image")
            {
                const resourceURL = `${env.server}/mods/${this.category}/${this.UID}/resources/${resource.name}`;
                const promise = loadImage(resource.width, resource.height, resourceURL);

                promise.then(image => this.emit("resourceLoaded", resource, image))
                .catch(error => this.emit("resourceError", resource, error));
            }
            else
            {
                this.emit("resourceError", resource, new Error(`Resouce type \`${resource.type}\` not supported`));
            }
        }
        catch (error)
        {
            this.emit("resourceError", resource, new Error(`Unable to load resource : ${error.message}`, resource));
        }
    }
}