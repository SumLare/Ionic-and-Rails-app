(function(){
  'use strict';
  angular
        .module('starter.settings')
        .controller('Settings', Settings);

  function Settings($auth, $state, $rootScope, $stateParams, $ionicPopup, ionicMaterialInk, Restangular){
    ionicMaterialInk.displayEffect();
    var vm = this;

    Restangular.one('users', $stateParams.id).getList('settings').then(function(settings){
      vm.settings = settings[0];
      vm.signOut = signOut;
      vm.friendRating = friendRating;
      vm.friendViewProfile = friendViewProfile;
      vm.notifications = notifications;
      function signOut(){
        $ionicPopup.confirm({
          title: 'Точно выйти?',
        }).then(function(res) {
            if(res) {
             $auth.signOut()
                .then(function(resp) {
                  $state.go('app.login');
                });
          }
        }
      )};
      function notifications(){
        vm.settings.put();
      }
      function friendRating(){
        vm.settings.put();
      };

      function friendViewProfile() {
        vm.settings.put();
      }
    });
  };

})();