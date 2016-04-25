"use strict";

var Rivero_CV_Services = angular.module('Rivero_CV_Services', ['ngRoute']);

Rivero_CV_Services.service('Info', ['$http', '$location', function($http, $location){

    this.getJSON = function(){
        var language = $location.path().replace(/\//g,'');

        return $http({
            method: 'GET',
            url: 'assets/json/' + language + '.json',
            cache: true
        });
    }
}]);