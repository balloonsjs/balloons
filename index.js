'use strict';

// Module dependencies
var clone = require('clone'),
    extend = require('extend'),
    inherits = require('inherits'),
    EventEmitter = require('EventEmitter'),
    Component = require('Component'),
    Q = {};

// Version
Q.version = '0.0.1';

// Utils
Q.util = {
    'clone': clone,
    'extend': extend,
    'inherits': inherits
};

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