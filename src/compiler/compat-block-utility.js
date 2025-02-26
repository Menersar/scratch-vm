const BlockUtility = require('../engine/block-utility');

class CompatibilityLayerBlockUtility extends BlockUtility {
    constructor () {
        super();

        // /**
        //  * @type {string|null}
        //  */
        // this._fakeBlockId = null;
        this._stackFrame = {};
        this._startedBranch = null;
    }

    get stackFrame () {
        return this._stackFrame;
    }

    // !!! ???
    // // Unsupported: Processes regarding branches in blocks.
    // startBranch () {
    //     throw new Error('startBranch is not supported by this BlockUtility');
    // }

    startBranch (branchNumber, isLoop) {
        this._startedBranch = [branchNumber, isLoop];
    }

    startProcedure () {
        throw new Error('startProcedure is not supported by this BlockUtility');
    }

    // !!! ???
    // // Unsupported: Parameters (not used by compiled scripts).
    // Parameters are not used by compiled scripts.
    initParams () {
        throw new Error('initParams is not supported by this BlockUtility');
    }
    pushParam () {
        throw new Error('pushParam is not supported by this BlockUtility');
    }
    getParam () {
        throw new Error('getParam is not supported by this BlockUtility');
    }

    init (thread, fakeBlockId, stackFrame) {
        this.thread = thread;
        this.sequencer = thread.target.runtime.sequencer;
        this._stackFrame = stackFrame;
        this._startedBranch = null;
        thread.stack[0] = fakeBlockId;
    }
}

// Export a single instance to be reused.
module.exports = new CompatibilityLayerBlockUtility();
