describe('Q.extend() method', function () {
    var foo = {
            'baz': 'qux'
        },
        bar = {
            'quux': 'corge'
        };

    it('should be defined', function () {
        expect(Q.extend).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof Q.extend).toEqual('function');
    });

    it('should extend the first object with the second properties', function () {
        expect(foo.quux).not.toBeDefined();
        Q.extend(foo, bar);
        expect(foo.quux).toBeDefined();
    });
});