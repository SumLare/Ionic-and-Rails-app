(function(){
  'use strict';
  angular
        .module('starter.dreamlist')
        .controller('DreamList', DreamList);

  function DreamList($rootScope, $scope, ionicMaterialInk, $ionicPopup, Restangular) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    Restangular.all('users').getList().then(function (resp) {
      vm.users = resp;
      vm.settings = [];
      angular.forEach(vm.users, function (val) {
        val.getList('settings').then(function(resp) {
          var settings = resp[0].attributes.friendsViewProfile;
          vm.settings.push(settings);
        });
      });

    });
    Restangular.all('dreams').getList().then(function(dreams) {
      vm.dreams = dreams;
      vm.deleteDream = deleteDream;
      vm.refresh = refresh;

      function deleteDream(dream){
        $ionicPopup.confirm({
          title: 'Отказываешься от своей мечты?',
        }).then(function(res) {
            if(res) {
              dream.remove();
              vm.dreams.splice(vm.dreams.indexOf(dream), 1);
            }
        });
      };

      function refresh(){
        Restangular.all('dreams').getList().then(function(res) {
          vm.dreams = res;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }
    });
};

})();