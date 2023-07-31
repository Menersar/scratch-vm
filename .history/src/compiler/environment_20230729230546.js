/* eslint-disable no-eval */

/**
 * @returns {boolean} `true` if the browser supports nullish coalescing operator "x ?? y".
 * Checks if the creation of a function "Function('undefined ?? 3')"" is successful the browser understood the syntax.
 * (For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
 */
const supportsNullishCoalescing = () => {
    try {
        // Creates a new function.
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
