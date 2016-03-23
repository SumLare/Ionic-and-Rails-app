angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngResource'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.form.toggle('large').checkbox('circle');
    if(ionic.Platform.isAndroid())
        $ionicConfigProvider.scrolling.jsScrolling(false);  
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

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login',{
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html'
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
          controller: 'DreamsListCtrl'
        }
      }
    })

  .state('app.dream', {
    url: '/dreams/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/dream.html',
        controller: 'DreamShowCtrl'
      }
    }
  })
  .state('create',{
    url: '/dreams/new',
    templateUrl: 'templates/create.html',
    controller: 'DreamCreateCtrl'
  });
  
  $urlRouterProvider.otherwise('/app/login');

});
