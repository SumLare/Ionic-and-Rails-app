(function(){
  'use strict';
  angular
        .module('starter.dreamlist')
        .controller('DreamList', DreamList);

  function DreamList($scope, ionicMaterialInk, $ionicPopup, $window, Dream) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    vm.deleteDream = deleteDream;
    vm.refresh = refresh;

    Dream.query(function(result){
      vm.dreams = result;
    }); 
    
    function deleteDream(dream){
        $ionicPopup.confirm({
           title: 'Отказываешься от своей мечты?',
        }).then(function(res) {
          if(res) {
              dream.$delete(function () {
              $window.location.href = '';
            })
          }
        });
    };
    function refresh(){
      Dream.query(function(result){
        vm.dreams = result;
        $scope.$broadcast('scroll.refreshComplete');
      });  
    }
};

})();