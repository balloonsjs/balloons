;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("balloonsjs-clone/index.js", function(exports, require, module){
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
});
require.register("balloonsjs-extend/index.js", function(exports, require, module){
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
});
require.register("balloonsjs-inherits/index.js", function(exports, require, module){
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
});
require.register("balloonsjs-EventEmitter/index.js", function(exports, require, module){
'use strict';

/**
 * Event Emitter Class for the browser.
 * @memberof ch
 * @constructor
 * @returns {Object} Returns a new instance of EventEmitter.
 * @example
 * // Create a new instance of EventEmitter.
 * var emitter = new EventEmitter();
 * @example
 * // Inheriting from EventEmitter.
 * inherits(Component, EventEmitter);
 */
function EventEmitter() {}

/**
 * Adds a listener to the collection for a specified event.
 * @memberof! EventEmitter.prototype
 * @function
 * @param {String} event The event name to subscribe.
 * @param {Function} listener Listener function.
 * @param {Boolean} once Indicate if a listener function will be called only one time.
 * @example
 * // Will add an event listener to 'ready' event.
 * emitter.on('ready', listener);
 */
EventEmitter.prototype.on = function (event, listener, once) {

    if (event === undefined) {
        throw new Error('EventEmitter - "on(event, listener)": It should receive an event.');
    }

    if (listener === undefined) {
        throw new Error('EventEmitter - "on(event, listener)": It should receive a listener function.');
    }

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
 * @memberof! EventEmitter.prototype
 * @function
 * @param {String} event Event name.
 * @param {Function} listener Listener function.
 * @returns {Object}
 * @example
 * // Will add an event handler to 'contentLoad' event once.
 * widget.once('contentLoad', listener);
 */
EventEmitter.prototype.once = function (event, listener) {

    this.on(event, listener, true);

    return this;
};

/**
 * Removes a listener from the collection for a specified event.
 * @memberof! EventEmitter.prototype
 * @function
 * @param {String} event Event name.
 * @param {Function} listener Listener function.
 * @returns {Object}
 * @example
 * // Will remove event listener to 'ready' event.
 * widget.off('ready', listener);
 */
EventEmitter.prototype.off = function (event, listener) {

    if (event === undefined) {
        throw new Error('EventEmitter - "off(event, listener)": It should receive an event.');
    }

    if (listener === undefined) {
        throw new Error('EventEmitter - "off(event, listener)": It should receive a listener function.');
    }

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
 * @memberof! EventEmitter.prototype
 * @function
 * @param {String} event The event name.
 * @returns {Array}
 * @example
 * // Returns listeners from 'ready' event.
 * widget.getListeners('ready');
 */
EventEmitter.prototype.getListeners = function (event) {

    if (event === undefined) {
        throw new Error('EventEmitter - "getListeners(event)": It should receive an event.');
    }

    return this._eventsCollection[event];
};

/**
 * Execute each item in the listener collection in order with the specified data.
 * @memberof! EventEmitter.prototype
 * @function
 * @param {String} event The name of the event you want to emit.
 * @param {...Object} var_args Data to pass to the listeners.
 * @example
 * // Will emit the 'ready' event with 'param1' and 'param2' as arguments.
 * widget.emit('ready', 'param1', 'param2');
 */
EventEmitter.prototype.emit = function () {

    var args = Array.prototype.slice.call(arguments, 0), // converted to array
        event = args.shift(), // Store and remove events from args
        listeners,
        i = 0,
        len;

    if (event === undefined) {
        throw new Error('EventEmitter - "emit(event)": It should receive an event.');
    }

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

// Expose EventEmitter
exports = module.exports = EventEmitter;
});
require.register("balloonsjs-Component/index.js", function(exports, require, module){
'use strict';

// Module dependencies
var clone = require('clone'),
    extend = require('extend'),
    inherits = require('inherits'),
    EventEmitter = require('EventEmitter');

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
    setTimeout(function () { that.emit('ready'); }, 50);
}

inherits(Component, EventEmitter);

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
    var defaults = (this._defaults) ? clone(this._defaults) : {};

    if (options === undefined) {
        if (el === undefined) {
            this._options = defaults;

        } else if (typeof el === 'object') {
            options = el;
            el = undefined;
            this._options = extend(defaults, options);
        }

    } else if (typeof options === 'object') {
        this._options = extend(defaults, options);

    } else {
        throw new Error('component._init(): Unexpected parameters were found in the \'' + this.name + '\' instantiation.');
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

// Expose Component
module.exports = Component;
});
require.register("balloons/index.js", function(exports, require, module){
'use strict';

// Module dependencies
var inherits = require('inherits'),
    EventEmitter = require('EventEmitter'),
    Component = require('Component'),
    Q = {};

// Observable
Q.observable = function (component) {
    inherits(component, EventEmitter);

    return Q;
};

// Component
Q.component = function (component) {
    inherits(component, Component);

    return Q;
};

// Expose Balloons
module.exports = Q;
});










require.alias("balloonsjs-clone/index.js", "balloons/deps/clone/index.js");
require.alias("balloonsjs-clone/index.js", "balloons/deps/clone/index.js");
require.alias("balloonsjs-clone/index.js", "clone/index.js");
require.alias("balloonsjs-clone/index.js", "balloonsjs-clone/index.js");
require.alias("balloonsjs-extend/index.js", "balloons/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloons/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-extend/index.js");
require.alias("balloonsjs-inherits/index.js", "balloons/deps/inherits/index.js");
require.alias("balloonsjs-inherits/index.js", "balloons/deps/inherits/index.js");
require.alias("balloonsjs-inherits/index.js", "inherits/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-inherits/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-inherits/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-extend/index.js");
require.alias("balloonsjs-inherits/index.js", "balloonsjs-inherits/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloons/deps/EventEmitter/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloons/deps/EventEmitter/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "EventEmitter/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloonsjs-EventEmitter/index.js");
require.alias("balloonsjs-Component/index.js", "balloons/deps/Component/index.js");
require.alias("balloonsjs-Component/index.js", "balloons/deps/Component/index.js");
require.alias("balloonsjs-Component/index.js", "Component/index.js");
require.alias("balloonsjs-clone/index.js", "balloonsjs-Component/deps/clone/index.js");
require.alias("balloonsjs-clone/index.js", "balloonsjs-Component/deps/clone/index.js");
require.alias("balloonsjs-clone/index.js", "balloonsjs-clone/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-Component/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-Component/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-extend/index.js");
require.alias("balloonsjs-inherits/index.js", "balloonsjs-Component/deps/inherits/index.js");
require.alias("balloonsjs-inherits/index.js", "balloonsjs-Component/deps/inherits/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-inherits/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-inherits/deps/extend/index.js");
require.alias("balloonsjs-extend/index.js", "balloonsjs-extend/index.js");
require.alias("balloonsjs-inherits/index.js", "balloonsjs-inherits/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloonsjs-Component/deps/EventEmitter/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloonsjs-Component/deps/EventEmitter/index.js");
require.alias("balloonsjs-EventEmitter/index.js", "balloonsjs-EventEmitter/index.js");
require.alias("balloonsjs-Component/index.js", "balloonsjs-Component/index.js");
require.alias("balloons/index.js", "balloons/index.js");if (typeof exports == "object") {
  module.exports = require("balloons");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("balloons"); });
} else {
  this["Q"] = require("balloons");
}})();