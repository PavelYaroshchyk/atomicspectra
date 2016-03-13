var spectralPlotter = angular.module('spectralPlotter', ['ngRoute','ui.bootstrap','googlechart']);
spectralPlotter.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/welcome',{
		templateUrl: 'app/home.html',
		controller: 'HomeController'
	})
	.when('/lines',{
		templateUrl: 'app/lines.html',
		controller: 'LinesController'
	})
	.when('/register',{
		templateUrl: 'app/register.html',
		controller: 'RegistrationController'
	})
	.when('login',{
		templateUrl: 'app/login.html',
		controller: 'LoginController'
	})
	.otherwise({
		redirectTo: '/welcome' 
	});
}]);
