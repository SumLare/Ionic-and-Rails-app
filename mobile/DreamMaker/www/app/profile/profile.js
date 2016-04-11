(function(){
  'use strict';
  angular
        .module('starter.profile')
        .controller('Profile', Profile);

  function Profile($rootScope, $stateParams, ionicMaterialInk, User, Friend) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    Friend.query(function(resp){
      vm.friends = resp;
    });

    User.get({ id: $stateParams.id })
                  .$promise
                  .then(function (data) {
      vm.user = data;
      vm.follow = follow;
      vm.unfollow = unfollow;
      function follow(friend) {
        vm.friend = new Friend({user_id: $rootScope.currentUser.id, friend_id: $stateParams.id});
        vm.friend.$save(function(){

        });
      };
      function unfollow(friend) {
        Friend.delete(friend);
      }
    });
  };

})();