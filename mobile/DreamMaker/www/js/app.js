'use strict';

angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput', 'starter.controllers', 'starter.services', 'ngResource', 'ng-token-auth'])

. config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.form.toggle('large').checkbox('circle');
    $ionicConfigProvider.navBar.alignTitle('center');
    //$ionicConfigProvider.backButton.previousTitleText(false);
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($authProvider){
  $authProvider.configure({
    apiUrl: 'http://api.dreammaker_api.dev:3000/api/v1',
    storage: 'localStorage'
  });
})
.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
}])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    //controllerAs: 'main'
  })
  .state('app.login',{
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      }
    }
  })
  .state('app.registration',{
    url: '/registration',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration.html',
        controller: 'RegCtrl',
        controllerAs: 'registr'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      }
    }
  })
  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl',
          controllerAs: 'profile'
        }
      }
    })
  .state('app.friends', {
      url: '/friends',
      views: {
        'menuContent': {
          templateUrl: 'templates/friends.html'
        }
      }
    })
    .state('app.dreams', {
      url: '/dreams',
      views: {
        'menuContent': {
          templateUrl: 'templates/dreams.html',
          controller: 'DreamsListCtrl',
          controllerAs: 'dreamlist'
        }
      }
    })
  .state('app.dream', {
    url: '/dreams/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/dream.html',
        controller: 'DreamShowCtrl',
        controllerAs: 'dreamshow'
      }
    }
  })
  .state('app.create',{
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'DreamCreateCtrl',
        controllerAs: 'dreamcreate'
      }
    }
  })
  .state('app.edit',{
    url: '/dreams/:id/edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit.html',
        controller: 'DreamEditCtrl',
        controllerAs: 'dreamedit'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/app/dreams');

});
