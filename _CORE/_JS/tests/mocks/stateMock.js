/*
* You're probably wondering what this does? When using ui-router with unit tests you'll get an error. This is because it will hit the route before
* the test runs. Sure you can mock a backend if you wish instead of using this:
*
*  cudos goes to this guy https://gist.github.com/wilsonwc/8358542
*
*
* */


angular.module('stateMock',[]);
angular.module('stateMock').service("$state", function($q){
	this.expectedTransitions = [];
	this.transitionTo = function(stateName){
		if(this.expectedTransitions.length > 0){
			var expectedState = this.expectedTransitions.shift();
			if(expectedState !== stateName){
				throw Error("Expected transition to state: " + expectedState + " but transitioned to " + stateName );
			}
		}else{
			throw Error("No more transitions were expected! Tried to transition to "+ stateName );
		}
		console.log("Mock transition to: " + stateName);
		var deferred = $q.defer();
		var promise = deferred.promise;
		deferred.resolve();
		return promise;
	}
	this.go = this.transitionTo;
	this.expectTransitionTo = function(stateName){
		this.expectedTransitions.push(stateName);
	}


	this.ensureAllTransitionsHappened = function(){
		if(this.expectedTransitions.length > 0){
			throw Error("Not all transitions happened!");
		}
	}
});
