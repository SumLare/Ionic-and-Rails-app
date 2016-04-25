(function(){
  'use strict';
  angular
        .module('starter.dreamshow')
        .controller('DreamShow', DreamShow);

function DreamShow($rootScope, ionicMaterialInk, $stateParams, $ionicPopup, Restangular) {
  ionicMaterialInk.displayEffect();
  var vm = this;
  Restangular.one('dreams', $stateParams.id).get().then(function(dream) {
    vm.dream = dream;
    vm.userDreamId = vm.dream.relationships.user.data.id;
    Restangular.one('users', vm.userDreamId).getList('friendships').then(function(friends) {
      vm.friends = friends;
      angular.forEach(vm.friends, function (val) {
        if ($rootScope.currentUser.id == val.attributes["friend-id"]){
          vm.friend = val;
        }
      });
    }); 
    vm.settings = Restangular.one('users', vm.userDreamId).getList('settings').$object; 
    vm.rate = Restangular.one('dreams', $stateParams.id).getList('rating_statuses').$object;
    vm.steps = Restangular.one('dreams', $stateParams.id).getList('steps').$object;

    vm.getProgress = getProgress;
    vm.deleteStep = deleteStep;
    vm.rateUp = rateUp;
    vm.newRateUp = newRateUp;
    vm.updateStepStatus = updateStepStatus;
    angular.forEach(vm.rate, function(obj){
      if ($rootScope.currentUser.id == obj.attributes["user-id"] && 
          vm.dream.id == obj.attributes["dream-id"]){
        vm.star = obj;
      }
    });

    function getProgress(){
      var result, count = 0;
      var number = vm.steps;
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
          step.remove();
          vm.steps.splice(vm.steps.indexOf(step), 1);
        };
      });
    };

    function rateUp() {
      angular.forEach(vm.rate, function(value) {
        if ($rootScope.currentUser.id == value.attributes["user-id"]){
            if (value.attributes.status == false ||
                value.attributes.status == null){
              vm.dream.attributes.rate++;
              value.attributes.status = true;
            }
            else{
              vm.dream.attributes.rate--;
              value.attributes.status = false;
            }
          value.put();
          vm.dream.put();
        }
      });
    };

    function newRateUp() {
      vm.dream.customPOST({user_id: $rootScope.currentUser.id, status: true});
      vm.dream.attributes.rate++;
      vm.dream.put();
    };

    function updateStepStatus(step) {
      step.put();
    }
  });
  
};

})();
