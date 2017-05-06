'use strict';

var app = angular.module('billManager', ['ngResource', 'ui.router']);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})

app.run(function($state) {
    $state.go('home');
});
