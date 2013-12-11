function require(p, parent) {
    var path = require.resolve(p),
        mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '" in ' + (parent || "root"));
    if (!mod.exports) {
        mod.exports = {};
        mod.client = true;
        mod.call(mod.exports, mod, mod.exports, require.relative(path))
    }
    return mod.exports
}
require.modules = {};
require.exists = function (path) {
    return !!require.modules[require.resolve(path)]
};
require.resolve = function (path) {
    var orig = path,
        reg = path + ".js",
        index = path + "/index.js";
    return require.modules[reg] && reg || require.modules[index] && index || orig
};
require.register = function (path, fn) {
    require.modules[path] = fn
};
require.exec = function (path, fn) {
    fn.call(window, require.relative(path))
};
require.relative = function (parent) {
    function fn(p) {
        if ("." != p[0]) return require(p, parent);
        var path = parent.split("/"),
            segs = p.split("/");
        path.pop();
        for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            if (".." == seg) path.pop();
            else if ("." != seg) path.push(seg)
        }
        return require(path.join("/"), parent)
    }
    fn.exists = require.exists;
    return fn
};

require.register("indexof/index.js", function (module, exports, require) {
    var indexOf = [].indexOf;
    module.exports = function (arr, obj) {
        if (indexOf) return arr.indexOf(obj);
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj) return i
        }
        return -1
    }
});

require.register("clone/index.js", function (module, exports, require) {
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
          throw new Error('"clone(obj)": The "obj" parameter is required and must be a object.');
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

// require.register("balloonsjs-extend/index.js", function(exports, require, module){
// 'use strict';

// /**
//  * Extends a given object with properties from another object.
//  * @param {Object} destination A given object to extend its properties.
//  * @param {Object} from A given object to share its properties.
//  * @returns {Object}
//  * @example
//  * var foo = {
//  *     'baz': 'qux'
//  * };

//  * var bar = {
//  *     'quux': 'corge'
//  * };
//  *
//  * extend(foo, bar);
//  *
//  * console.log(foo.quux) // returns 'corge'
//  */
// // Module exports.
// module.exports = function extend(destination, from) {

//     if (destination === undefined || typeof destination !== 'object') {
//             throw new Error('"extend(destination, from)": The "destination" parameter is required and must be an object.');
//     }

//     if (from === undefined || typeof from !== 'object') {
//             throw new Error('"extend(destination, from)": The "from" parameter is required and must be an object.');
//     }

//     var prop;

//     for (prop in from) {

//         if (from[prop] !== undefined) {
//             destination[prop] = from[prop];
//         }

//     }

//     return destination;
// };
// });
// require.register("balloonsjs-inherits/index.js", function(exports, require, module){
// 'use strict';

// // Module dependencies.
// var extend = require('extend');

// /**
//  * Inherits prototype properties from `uber` into `child` constructor.
//  * @param {Function} child A given constructor function who inherits.
//  * @param {Function} uber A given constructor function to inherit.
//  * @returns {Object}
//  * @example
//  * inherits(child, uber);
//  */
// // Module exports.
// module.exports = function inherits(child, uber) {
//     var obj = child.prototype || {};
//     child.prototype = extend(obj, uber.prototype);

//     return uber.prototype;
// };
// });
// require.register("balloonsjs-EventEmitter/index.js", function(exports, require, module){
// 'use strict';

// /**
//  * Event Emitter Class for the browser.
//  * @memberof ch
//  * @constructor
//  * @returns {Object} Returns a new instance of EventEmitter.
//  * @example
//  * // Create a new instance of EventEmitter.
//  * var emitter = new EventEmitter();
//  * @example
//  * // Inheriting from EventEmitter.
//  * inherits(Component, EventEmitter);
//  */
// function EventEmitter() {}

// /**
//  * Adds a listener to the collection for a specified event.
//  * @memberof! EventEmitter.prototype
//  * @function
//  * @param {String} event The event name to subscribe.
//  * @param {Function} listener Listener function.
//  * @param {Boolean} once Indicate if a listener function will be called only one time.
//  * @example
//  * // Will add an event listener to 'ready' event.
//  * emitter.on('ready', listener);
//  */
// EventEmitter.prototype.on = function (event, listener, once) {

//     if (event === undefined) {
//         throw new Error('EventEmitter - "on(event, listener)": It should receive an event.');
//     }

//     if (listener === undefined) {
//         throw new Error('EventEmitter - "on(event, listener)": It should receive a listener function.');
//     }

//     this._eventsCollection = this._eventsCollection || {};

//     listener.once = once || false;

//     if (this._eventsCollection[event] === undefined) {
//         this._eventsCollection[event] = [];
//     }

//     this._eventsCollection[event].push(listener);

//     return this;
// };

// /**
//  * Adds a listener to the collection for a specified event to will execute only once.
//  * @memberof! EventEmitter.prototype
//  * @function
//  * @param {String} event Event name.
//  * @param {Function} listener Listener function.
//  * @returns {Object}
//  * @example
//  * // Will add an event handler to 'contentLoad' event once.
//  * widget.once('contentLoad', listener);
//  */
// EventEmitter.prototype.once = function (event, listener) {

//     this.on(event, listener, true);

//     return this;
// };

// /**
//  * Removes a listener from the collection for a specified event.
//  * @memberof! EventEmitter.prototype
//  * @function
//  * @param {String} event Event name.
//  * @param {Function} listener Listener function.
//  * @returns {Object}
//  * @example
//  * // Will remove event listener to 'ready' event.
//  * widget.off('ready', listener);
//  */
// EventEmitter.prototype.off = function (event, listener) {

//     if (event === undefined) {
//         throw new Error('EventEmitter - "off(event, listener)": It should receive an event.');
//     }

//     if (listener === undefined) {
//         throw new Error('EventEmitter - "off(event, listener)": It should receive a listener function.');
//     }

//     if (this._eventsCollection === undefined) {
//         return this;
//     }

//     var listeners = this._eventsCollection[event],
//         i = 0,
//         len;

//     if (listeners !== undefined) {
//         len = listeners.length;
//         for (i; i < len; i += 1) {
//             if (listeners[i] === listener) {
//                 listeners.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     return this;
// };

// /**
//  * Returns all listeners from the collection for a specified event.
//  * @memberof! EventEmitter.prototype
//  * @function
//  * @param {String} event The event name.
//  * @returns {Array}
//  * @example
//  * // Returns listeners from 'ready' event.
//  * widget.getListeners('ready');
//  */
// EventEmitter.prototype.getListeners = function (event) {

//     if (event === undefined) {
//         throw new Error('EventEmitter - "getListeners(event)": It should receive an event.');
//     }

//     return this._eventsCollection[event];
// };

// /**
//  * Execute each item in the listener collection in order with the specified data.
//  * @memberof! EventEmitter.prototype
//  * @function
//  * @param {String} event The name of the event you want to emit.
//  * @param {...Object} var_args Data to pass to the listeners.
//  * @example
//  * // Will emit the 'ready' event with 'param1' and 'param2' as arguments.
//  * widget.emit('ready', 'param1', 'param2');
//  */
// EventEmitter.prototype.emit = function () {

//     var args = Array.prototype.slice.call(arguments, 0), // converted to array
//         event = args.shift(), // Store and remove events from args
//         listeners,
//         i = 0,
//         len;

//     if (event === undefined) {
//         throw new Error('EventEmitter - "emit(event)": It should receive an event.');
//     }

//     if (typeof event === 'string') {
//         event = {'type': event};
//     }

//     if (!event.target) {
//         event.target = this;
//     }

//     if (this._eventsCollection !== undefined && this._eventsCollection[event.type] !== undefined) {
//         listeners = this._eventsCollection[event.type];
//         len = listeners.length;

//         for (i; i < len; i += 1) {
//             listeners[i].apply(this, args);

//             if (listeners[i].once) {
//                 this.off(event.type, listeners[i]);
//                 len -= 1;
//                 i -= 1;
//             }
//         }
//     }

//     return this;
// };

// // Expose EventEmitter
// exports = module.exports = EventEmitter;
// });
// require.register("balloonsjs-Component/index.js", function(exports, require, module){
// 'use strict';

// // Module dependencies
// var clone = require('clone'),
//     extend = require('extend'),
//     inherits = require('inherits'),
//     EventEmitter = require('EventEmitter');

// /**
//  * Base class for all components.
//  * @constructor
//  * @augments EventEmitter
//  * @param {(jQuerySelector | ZeptoSelector)} $el jQuery or Zepto Selector.
//  * @param {Object} [options] Configuration options.
//  * @returns {component} Returns a new instance of Component.
//  */
// function Component(el, options) {
//     /**
//      * Reference to context of an instance.
//      * @type {Object}
//      * @private
//      */
//     var that = this;

//     this._init(el, options);

//     if (this.initialize !== undefined) {
//         /**
//          * If you define an initialize method, it will be executed when a new Expandable is created.
//          * @memberof! Component.prototype
//          * @function
//          */
//         this.initialize();
//     }

//     /**
//      * Event emitted when the component is ready to use.
//      * @event Component#ready
//      * @example
//      * // Subscribe to "ready" event.
//      * component.on('ready', function () {
//      *     // Some code here!
//      * });
//      */
//     setTimeout(function () { that.emit('ready'); }, 50);
// }

// inherits(Component, EventEmitter);

// /**
//  * The name of a component.
//  * @memberof! Component.prototype
//  * @type {String}
//  * @example
//  * // You can reach the instance associated.
//  * var component = $(selector).data(name);
//  */
// Component.prototype.name = 'component';

// /**
//  * Returns a reference to the constructor function.
//  * @memberof! Component.prototype
//  * @function
//  */
// Component.prototype.constructor = Component;

// /**
//  * Initialize a new instance of Component and merge custom options with defaults options.
//  * @memberof! Component.prototype
//  * @function
//  * @private
//  * @returns {instance} Returns an instance of Component.
//  */
// Component.prototype._init = function (el, options) {

//     // Clones the defaults options or creates a new object.
//     var defaults = (this._defaults) ? clone(this._defaults) : {};

//     if (options === undefined) {
//         if (el === undefined) {
//             this._options = defaults;

//         } else if (typeof el === 'object') {
//             options = el;
//             el = undefined;
//             this._options = extend(defaults, options);
//         }

//     } else if (typeof options === 'object') {
//         this._options = extend(defaults, options);

//     } else {
//         throw new Error('component._init(): Unexpected parameters were found in the \'' + this.name + '\' instantiation.');
//     }

//     return this;
// };

// /**
//  * Enables an instance of Component.
//  * @memberof! Component.prototype
//  * @function
//  * @returns {instance} Returns an instance of Component.
//  * @example
//  * // Enabling an instance of Component.
//  * component.enable();
//  */
// Component.prototype.enable = function () {
//     this._enabled = true;

//     /**
//      * Emits when a component is enable.
//      * @event Component#enable
//      * @example
//      * // Subscribe to "enable" event.
//      * component.on('enable', function () {
//      *     // Some code here!
//      * });
//      */
//     this.emit('enable');

//     return this;
// };

// /**
//  * Disables an instance of Component.
//  * @memberof! Component.prototype
//  * @function
//  * @return {instance} Returns an instance of Component.
//  * @example
//  * // Disabling an instance of Component.
//  * component.disable();
//  */
// Component.prototype.disable = function () {
//     this._enabled = false;

//     /**
//      * Emits when a component is disable.
//      * @event Component#disable
//      * @example
//      * // Subscribe to "disable" event.
//      * component.on('disable', function () {
//      *     // Some code here!
//      * });
//      */
//     this.emit('disable');

//     return this;
// };

// /**
//  * Destroys an instance of Component and remove its data from asociated element.
//  * @memberof! Component.prototype
//  * @function
//  * @example
//  * // Destroying an instance of Component.
//  * component.destroy();
//  */
// Component.prototype.destroy = function () {

//     this.disable();

//     /**
//      * Emits when a component is destroyed.
//      * @event Component#destroy
//      * @exampleDescription
//      * @example
//      * // Subscribe to "destroy" event.
//      * component.on('destroy', function () {
//      *     // Some code here!
//      * });
//      */
//     this.emit('destroy');
// };

// // Expose Component
// module.exports = Component;
// });
// require.register("balloons/index.js", function(exports, require, module){
// 'use strict';

// // Module dependencies
// var clone = require('clone'),
//     extend = require('extend'),
//     inherits = require('inherits'),
//     EventEmitter = require('EventEmitter'),
//     Component = require('Component'),
//     Q = {};

// // Version
// Q.version = '0.0.1';

// // Utils
// Q.util = {
//     'clone': clone,
//     'extend': extend,
//     'inherits': inherits
// };

// // Observable
// Q.observable = function (component) {
//     inherits(component, EventEmitter);

//     return Q;
// };

// // Component
// Q.component = function (component) {
//     inherits(component, Component);

//     return Q;
// };

// // Expose Balloons
// module.exports = Q;
// });

// if (typeof exports == "object") {
//   module.exports = require("balloons");
// } else if (typeof define == "function" && define.amd) {
//   define(function(){ return require("balloons"); });
// } else {
//   this["Q"] = require("balloons");
// }
