/* eslint-disable no-eval */

/**
 * @returns {boolean} `true` nullish coalescing operator 'x ?? y' is supported by the browser.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 */
const supportsNullishCoalescing = () => {
    try {
        // eslint-disable-next-line no-unused-vars
        const fn = new Function('undefined ?? 3');
        // if function construction succeeds, the browser understood the syntax.
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    supportsNullishCoalescing: supportsNullishCoalescing()
};
