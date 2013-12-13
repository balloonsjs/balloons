describe('inherits() method', function () {
    function Pet(name) {}

    Pet.prototype.setName = function(name) {
        this.name = name;
    };

    function Cat(name) {}

    it('should be defined', function () {
        expect(Q.inherits).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof Q.inherits).toEqual('function');
    });

    it('should inherits the first constructor from the second', function () {
        Q.inherits(Cat, Pet);
        expect(Cat.prototype.setName).toBeDefined();
    });
});