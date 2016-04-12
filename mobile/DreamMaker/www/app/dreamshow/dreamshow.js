(function(){
  'use strict';
  angular
        .module('starter.dreamshow')
        .controller('DreamShow', DreamShow);

function DreamShow($rootScope, ionicMaterialInk, $stateParams, $ionicPopup, Restangular, Dream, Step, Status) {
  ionicMaterialInk.displayEffect();
  var vm = this;
  Status.query(function (resp) {
    vm.rate = resp;
  });
  Restangular.one('dreams', $stateParams.id).get().then(function(dream) {
    vm.dream = dream;  
    vm.getProgress = getProgress;
    vm.deleteStep = deleteStep;
    vm.rateUp = rateUp;
    vm.newRateUp = newRateUp;

    angular.forEach(vm.rate.data, function(obj){
      if ($rootScope.currentUser.id == obj.attributes["user-id"] && 
          vm.dream.data.id == obj.attributes["dream-id"]){
        vm.star = obj;
      }
    });

    function getProgress(){
      var result, count = 0;
      var number = vm.dream.included;
      for (var i = 0; i < number.length; i++) {
        if(number[i].attributes.finished == true)
          count++;
        }
      result = count / number.length * 100;
      return result;
    };

    function deleteStep(step){
      $ionicPopup.confirm({
         title: 'Точно удалить?',
      }).then(function(res) {
        if(res) {
          Step.delete({dreamId: vm.dream.data.id},step);
          vm.dream.included.splice(vm.dream.included.indexOf(step), 1);
        };
      });
    };

    function rateUp() {
      angular.forEach(vm.rate.data, function(value) {
        if ($rootScope.currentUser.id == value.attributes["user-id"] && 
          vm.dream.data.id == value.attributes["dream-id"]){
            if (value.attributes.status == false ||
                value.attributes.status == null){
              vm.dream.data.attributes.rate++;
              value.attributes.status = true;
            }
            else{
              vm.dream.data.attributes.rate--;
              value.attributes.status = false;
            }
          Status.update(value);
          vm.id = vm.dream.data.id
          Dream.update({id: vm.id},vm.dream);
        }
      });
    };

    function newRateUp() {
      Restangular.all('rating_statuses').customPOST({user_id: $rootScope.currentUser.id, 
                                dream_id: vm.dream.data.id, 
                                status: true});
        vm.dream.data.attributes.rate++;
        vm.id = vm.dream.data.id
        Dream.update({id: vm.id},vm.dream);
      }
  });
};

})();
