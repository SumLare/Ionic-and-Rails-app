(function(){
  'use strict';
  angular
        .module('starter.app')
        .controller('App', App);

  function App($rootScope, $scope, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopover) {
    ionicMaterialMotion.fadeSlideInRight();
    ionicMaterialInk.displayEffect();
    $rootScope.currentUser = $rootScope.user;
    $ionicPopover.fromTemplateUrl('app/menu/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
  };

})();