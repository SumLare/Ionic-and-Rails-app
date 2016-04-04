(function(){
  'use strict';
  angular
        .module('starter.settings')
        .controller('Settings', Settings);

  function Settings($auth, $state, ionicMaterialInk)    {
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.signOut = signOut;

    function signOut(){
     $auth.signOut()
        .then(function(resp) {
          $state.go('app.login');
        });
    };
  };

})();