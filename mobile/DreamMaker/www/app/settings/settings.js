(function(){
  'use strict';
  angular
        .module('starter.settings')
        .controller('Settings', Settings);

  function Settings($auth, $state, $ionicPopup, ionicMaterialInk)    {
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.signOut = signOut;

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
  };

})();