# [Balloons.js](http://balloonsjs.com) [![Build Status](https://secure.travis-ci.org/balloonsjs/balloons.png)](http://travis-ci.org/balloonsjs/balloons) [![devDependency Status](https://david-dm.org/balloonsjs/balloons/dev-status.png)](https://david-dm.org/balloonsjs/balloons#info=devDependencies)

Balloons.js is an event-based JavaScript library to build front-end components or widgets.

Benefits:
- Dependency-free.
- Just 983 bytes (min & gzip).
- Uses vanilla JavaScript.
- Made it with love.

## API

### Table of contents

- [Q.define()](#qdefineparents-members)
- [Q.emitter()](#qemittercomponent)
- [Q.mediator()](#qmediator)
- [Q.clone](#qcloneobj)
- [Q.extend](#qextenddestination-from)
- [Q.inherit](#qinheritchild-uber)

### Q.define([parents], members)
Defines new components constructors.
- `parents` (optional): [Array] - An optional collection of constructors to inherit.
- `members`: [Object] - A given members to be attached to component's prototype.

```js
// Defines a Foobar component that inhertis from Foo and Bar constructors.
var Foobar = Q.define([Foo, Bar], {
    'name': 'Foobar',
    'init': function () {
        console.log(this.name);
    },
    'sayFoobar': function () {
        console.log('foobar');
    }
});

// Creates a new instance of Foobar component.
var foobar = new Foobar();
```

### Q.emitter([component])
Creates a new instance of an Event Emitter or adds observer methods to a given component.
- `component` (optional): [Function] - A given constructor function.

```js
// Creates a new instance of Emitter.
var emitter = Q.emitter();
```

```js
// Add observer methods to component Foo.
Q.emitter(Foo);
```

#### Q.emitter#on(event, listener, [once])
Adds a `listener` to the collection for a specified `event`.
- `event`: [String] - The name of the event you want to add.
- `listener`: [Function] - Listener you want to add from given event.
- `once` (optional): [Boolean] - Indicates if the given listener should be executed only once.

```js
emitter.on('live', listener);
```

#### Q.emitter#once(event, listener)
Adds a one time `listener` to the collection for a specified `event`. It will execute only once.
- `event`: [String] - The name of the event.
- `listener`: [Function] - Listener you want to add from the given event.

```js
emitter.once('live', listener);
```

#### Q.emitter#off(event, listener)
Removes a `listener` from the collection for a specified `event`.
- `event`: [String] - The name of the event.
- `listener`: [Function] - Listener you want to remove from the given event.

```js
emitter.off('live', listener);
```

#### Q.emitter#getListeners(event)
Returns all `listeners` from the collection for a specified `event`.
- `event`: [String] - The name of the `event`.

```js
emitter.getListeners('live');
```

#### Q.emitter#emit(event, [arg1], [arg2], [...])
Execute each of the `listeners` collection in order with the given parameters.
All emitters emit the event `newListener` when new listeners are added.
- `event`: [String] - The name of the event you want to emit.

```js
emitter.emit('live', 'data1', 'data2');
```

### Q.mediator
An object that encapsulates how a set of objects interact. `Q.mediator` implements the Mediator Pattern in JavaScript. ([Read more](http://en.wikipedia.org/wiki/Mediator_pattern)).

`Q.mediator` has the same methods as an instance of `Q.emitter()`.


### Q.clone(obj)
Returns a shallow-copied clone of a given object.
- `obj`: [Object] - A given object to clone.

```js
var foo = {
    'baz': 'qux'
};

var bar = Q.clone(foo);
```

### Q.extend(destination, from)
Extends a given object with properties from another object.
- `destination`: [Object] - A given object to extend its properties.
- `from`: [Object] - A given object to share its properties.

```js
var foo = {
    'baz': 'qux'
};

var bar = {
    'quux': 'corge'
};

Q.extend(foo, bar);
```

### Q.inherit(child, uber)
Inherits prototype properties from `uber` into `child` constructor.
- `child`: [Function] - A given constructor function who inherits.
- `uber`: [Function] - A given constructor function to inherit.

```js
function Bar() {
    // Some code here
}

function Foo() {
    // Some code here
}

Q.inherit(Foo, Bar);
```

## Development setup
1. Install [Git](http://git-scm.com/) and [NodeJS](http://nodejs.org/).
2. Open your terminal and clone `balloonsjs/balloons` by running:

        $ git clone git@github.com:balloonsjs/balloons.git

3. Now go to the project's folder:

        $ cd balloons

4. Install its dependencies:

        $ npm install

5. Install `grunt-cli`:

        $ npm install grunt-cli -g

6. Develop! :)


## Grunt tasks

- `grunt dev`: Builds a development version.
- `grunt test`: Runs Jasmine tests.
- `grunt dist`: Creates a distrubution version of Balloons. You should find two files: `.dist/Q.js` and `.dist/Q.min.js`.


## Maintained by

- Guille Paz ([@pazguille](https://twitter.com/pazguille))
- Her Mammana ([@hmammana](https://twitter.com/hmammana))
- Lean Linares ([@lean8086](https://twitter.com/lean8086))


## License
Licensed under the MIT license.

Copyright (c) 2014 [BalloonsJS](http://github.com/balloonsjs).
