angular.module('starter.controllers', ['angular-svg-round-progress', 'countTo'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  //ionicMaterialInk.displayEffect();
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


})

.controller('DreamsListCtrl', function($scope, $ionicPopup, $window, Dream) {
  //ionicMaterialInk.displayEffect();
  Dream.query(function(result){
    $scope.dreams = result;
  }); 
  $scope.deleteDream = function(dream){
      console.log("delete");
      var confirmPopup = $ionicPopup.confirm({
         title: 'Отказываешься от своей мечты?',
      });

      confirmPopup.then(function(res) {
        if(res) {
            dream.$delete(function () {
            $window.location.href = '';
          })
        } 
      });
    };
})
.controller('DreamShowCtrl', function ($scope, $stateParams, $window, Dream) {
  $scope.dream = Dream.get({ id: $stateParams.id });
  $scope.dream.$promise.then(function(data) {
    $scope.dream = data;
    $scope.getprogress = function(){
      var result, count = 0;
      var number = $scope.dream;
      for (var i = 0; i < number.steps.length; i++) {
        if(number.steps[i].finished == true)
          count++;
        }
      result = count / number.steps.length * 100;
      return result;
    };

  });
})
.controller('DreamCreateCtrl', function($scope, $state, $stateParams, Dream){
  $scope.date = new Date().toISOString().split("T")[0];

  $scope.dream = new Dream();

  $scope.steps = [{}];
  $scope.addStep = function () {
    $scope.steps.push({});
  };

  $scope.createDream = function(){
    $scope.dream.$save(function(){

      $state.go('dreams');
    });
  };

})
.controller('DreamEditCtrl', function($scope, $state, $stateParams, Dream){

  $scope.updateDream = function () {
    $scope.dream.$update(function () {
      $state.go('dreams');
    });
  };

  $scope.loadDream = function() { 
    $scope.dream = Dream.get({ id: $stateParams.id });
    $scope.dream.$promise.then(function(data) {
      $scope.dream = data;
      $scope.dream.last_date = new Date().toISOString().split("T")[0];
    });
    
  };

  $scope.loadDream(); 
});
