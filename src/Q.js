(function (window) {
    'use strict';

    /**
     * An object which contains all the public members.
     * @namespace
     */
    var Q = {};

    /**
     * Returns a shallow-copied clone of a given object.
     * @memberof Q
     * @param {Object} obj A given object to clone.
     * @returns {Object}
     * @example
     * Q.clone(object);
     */
    Q.clone = function clone(obj) {
        var copy = {},
            prop;

        for (prop in obj) {
            if (obj[prop]) {
                copy[prop] = obj[prop];
            }
        }

        return copy;
    };

    /**
     * Extends a given object with properties from another object.
     * @memberof Q
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
     * Q.extend(foo, bar);
     *
     * console.log(foo.quux) // returns 'corge'
     */
    Q.extend = function extend(destination, from) {

        var prop;

        for (prop in from) {
            if (from[prop]) {
                destination[prop] = from[prop];
            }
        }

        return destination;
    };

    /**
     * Inherits prototype properties from `uber` into `child` constructor.
     * @memberof Q
     * @param {Function} child A given constructor function who inherits.
     * @param {Function} uber A given constructor function to inherit.
     * @returns {Object}
     * @example
     * Q.inherits(child, uber);
     */
    Q.inherits = function inherits(child, uber) {
        var obj = child.prototype || {};
        child.prototype = Q.extend(obj, uber.prototype);

        return uber.prototype;
    };


    window.Q = Q;
}(this));