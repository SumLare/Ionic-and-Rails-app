(function(){
  'use strict';
  angular
        .module('starter.create')
        .controller('DreamCreate', DreamCreate);

  function DreamCreate($rootScope, $state, $stateParams, $ionicHistory, Restangular) {
    var vm = this;
    vm.addStep = addStep;
    vm.rmStep = rmStep;
    vm.createDream = createDream;
    //vm.date = new Date().toISOString().split("T")[0];
    vm.steps = [step];

    function addStep() {
      vm.steps.push(step);
    };

    function rmStep(step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
    };

      var step = {
        title: vm.stepTitle,
        description: vm.stepDesc,
        date: vm.stepDate,
      }
    function createDream(){
      var dream = {
        title: vm.title,
        lastDate: vm.lastDate
      }
      Restangular.all('dreams').post(dream).then(
        function(res){
          Restangular.all('steps').post(step);
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
        }
      );      
    };
};

})();