describe('starter.dreamlist', function(){
    var scope, ionicMaterialInk, $ionicPopup, $window, Dream;

    beforeEach(module('starter.dreamlist'));

    beforeEach(inject(function($rootScope, $controller, ionicMaterialInk, $ionicPopup, $window, Dream) {
        scope = $rootScope.$new();
        $controller('DreamList', {$scope: scope, });
    }));

    it('should have get query', function(){
       expect($scope).toBeDefined();
    });
});