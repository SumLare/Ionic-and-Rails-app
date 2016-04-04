describe('DreamListCtrl', function(){
    var scope;

    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('DreamListCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have get query', function(){
       expect($scope).toBeDefined();
    });
});