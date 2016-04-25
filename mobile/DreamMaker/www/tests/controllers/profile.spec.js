describe('starter.profile', function(){
    var scope, controller, Restangular, stateParams, ionicMaterialInk;

    beforeEach(module('starter.profile'));
    beforeEach(module('ui.router'));
    beforeEach(module('restangular'));
    beforeEach(module('ionic-material'));

    beforeEach(inject(function($controller, $rootScope, $stateParams, _ionicMaterialInk_, _Restangular_){
      Restangular = _Restangular_;
      ionicMaterialInk = _ionicMaterialInk_;
      stateParams = {id: 1};
      scope = $rootScope.$new();
      controller = $controller('Profile', {
        $scope: scope,
        Restangular: Restangular,
        $stateParams: stateParams,
        ionicMaterialInk: ionicMaterialInk
      });
    }));

});