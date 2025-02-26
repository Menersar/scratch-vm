// !!!

class VariablePool {
    /**
     * @param {string} prefix - the prefix at the beginning of the variable name.
     */
    constructor (prefix) {
        if (prefix.trim().length === 0) {
            throw new Error('prefix cannot be empty');
        }
        this.prefix = prefix;
        // !!! ???
        /**
         * @private
         */
        this.count = 0;
    }

    next () {
        return `${this.prefix}${this.count++}`;
    }
}

module.exports = VariablePool;
