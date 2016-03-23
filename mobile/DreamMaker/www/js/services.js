angular.module('starter.services', ['ngResource'])

.factory('Dream', function ($resource) {
  return $resource('http://localhost:3000/v1/dreams/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
});