describe('Q.emitter', function () {
    var emitter,
        listener,
        listener2;

    beforeEach(function() {
        emitter = Q.emitter();

        listener = jasmine.createSpy('listener'),
        listener2 = jasmine.createSpy('listener2');
    });

    describe('Instance', function() {
        it('Should return an instance of Emitter', function () {
            expect(emitter).toBeDefined();
            expect(typeof emitter).toEqual("object");
            expect(emitter.constructor.name).toEqual('Emitter');
        });
    });

    describe('Public methods', function() {
        it('Should be defined ".on()" method', function () {
            expect(emitter.on).toBeDefined();
        });

        it('Should be defined ".once()" method', function () {
            expect(emitter.once).toBeDefined();
        });

        it('Should be defined ".off()" method', function () {
            expect(emitter.off).toBeDefined();
        });

        it('Should be defined "getListeners" method', function () {
            expect(emitter.getListeners).toBeDefined();
        });

        it('Should be defined "emit" method', function () {
            expect(emitter.emit).toBeDefined();
        });
    });

    describe('.on(event, listener)', function () {

        it('Should call all listeners when it emits an event', function () {
            emitter.on('something', listener);
            emitter.on('something', listener2);

            emitter.emit('something');

            expect(listener).toHaveBeenCalled();
            expect(listener2).toHaveBeenCalled();
        });

    });

    describe('.once(event, listener)', function () {
        it('Should call listener only one time', function () {
            emitter.once('something', listener);
            emitter.once('something', listener2);

            expect(emitter.getListeners('something').length).toEqual(2);

            emitter.emit('something');

            expect(emitter.getListeners('something').length).toEqual(0);
        });
    });


    describe('.off(event, listener)', function () {

        it('Should remove a listener', function () {
            emitter.on('something', listener);
            emitter.off('something', listener);
            emitter.emit('something');

            expect(listener).not.toHaveBeenCalled();
        });

    });

    describe('.getListeners()', function () {

        it('Should return a collection', function () {
            emitter.on('something', listener);

            expect(function(){
                emitter.getListeners('something');
            }).not.toThrow();

            expect(typeof emitter.getListeners('something')).toEqual("object");

        });
    });

    describe('.emit(event, param1, param2, ..., paramsN)', function () {
        beforeEach(function () {
            emitter.on('something', listener);
            emitter.on('something', listener2);
        });

        it('Should emit call all listeners', function () {
            emitter.emit('something');

            expect(listener).toHaveBeenCalled();
            expect(listener2).toHaveBeenCalled();
        });

        it('Should emit call all listeners with parameters', function () {
            emitter.emit('something', 'param1');

            expect(listener).toHaveBeenCalledWith('param1');
        });
    });
});