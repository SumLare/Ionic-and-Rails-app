(function(){
'use strict';

angular.module('starter.services', ['ngResource'])
  .factory('Dream', dream)
  .factory('Step', step)
  .factory('User', user);

  function dream($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/dreams/:id', 
      {id: '@id'}, 
      {
        'query':  { method:'GET', isArray:false},
        'update': { method:'PUT' },
        'delete': { method:'DELETE' }
      });
  };
  function step($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/dreams/:id/steps/:id',
      {id: '@id'},
      {
        'query':  { method:'GET', isArray:true },
        'update': { method: 'PUT'}
      });
  };
  function user($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/users/:id', 
    {id: '@id'},
    {
      'update': { method:'PUT' }
    });
  };
})();