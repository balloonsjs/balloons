'use strict';

// Module dependencies.
var extend = require('extend');

/**
 * Inherits prototype properties from `uber` into `child` constructor.
 * @param {Function} child A given constructor function who inherits.
 * @param {Function} uber A given constructor function to inherit.
 * @returns {Object}
 * @example
 * inherits(child, uber);
 */
// Module exports.
module.exports = function inherits(child, uber) {
    var obj = child.prototype || {};
    child.prototype = extend(obj, uber.prototype);

    return uber.prototype;
};