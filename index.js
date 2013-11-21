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