describe('Q.clone() method', function () {
    var toTest = {
        'name': 'test',
        'age': 1
    };

    it('should be defined', function () {
        expect(Q.clone).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof Q.clone).toEqual('function');
    });

    it('should return a cloned object', function () {

        var copied = Q.clone(toTest);

        expect(copied.age).toEqual(toTest.age);

        copied.age = 2;

        expect(copied.age).not.toEqual(toTest.age);

    });
});