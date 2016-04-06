(function(){
  'use strict';
  angular
        .module('starter.profile')
        .controller('Profile', Profile);

  function Profile($stateParams, ionicMaterialInk, User) {
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.user = User.get({ id: $stateParams.id })
                  .$promise
                  .then(function (data) {
                    vm.user = data;
                    console.log(vm.user.data.relationships.friendships.data[0]);
                  });
  };

})();