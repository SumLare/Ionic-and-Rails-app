angular.module('starter.controllers', ['angular-svg-round-progress', 'counter'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


})

.controller('DreamsListCtrl', function($scope, Dream) {
  Dream.query(function(result){
    $scope.dreams = result;
  }); 
})
.controller('DreamShowCtrl', function ($scope, $stateParams, Dream) {
   
  $scope.dream = Dream.get({ id: $stateParams.id });
  $scope.dream.$promise.then(function(data) {
    $scope.dream = data;
    $scope.getprogress = function(){
      var result = 0;
      var count = 0;
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
.controller('DreamCreateCtrl', function($scope){
  $scope.steps = [{
    "value": ""
  }];
  $scope.addStep = function () {
    $scope.steps.push({});
  }
});
