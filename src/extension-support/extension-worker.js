/* eslint-env worker */

// const ArgumentType = require('../extension-support/argument-type');
// const BlockType = require('../extension-support/block-type');
// const TargetType = require('../extension-support/target-type');

const ScratchCommon = require('./sidekick-extension-api-common');
const createScratchX = require('./sidekick-scratchx-compatibility-layer');
const dispatch = require('../dispatch/worker-dispatch');
const log = require('../util/log');
const {isWorker} = require('./sidekick-extension-worker-context');
const createTranslate = require('./sidekick-l10n');

const translate = createTranslate(null);

const loadScripts = url => {
    if (isWorker) {
        importScripts(url);
    } else {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onload = () => resolve();
            script.onerror = () => {
                reject(new Error(`Error in sandboxed script: ${url}. Check the console for more information.`));
            };
            script.src = url;
            document.body.appendChild(script);
        });
    }
};

class ExtensionWorker {
    constructor () {
        this.nextExtensionId = 0;

        this.initialRegistrations = [];

        this.firstRegistrationPromise = new Promise(resolve => {
            this.firstRegistrationCallback = resolve;
        });

        dispatch.waitForConnection.then(() => {
            dispatch.call('extensions', 'allocateWorker').then(async x => {
                const [id, extension] = x;
                this.workerId = id;

                try {
                    // importScripts(extension);


                    await loadScripts(extension);
                    await this.firstRegistrationPromise;

                    const initialRegistrations = this.initialRegistrations;
                    this.initialRegistrations = null;

                    Promise.all(initialRegistrations).then(() => dispatch.call('extensions', 'onWorkerInit', id));
                } catch (e) {
                    // dispatch.call('extensions', 'onWorkerInit', id, e);


                    // !!! ???
                    log.error(e);
                    dispatch.call('extensions', 'onWorkerInit', id, `${e}`);
                }
            });
        });

        this.extensions = [];
    }

    register (extensionObject) {
        const extensionId = this.nextExtensionId++;
        this.extensions.push(extensionObject);
        const serviceName = `extension.${this.workerId}.${extensionId}`;
        const promise = dispatch.setService(serviceName, extensionObject)
            .then(() => dispatch.call('extensions', 'registerExtensionService', serviceName));
        if (this.initialRegistrations) {
            this.firstRegistrationCallback();
            this.initialRegistrations.push(promise);
        }
        return promise;
    }
}

global.Scratch = global.Scratch || {};
// global.Scratch.ArgumentType = ArgumentType;
// global.Scratch.BlockType = BlockType;
// global.Scratch.TargetType = TargetType;


// !!! ???
Object.assign(global.Scratch, ScratchCommon, {
    canFetch: () => Promise.resolve(true),
    fetch: (url, options) => fetch(url, options),
    canOpenWindow: () => Promise.resolve(false),
    openWindow: () => Promise.reject(new Error('Scratch.openWindow not supported in sandboxed extensions')),
    canRedirect: () => Promise.resolve(false),
    redirect: () => Promise.reject(new Error('Scratch.redirect not supported in sandboxed extensions')),
    canRecordAudio: () => Promise.resolve(false),
    canRecordVideo: () => Promise.resolve(false),
    canReadClipboard: () => Promise.resolve(false),
    canNotify: () => Promise.resolve(false),
    canGeolocate: () => Promise.resolve(false),
    canEmbed: () => Promise.resolve(false),
    translate
});

/**
 * Expose only specific parts of the worker to extensions.
 */
const extensionWorker = new ExtensionWorker();
global.Scratch.extensions = {
    register: extensionWorker.register.bind(extensionWorker)
};


// !!! ???
// global.ScratchExtensions = require('./sidekick-scratchx-compatibility-layer');
global.ScratchExtensions = createScratchX(global.Scratch);
