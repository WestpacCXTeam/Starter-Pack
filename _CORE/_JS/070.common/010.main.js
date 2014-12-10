/*
* Name: main
*
* Purpose: configure application routing
*
* Dependencies: ui-router
*
* */


(function(module) {
	'use strict';

	module.config(function($stateProvider, $urlRouterProvider) {

		//this is a default state
		$stateProvider
			.state('state1', {
				url: "/",
				templateUrl: "views/state1.html"
		})

		//this redirects to the default state
		$urlRouterProvider.when('', '/');


	}).run(function($rootScope, $state, $stateParams, $location) {

	});

}( angular.module('starter', ['ui.router','common.controllers']) ));