// !!! ???
/* eslint-disable no-eval */

/**
 * @returns {boolean} `true` if the browser supports nullish coalescing operator "x ?? y".
 * Checks the function "Function('undefined ?? 3')"" can be successfully created, which indicates that the utilized browser supports and understands the syntax in question.
 * (For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
 */
const supportsNullishCoalescing = () => {
    try {
        // Create a new function.
        // eslint-disable-next-line no-unused-vars
        const fn = new Function('undefined ?? 3');
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    supportsNullishCoalescing: supportsNullishCoalescing()
};
