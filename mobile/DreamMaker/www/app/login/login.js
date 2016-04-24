(function(){
  'use strict';
  angular
        .module('starter.login')
        .controller('Login', Login);

  function Login($state, $auth, $ionicHistory, $cordovaFacebook) {
    var vm = this;
    vm.loginForm = {};
    vm.doLogin = doLogin;
    vm.loginFacebook = loginFacebook;

    function doLogin(){
      $auth.submitLogin(vm.loginForm)
        .then(function(resp) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
        }, function(res) {
          vm.errors = res.errors;
          vm.rmError = rmError;
          function rmError(error) {
            vm.errors.splice(vm.errors.indexOf(error), 1);
          }

      }); 
    };

    function loginFacebook(){
      $cordovaFacebook.login(["public_profile", "email"])
      .then(function(resp) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
        });
    };
    
  };

})();