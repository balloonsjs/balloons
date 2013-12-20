/*!
 * Balloons.js v0.1.0
 * http://balloonsjs.com/
 *
 * Copyright (c) 2013, MercadoLibre.com
 * Released under the MIT license.
 * http://balloonsjs.com/
 */
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
(function (Q) {
    'use strict';

    /**
     * Event Emitter Class for the browser.
     * @private
     * @constructor
     * @returns {Object} Returns a new instance of Emitter.
     */
    function Emitter() {
        return this;
    }

    /**
     * Adds a listener to the collection for a specified event.
     * @memberof! Emitter.prototype
     * @function
     * @param {String} event The event name to subscribe.
     * @param {Function} listener Listener function.
     * @param {Boolean} once Indicate if a listener function will be called only one time.
     * @example
     * // Will add an event listener to 'ready' event.
     * emitter.on('ready', listener);
     */
    Emitter.prototype.on = function (event, listener, once) {

        this._eventsCollection = this._eventsCollection || {};

        listener.once = once || false;

        if (this._eventsCollection[event] === undefined) {
            this._eventsCollection[event] = [];
        }

        this._eventsCollection[event].push(listener);

        return this;
    };

    /**
     * Adds a listener to the collection for a specified event to will execute only once.
     * @memberof! Emitter.prototype
     * @function
     * @param {String} event Event name.
     * @param {Function} listener Listener function.
     * @returns {Object}
     * @example
     * // Will add an event handler to 'contentLoad' event once.
     * widget.once('contentLoad', listener);
     */
    Emitter.prototype.once = function (event, listener) {

        this.on(event, listener, true);

        return this;
    };

    /**
     * Removes a listener from the collection for a specified event.
     * @memberof! Emitter.prototype
     * @function
     * @param {String} event Event name.
     * @param {Function} listener Listener function.
     * @returns {Object}
     * @example
     * // Will remove event listener to 'ready' event.
     * widget.off('ready', listener);
     */
    Emitter.prototype.off = function (event, listener) {

        if (this._eventsCollection === undefined) {
            return this;
        }

        var listeners = this._eventsCollection[event],
            i = 0,
            len;

        if (listeners !== undefined) {
            len = listeners.length;
            for (i; i < len; i += 1) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    };

    /**
     * Returns all listeners from the collection for a specified event.
     * @memberof! Emitter.prototype
     * @function
     * @param {String} event The event name.
     * @returns {Array}
     * @example
     * // Returns listeners from 'ready' event.
     * widget.getListeners('ready');
     */
    Emitter.prototype.getListeners = function (event) {

        return this._eventsCollection[event];
    };

    /**
     * Execute each item in the listener collection in order with the specified data.
     * @memberof! Emitter.prototype
     * @function
     * @param {String} event The name of the event you want to emit.
     * @param {...Object} var_args Data to pass to the listeners.
     * @example
     * // Will emit the 'ready' event with 'param1' and 'param2' as arguments.
     * widget.emit('ready', 'param1', 'param2');
     */
    Emitter.prototype.emit = function () {

        var args = Array.prototype.slice.call(arguments, 0), // converted to array
            event = args.shift(), // Store and remove events from args
            listeners,
            i = 0,
            len;

        if (typeof event === 'string') {
            event = {'type': event};
        }

        if (!event.target) {
            event.target = this;
        }

        if (this._eventsCollection !== undefined && this._eventsCollection[event.type] !== undefined) {
            listeners = this._eventsCollection[event.type];
            len = listeners.length;

            for (i; i < len; i += 1) {
                listeners[i].apply(this, args);

                if (listeners[i].once) {
                    this.off(event.type, listeners[i]);
                    len -= 1;
                    i -= 1;
                }
            }
        }

        return this;
    };

    /**
     * An Event Emitter component to add observer methods to a function.
     * @memberof Q
     * @param {Function} [component] A given constructor function.
     * @returns {(Object | Function)} Returns a new instance of Emitter or a given constructor.
     * @example
     * // Use as mixin to extend a given constructor.
     * function Foo() {};
     * Q.emitter(Foo);
     * @example
     * // Creates a new instance of Emitter.
     * var emitter = Q.emitter();
     */
    Q.emitter = function (component) {
        if (component) {
            return Q.inherits(component, Emitter);
        }

        return new Emitter();
    };

    /**
     *
     * @memberof Q
     * @example
     * //
     *
     * @example
     * //
     *
     */
    Q.mediator = new Emitter();

}(this.Q));
(function (window, Q) {
    'use strict';

    /**
     * Base class for all components.
     * @private
     * @constructor
     * @augments EventEmitter
     * @param {(jQuerySelector | ZeptoSelector)} $el jQuery or Zepto Selector.
     * @param {Object} [options] Configuration options.
     * @returns {component} Returns a new instance of Component.
     */
    function Component() {
        return this;
    }

    Component.prototype._init = function () {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * Indicates if a component is enabled.
         * @type {Boolean}
         * @private
         */
        this._enabled = true;

        if (this.init !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Expandable is created.
             * @memberof! Component.prototype
             * @function
             */
            this.init.apply(that, arguments);
        }

        /**
         * Event emitted when the component is ready to use.
         * @event Component#ready
         * @example
         * // Subscribe to "ready" event.
         * component.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () {
            that.emit('ready');
        }, 50);

        return this;
    }

    /**
     * The name of a component.
     * @memberof! Component.prototype
     * @type {String}
     * @example
     * // You can reach the instance associated.
     * var component = $(selector).data(name);
     */
    Component.prototype.name = 'component';

    /**
     * Returns a reference to the constructor function.
     * @memberof! Component.prototype
     * @function
     */
    Component.prototype.constructor = Component;

    /**
     * Enables an instance of Component.
     * @memberof! Component.prototype
     * @function
     * @returns {instance} Returns an instance of Component.
     * @example
     * // Enabling an instance of Component.
     * component.enable();
     */
    Component.prototype.enable = function () {
        this._enabled = true;

        /**
         * Emits when a component is enable.
         * @event Component#enable
         * @example
         * // Subscribe to "enable" event.
         * component.on('enable', function () {
         *     // Some code here!
         * });
         */
        this.emit('enable');

        return this;
    };

    /**
     * Disables an instance of Component.
     * @memberof! Component.prototype
     * @function
     * @return {instance} Returns an instance of Component.
     * @example
     * // Disabling an instance of Component.
     * component.disable();
     */
    Component.prototype.disable = function () {
        this._enabled = false;

        /**
         * Emits when a component is disable.
         * @event Component#disable
         * @example
         * // Subscribe to "disable" event.
         * component.on('disable', function () {
         *     // Some code here!
         * });
         */
        this.emit('disable');

        return this;
    };

    /**
     * Destroys an instance of Component and remove its data from asociated element.
     * @memberof! Component.prototype
     * @function
     * @example
     * // Destroying an instance of Component.
     * component.destroy();
     */
    Component.prototype.destroy = function () {

        this.disable();

        /**
         * Emits when a component is destroyed.
         * @event Component#destroy
         * @exampleDescription
         * @example
         * // Subscribe to "destroy" event.
         * component.on('destroy', function () {
         *     // Some code here!
         * });
         */
        this.emit('destroy');
    };

    Component.prototype.inflate = function (members) {
        Q.extend(this.constructor.prototype, members);

        return this;
    };

    // Add emitter capabilities to Component.
    Q.emitter(Component);

    /**
     * Defines new components constructors.
     * @memberof Q
     * @param {Array} [parents] - An optional collection of constructors to inherit.
     * @param {Function} members - A given members to be attached to component's prototype.
     * @returns {Function} Returns a new constructor as a component.
     * @example
     * // Defines a Foobar component that inhertis from Foo and Bar constructors.
     * var Foobar = Q.define([Foo, Bar], {
     *     'name': 'Foobar',
     *     'init': function () {
     *         console.log(this.name);
     *     },
     *     'sayFoobar': function () {
     *         console.log('foobar');
     *     }
     * });
     *
     * // Creates a new instance of Foobar component.
     * var foobar = new Foobar();
     */
    Q.define = function (parents, members) {

        function Balloon() {
            this._init.apply(this, arguments);
            return this;
        }

        if (members === undefined) {
            members = parents;
            parents = [];
        }

        parents.unshift(Component);

        parents.forEach(function (uber) {
            Q.inherits(Balloon, uber);
        });

        Q.extend(Balloon.prototype, members);

        return Balloon;
    };

}(this, this.Q));