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