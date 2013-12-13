function MyComponent() {}

Q.component(MyComponent);

var myComponent = new MyComponent(),
    readyEvent = jasmine.createSpy('readyEvent'),
    destroyEvent = jasmine.createSpy('destroyEvent');

myComponent
    .on('ready', function () { readyEvent(); })
    .on('destroy', function () { destroyEvent(); });

describe('Q.component', function () {

    it('should be defined.', function () {
        expect(typeof Q.component).toEqual('function');
    });

    it('should return a component.', function () {
        expect(Q.component(MyComponent)).toEqual(MyComponent);
    });
});

describe('Q.component should have the following public methods:', function () {
    var methods = ['on', 'off', 'emit', 'once', 'getListeners', 'enable', 'disable', 'destroy'],
        i = 0,
        len = methods.length;

    for (i; i < len; i += 1) {
        (function (i){
            it('.' + methods[i] + '()', function () {
                expect(myComponent[methods[i]]).not.toEqual(undefined);
                expect(typeof myComponent[methods[i]]).toEqual('function');
            });
        }(i));
    }
});