(function(){
  'use strict';
  angular
        .module('starter.profile')
        .controller('Profile', Profile);

  function Profile($rootScope, $stateParams, ionicMaterialInk, Restangular) {
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.user = Restangular.one('users', $stateParams.id).get().$object;

    Restangular.one('users', $rootScope.currentUser.id).getList('friendships')
    .then(function (friends) {
      vm.friends = friends;
      vm.subscribe = subscribe;
      vm.text = "Follow";
      angular.forEach(vm.friends, function(obj){
        if(obj.attributes['friend-id'] == vm.user.id){
          vm.friend = obj;
          vm.text = "Unfollow";
        }
        else{
          vm.text = "Follow";
        }
       
      });
      var toggle = true;
      
      
      function subscribe(friend) {
        if (friend && toggle){
          friend.remove();
          vm.text = "Follow";
          toggle = false;
        } 
        else{
          vm.friends.customPOST({friend_id:vm.user.id});
          vm.text = "Unfollow";
          toggle = true;
        }
      }
    })
    

    
  };

})();