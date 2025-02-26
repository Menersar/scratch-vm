// !!!

const context = require('./sidekick-extension-worker-context');

const jQuery = require('./sidekick-jquery-shim');
global.$ = jQuery;
global.jQuery = jQuery;

const id = window.__WRAPPED_IFRAME_ID__;

context.isWorker = false;
context.centralDispatchService = {
    postMessage (message, transfer) {
        const data = {
            vmIframeId: id,
            message
        };
        if (transfer) {
            window.parent.postMessage(data, '*', transfer);
        } else {
            window.parent.postMessage(data, '*');
        }
    }
};

require('./extension-worker');

window.parent.postMessage({
    vmIframeId: id,
    ready: true
}, '*');
