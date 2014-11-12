
/*
* Name: main
*
* Purpose: configure application routing
*
* Dependencies: ui-router
*
* */


(function(module){
    'use strict';

    module.config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('state1', {
                url: "/",
                templateUrl: "_views/state1.html"
        })

        $urlRouterProvider.when('', '/');


    }).run(function($rootScope, $state, $stateParams, $location){

        });

}(angular.module('starter', ['ui.router','common.controllers'])));