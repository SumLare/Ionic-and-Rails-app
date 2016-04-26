(function(){
  'use strict';
  angular
        .module('starter.dreamshow')
        .controller('DreamShow', DreamShow);

function DreamShow($rootScope, ionicMaterialInk, $state, $stateParams, $ionicPopup, Restangular) {
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
    Restangular.one('users', vm.userDreamId).getList('settings').then(function(settings) {
      vm.settings = settings;
    }); 

    Restangular.one('dreams', $stateParams.id).getList('steps').then(function(steps) {
      vm.steps = steps;
      vm.getProgress = getProgress;
      vm.deleteStep = deleteStep;
      vm.updateStepStatus = updateStepStatus;

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
      function updateStepStatus(step) {
        if (vm.steps[vm.steps.length-1].attributes.finished == true) {
          $ionicPopup.confirm({
             title: 'Вы достигли своей цели?',
          }).then(function(res) {
            if(res) {
              step.put();
              vm.dream.attributes.finished = true;
              vm.dream.put();
              $state.go('app.dreams');
              $ionicPopup.alert({title:'Поздравляем, вы достигли своей цели!'});
            }
            else{
              $ionicPopup.alert({title:'Закончите все шаги!'});
            }
          });
        }
        else{
          step.put();
        }
      };
    });
    Restangular.one('dreams', $stateParams.id).getList('rating_statuses').then(function(rate){
      vm.rate = rate;
      vm.rateUp = rateUp;
      vm.newRateUp = newRateUp;
      angular.forEach(vm.rate, function(obj){
        if ($rootScope.currentUser.id == obj.attributes["user-id"] && 
            vm.dream.id == obj.attributes["dream-id"]){
          vm.star = obj;
        }
      });
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
        vm.rate.post();
        vm.dream.attributes.rate++;
        vm.dream.put();
      };
    })

  });
  
};

})();
