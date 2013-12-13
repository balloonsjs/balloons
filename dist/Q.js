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

    var Q = {};

    /**
     * Returns a shallow-copied clone of a given object.
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
     * @memberof ch
     * @constructor
     * @returns {Object} Returns a new instance of Emitter.
     * @example
     * // Create a new instance of Emitter.
     * var emitter = new Emitter();
     * @example
     * // Inheriting from Emitter.
     * inherits(Component, Emitter);
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

    Q.emitter = function (component) {
        if (component) {
            Q.inherits(component, Emitter);
        }

        return new Emitter();
    };

}(this.Q));
(function (window, Q) {
    'use strict';

    /**
     * Base class for all components.
     * @constructor
     * @augments EventEmitter
     * @param {(jQuerySelector | ZeptoSelector)} $el jQuery or Zepto Selector.
     * @param {Object} [options] Configuration options.
     * @returns {component} Returns a new instance of Component.
     */
    function Component(el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init(el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Expandable is created.
             * @memberof! Component.prototype
             * @function
             */
            this.initialize();
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
        window.setTimeout(function () { that.emit('ready'); }, 50);
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
     * Initialize a new instance of Component and merge custom options with defaults options.
     * @memberof! Component.prototype
     * @function
     * @private
     * @returns {instance} Returns an instance of Component.
     */
    Component.prototype._init = function (el, options) {

        // Clones the defaults options or creates a new object.
        var defaults = (this._defaults) ? Q.clone(this._defaults) : {};

        if (options) {
            if (el) {
                this._options = defaults;

            } else if (typeof el === 'object') {
                options = el;
                el = undefined;
                this._options = Q.extend(defaults, options);
            }

        } else if (typeof options === 'object') {
            this._options = Q.extend(defaults, options);
        }

        return this;
    };

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

    Q.emitter(Component);

    Q.component = function (component) {
        Q.inherits(component, Component);
        return component;
    };

}(this, this.Q));