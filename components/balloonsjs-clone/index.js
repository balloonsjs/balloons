'use strict';

/**
 * Returns a shallow-copied clone of a given object.
 * @param {Object} obj A given object to clone.
 * @returns {Object}
 * @example
 * clone(object);
 */
// Exports clone
module.exports = function clone(obj) {
    if (obj === undefined || typeof obj !== 'object') {
        throw new Error('"ch.util.clone(obj)": The "obj" parameter is required and must be a object.');
    }

    var copy = {},
        prop;

    for (prop in obj) {
        if (obj[prop] !== undefined) {
            copy[prop] = obj[prop];
        }
    }

    return copy;
};