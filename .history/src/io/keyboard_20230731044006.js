const Cast = require('../util/cast');

/**
 * Names used internally for keys used in scratch, also known as "scratch keys".
 * @enum {string}
 */
const KEY_NAME = {
    SPACE: 'space',
    LEFT: 'left arrow',
    UP: 'up arrow',
    RIGHT: 'right arrow',
    DOWN: 'down arrow',
    ENTER: 'enter',


    // New defined keys:
    BACKSPACE: 'backspace',
    DELETE: 'delete',
    SHIFT: 'shift',
    CAPS_LOCK: 'caps lock',
    SCROLL_LOCK: 'scroll lock',
    CONTROL: 'control',
    ESCAPE: 'escape',
    INSERT: 'insert',
    HOME: 'home',
    END: 'end',
    PAGE_UP: 'page up',
    PAGE_DOWN: 'page down'


};

/**
 * An array of the names of scratch keys.
 * @type {Array<string>}
 */
const KEY_NAME_LIST = Object.keys(KEY_NAME).map(name => KEY_NAME[name]);

class Keyboard {
    constructor (runtime) {
        /**
         * List of currently pressed scratch keys.
         * A scratch key is:
         * A key you can press on a keyboard, excluding modifier keys.
         * An uppercase string of length one;
         *     except for special key names for arrow keys and space (e.g. 'left arrow').
         * Can be a non-english unicode letter like: æ ø ש נ 手 廿.
         * @type{Array.<string>}
         */
        this._keysPressed = [];
        /**
         * Reference to the owning Runtime.
         * Can be used, for example, to activate hats.
         * @type{!Runtime}
         */
        this.runtime = runtime;


        // Keep track of last key pressed.
        this.lastKeyPressed = '';
        this._numeralKeyCodesToStringKey = new Map();


    }

    /**
     * Convert from a keyboard event key name to a Scratch key name.
     * @param  {string} keyString the input key string.
     * @return {string} the corresponding Scratch key, or an empty string.
     */
    _keyStringToScratchKey (keyString) {
        keyString = Cast.toString(keyString);
        // Convert space and arrow keys to their Scratch key names.
        switch (keyString) {
        case ' ': return KEY_NAME.SPACE;
        case 'ArrowLeft':
        case 'Left': return KEY_NAME.LEFT;
        case 'ArrowUp':
        case 'Up': return KEY_NAME.UP;
        case 'Right':
        case 'ArrowRight': return KEY_NAME.RIGHT;
        case 'Down':
        case 'ArrowDown': return KEY_NAME.DOWN;
        case 'Enter': return KEY_NAME.ENTER;


        // New defined keys:
        case 'Backspace': return KEY_NAME.BACKSPACE;
        case 'Delete': return KEY_NAME.DELETE;
        case 'Shift': return KEY_NAME.SHIFT;
        case 'CapsLock': return KEY_NAME.CAPS_LOCK;
        case 'ScrollLock': return KEY_NAME.SCROLL_LOCK;
        case 'Control': return KEY_NAME.CONTROL;
        case 'Escape': return KEY_NAME.ESCAPE;
        case 'Insert': return KEY_NAME.INSERT;
        case 'Home': return KEY_NAME.HOME;
        case 'End': return KEY_NAME.END;
        case 'PageUp': return KEY_NAME.PAGE_UP;
        case 'PageDown': return KEY_NAME.PAGE_DOWN;


        }
        // ??? !!!
        // Ignore modifier keys
        if (keyString.length > 1) {
            return '';
        }
        // return keyString.toUpperCase();


        // Perform 'toUpperCase' later.
        // Key case it needed to track.
        return keyString;


    }

    /**
     * Convert from a block argument to a Scratch key name.
     * @param  {string} keyArg the input arg.
     * @return {string} the corresponding Scratch key.
     */
    _keyArgToScratchKey (keyArg) {
        // If a number was dropped in, try to convert from ASCII to Scratch key.
        if (typeof keyArg === 'number') {
            // Check for the ASCII range containing numbers, some punctuation,
            // and uppercase letters.
            if (keyArg >= 48 && keyArg <= 90) {
                return String.fromCharCode(keyArg);
            }
            switch (keyArg) {
            case 32: return KEY_NAME.SPACE;
            case 37: return KEY_NAME.LEFT;
            case 38: return KEY_NAME.UP;
            case 39: return KEY_NAME.RIGHT;
            case 40: return KEY_NAME.DOWN;
            }
        }

        keyArg = Cast.toString(keyArg);

        // If the arg matches a special key name, return it.
        if (KEY_NAME_LIST.includes(keyArg)) {
            return keyArg;
        }

        // Use only the first character.
        if (keyArg.length > 1) {
            keyArg = keyArg[0];
        }

        // Check for the space character.
        if (keyArg === ' ') {
            return KEY_NAME.SPACE;
        }


        // !!! 'Scratch 2 hacked blocks'? ???
        // Support for hacked Scratch 2 blocks.
        // Apart from that, 'Scratch 2 to 3 conversion' deals with most of the remaining other hacked blocks.
        if (keyArg === '\r') {
            // !!! TODO ???
            // It probably should be upstream.
            return KEY_NAME.ENTER;
        }
        if (keyArg === '\u001b') {
            return KEY_NAME.ESCAPE;
        }


        return keyArg.toUpperCase();
    }

    /**
     * Keyboard DOM event handler.
     * @param  {object} data Data from DOM event.
     */
    postData (data) {
        if (!data.key) return;
        // const scratchKey = this._keyStringToScratchKey(data.key);


        // tw: convert single letter keys to uppercase because of changes in _keyStringToScratchKey
        const scratchKeyCased = this._keyStringToScratchKey(data.key);
        const scratchKey = scratchKeyCased.length === 1 ? scratchKeyCased.toUpperCase() : scratchKeyCased;


        if (scratchKey === '') return;
        const index = this._keysPressed.indexOf(scratchKey);
        if (data.isDown) {
            this.runtime.emit('KEY_PRESSED', scratchKey);
            // If not already present, add to the list.
            if (index < 0) {
                this._keysPressed.push(scratchKey);
            }
        } else if (index > -1) {
            // If already present, remove from the list.
            this._keysPressed.splice(index, 1);
        }
    }

    /**
     * Get key down state for a specified key.
     * @param  {Any} keyArg key argument.
     * @return {boolean} Is the specified key down?
     */
    getKeyIsDown (keyArg) {
        if (keyArg === 'any') {
            return this._keysPressed.length > 0;
        }
        const scratchKey = this._keyArgToScratchKey(keyArg);
        return this._keysPressed.indexOf(scratchKey) > -1;
    }
}

module.exports = Keyboard;
