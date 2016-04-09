describe('starter.friends', function(){
    var scope;

    beforeEach(module('starter.friends'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('Friends', {$scope: scope, });
    }));

    it('should have get query', function(){
       expect(scope).toBeDefined();
    });
});