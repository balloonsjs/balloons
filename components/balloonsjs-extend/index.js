'use strict';

/**
 * Extends a given object with properties from another object.
 * @param {Object} destination A given object to extend its properties.
 * @param {Object} from A given object to share its properties.
 * @returns {Object}
 * @example
 * var foo = {
 *     'baz': 'qux'
 * };

 * var bar = {
 *     'quux': 'corge'
 * };
 *
 * extend(foo, bar);
 *
 * console.log(foo.quux) // returns 'corge'
 */
// Module exports.
module.exports = function extend(destination, from) {

    if (destination === undefined || typeof destination !== 'object') {
            throw new Error('"extend(destination, from)": The "destination" parameter is required and must be an object.');
    }

    if (from === undefined || typeof from !== 'object') {
            throw new Error('"extend(destination, from)": The "from" parameter is required and must be an object.');
    }

    var prop;

    for (prop in from) {

        if (from[prop] !== undefined) {
            destination[prop] = from[prop];
        }

    }

    return destination;
};