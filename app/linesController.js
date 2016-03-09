angular.module('spectralPlotter')
	.controller('LinesController',['$scope', '$http', function($scope, $http){
	
		$scope.linesData = {};
		$scope.linesData.element = '';
		$scope.linesData.selectAl = function(){
			$scope.linesData.element = 'Al';
		}

		$scope.linesData.fetchLines = function(item, event){
			var serviceUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/';
			var dataUrl = serviceUrl + $scope.linesData.element + '/I';
			var linesResponse = $http.get(dataUrl);
			linesResponse.success(function(data, status, headers, config){
				$scope.linesData.result = data;
			});
			linesResponse.error(function(data, status, headers, config){
				console.log('failed get lines request' + status);
			});
		}
	}]);
