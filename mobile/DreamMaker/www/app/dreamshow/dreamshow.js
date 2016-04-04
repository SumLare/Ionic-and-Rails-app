(function(){
  'use strict';
  angular
        .module('starter.dreamshow')
        .controller('DreamShow', DreamShow);

  function DreamShow(ionicMaterialInk, $stateParams, $ionicPopup, $window, Dream) {
  ionicMaterialInk.displayEffect();
  var vm = this;

  vm.dream = Dream.get({ id: $stateParams.id })
                  .$promise
                  .then(function(data) {
    vm.dream = data;
    vm.getProgress = getProgress;
    vm.deleteStep = deleteStep;

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
            step.$delete(function () {
            $window.location.href = '';
          })
        };
      });
    };

  });
};

})();