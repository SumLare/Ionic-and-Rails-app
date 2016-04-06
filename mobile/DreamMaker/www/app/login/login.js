(function(){
  'use strict';
  angular
        .module('starter.login')
        .controller('Login', Login);

  function Login($state, $auth, $ionicHistory) {
    var vm = this;
    vm.loginForm = {};
    vm.doLogin = doLogin;

    function doLogin(){
      $auth.submitLogin(vm.loginForm)
        .then(function(resp) {
          vm.currentUser = resp;
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
        });
    };
  };

})();