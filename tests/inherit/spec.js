describe('inherit() method', function () {
    function Pet(name) {}

    Pet.prototype.setName = function(name) {
        this.name = name;
    };

    function Cat(name) {}

    it('should be defined', function () {
        expect(Q.inherit).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof Q.inherit).toEqual('function');
    });

    it('should inherit the first constructor from the second', function () {
        Q.inherit(Cat, Pet);
        expect(Cat.prototype.setName).toBeDefined();
    });
});