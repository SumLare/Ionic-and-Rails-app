(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($rootScope, $stateParams, User, Friend) {
    var vm = this;
    vm.user = User.get({ id: $stateParams.id })
                  .$promise
                  .then(function (data) {
                    vm.user = data;
                  });


  };

})();