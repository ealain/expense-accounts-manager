'use strict';

var app = angular.module('billManager', ['ngResource', 'ui.router']);

app.run(function($state, $trace) {
    $trace.enable('TRANSITION');
});
