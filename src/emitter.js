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
            return Q.inherit(component, Emitter);
        }

        return new Emitter();
    };

    /**
     * An object that encapsulates how a set of objects interact.
     * @memberof Q
     */
    Q.mediator = new Emitter();

}(this.Q));