(function(){
'use strict';

angular.module('starter.services', ['ngResource'])
  .factory('Dream', dream)
  .factory('Step', step)
  .factory('User', user)
  .factory('Friend', friend)
  .factory('Status', status);

  function dream($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/dreams/:id', 
      {id: '@id'}, 
      {
        'query':  { method:'GET', isArray:false},
        'update': { method:'PUT' }
      });
  };
  function step($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/dreams/:dreamId/steps/:id',
      {dreamId: '@dreamId', id: '@id'},
      {
        'query':  { method:'GET', isArray:true },
        'update': { method: 'PUT'}
      });
  };
  function user($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/users/:id', 
    {id: '@id'},
    {
      'query':  { method:'GET', isArray:false},
      'update': { method:'PUT' }
    });
  };
  function friend($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/friendships/:id',
    {id: '@id'},
    {
      'query':  { method:'GET', isArray:false}
    });
  };
  function status($resource) {
    return $resource('http://api.dreammaker_api.dev:3000/rating_statuses/:id',
    {id: '@id'},
    {
      'query':  { method:'GET', isArray:false},
      'update': { method:'PUT' }
    });
  };
})();