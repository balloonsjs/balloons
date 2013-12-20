var Foo = Q.define({
    'name': 'Foo',
    'init': function () {
        console.log(this.name);
    },
    'sayFoo': function () {
        console.log('foo');
        return this;
    }
});

var Foobar = Q.define([Foo], {
    'name': 'Foobar',
    'init': function () {
        console.log(this.name);
    },
    'sayFoobar': function () {
        console.log('foobar');
    }
});

var foo = new Foo(),
    foobar = new Foobar();

describe('Q.define', function () {

    it('should be defined.', function () {
        expect(typeof Q.define).toEqual('function');
    });

    it('should return a new Balloon function.', function () {
        expect(typeof Foo).toEqual('function');
        expect(Foo.prototype.constructor.name).toEqual('Balloon');
    });
});

describe('Q.define should return a function with the following methods:', function () {
    var methods = ['on', 'off', 'emit', 'once', 'getListeners', 'enable', 'disable', 'destroy', 'constructor', 'inflate'],
        i = 0,
        len = methods.length;

    for (i; i < len; i += 1) {
        (function (i){
            it('.' + methods[i] + '()', function () {
                expect(foo[methods[i]]).not.toEqual(undefined);
                expect(typeof foo[methods[i]]).toEqual('function');
            });
        }(i));
    }
});

describe('Foobar constructor', function () {

    it('should be defined.', function () {
        expect(typeof Foobar).toEqual('function');
    });

    it('should inherit from Foo constructor.', function () {
        expect(Foobar.prototype.sayFoo).toBeDefined();
    });

    it('should create a new instance of Foobar.', function () {
        expect(foobar instanceof Foobar).toBeTruthy();
    });
});