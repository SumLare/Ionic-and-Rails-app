(function(){
  'use strict';
  angular
        .module('starter.create')
        .controller('DreamCreate', DreamCreate);

  function DreamCreate($rootScope, ionicMaterialInk, $state, $stateParams, $ionicHistory, Restangular) {
    var vm = this;
    ionicMaterialInk.displayEffect();
    var baseDreams = Restangular.all('dreams');
    vm.rmStep = rmStep;
    vm.createDream = createDream;
    vm.addStep = addStep;
    vm.steps = [{}];

    function addStep() {
      vm.steps.push(step);
    };

    function rmStep(step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
    };
    
      
    function createDream(){

      var step = {
        title: vm.stepTitle,
        date: vm.stepDate,
        description: vm.stepDescription
      };

      var dream = {
        title: vm.title,
        lastDate: vm.lastDate,
        user_id: $rootScope.currentUser.id
      };
      baseDreams.post(dream).then(function(res) {
        vm.dream = res;
        Restangular.one('dreams', vm.dream.id).post('steps', step).then(function(res) {
          
        }, function (res) {
          vm.errors = res.data.errors;
          console.log(vm.errors);
        });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
      }, function(res) {
          vm.errors = res.data.errors;
          vm.rmTitleError = rmTitleError;
          vm.rmDateError = rmDateError;
          function rmTitleError(error) {
            vm.errors.title.splice(vm.errors.title.indexOf(error), 1);
          }
          function rmDateError(error) {
            vm.errors.lastDate.splice(vm.errors.lastDate.indexOf(error), 1);
          }
      });      
    };
};

})();