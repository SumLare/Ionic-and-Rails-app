(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($stateParams, User, Friend) {
    var vm = this;
    vm.follow = follow;
    vm.user = User.get({ id: $stateParams.id })
                  .$promise
                  .then(function (data) {
                    vm.user = data;
                  });

    function follow(friend) {
      
    };
  };

})();