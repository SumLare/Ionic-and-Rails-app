(function(){
  'use strict';
  angular
        .module('starter.registration')
        .controller('Registration', Registration);

  function Registration($auth, $state) {
  var vm = this;
  vm.registrationForm = {};
  vm.handleRegBtnClick = handleRegBtnClick;
  function handleRegBtnClick() {
    $auth.submitRegistration(vm.registrationForm)
      .then(function(resp) {
        $auth.submitLogin({
          email: vm.registrationForm.email,
          password: vm.registrationForm.password
        });
      });
    }; 
};

})();