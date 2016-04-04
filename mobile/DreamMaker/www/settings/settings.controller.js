(function(){
'use strict';
angular.module('starter.controllers.settings')
        .controller('SettingsCtrl',  function($auth, $state, ionicMaterialInk) {
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.signOut = signOut;

    function signOut(){
     $auth.signOut()
        .then(function(resp) {
          $state.go('app.login');
        });
    };
  };);
        SettingsCtrl.$inject = ['$auth', '$state', 'ionicMaterialInk'];


})();