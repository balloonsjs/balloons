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