angular.module('starter.services', ['ngResource'])

.factory('Dream', function ($resource) {
  return $resource('http://api.dreammaker_api.dev:3000/dreams/:id', {id: '@id'}, {
    'query':  { method:'GET', isArray:false},
    'update': { method:'PUT' }
  });
});