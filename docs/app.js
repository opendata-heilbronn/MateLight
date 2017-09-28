angular.module('BlankApp', ['ui.router', 'ngMaterial', 'md.data.table'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey');
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        "use strict";

        $stateProvider.state({
            name: "index",
            url: '/',
            templateUrl: '/pages/home.html',
        });

        $stateProvider.state({
            name: "material",
            url: '/materialliste',
            templateUrl: '/pages/materialliste.html',
            controller: function ($scope, $http) {
                $http({
                    method: 'GET',
                    url: '/data/materialliste.json'
                }).then(function successCallback(response) {
                    $scope.data = response.data;
                });
            }
        });

        $stateProvider.state({
            name: "anleitung",
            url: '/anleitung',
            templateUrl: '/pages/anleitung.html',
        });

        $stateProvider.state({
            name: "blog",
            url: '/blog',
            templateUrl: '/pages/blog.html',
        });

        $urlRouterProvider.otherwise('/');
    }]);