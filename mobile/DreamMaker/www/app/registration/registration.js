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
      }, function(res) {
          vm.errors = res.data.errors;
          vm.rmError = rmError;
          function rmError(error) {
            vm.errors.full_messages.splice(vm.errors.full_messages.indexOf(error), 1);
          }

      });
    }; 
};

})();