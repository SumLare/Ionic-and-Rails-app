(function(){
  'use strict';
  angular
        .module('starter.settings')
        .controller('Settings', Settings);

  function Settings($auth, $state, $rootScope, $stateParams, $ionicPopup, $cordovaFacebook, ionicMaterialInk, Restangular){
    ionicMaterialInk.displayEffect();
    var vm = this;

    Restangular.one('users', $stateParams.id).getList('settings').then(function(settings){
      vm.settings = settings[0];
      vm.signOut = signOut;
      vm.updateSettings = updateSettings;
      function signOut(){
        $ionicPopup.confirm({
          title: 'Точно выйти?',
        }).then(function(res) {
            if(res) {
              $cordovaFacebook.logout();
              $auth.signOut().then(function(resp) {
                $state.go('app.login');
              });
          }
        }
      )};
      function updateSettings(){
        vm.settings.put();
      };

    });
  };

})();