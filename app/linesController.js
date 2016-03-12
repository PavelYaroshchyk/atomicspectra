angular.module('spectralPlotter')
	.controller('LinesController',['$scope', '$http', function($scope, $http){
	
		$scope.linesData = {};
		$scope.linesData.isAl = false;
		$scope.linesData.isGo = false;
		$scope.linesData.element = '';
		$scope.linesData.selectAl = function(){
			//$scope.linesData.element = 'Al';
			$scope.linesData.isAl = !$scope.linesData.isAl;
			$scope.linesData.element = $scope.linesData.isAl == true ? 'Al' : false;
			$scope.linesData.isGo = $scope.linesData.isAl;
		}

		$scope.linesData.fetchLines = function(item, event){
			var serviceUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/';
			var dataUrl = serviceUrl + $scope.linesData.element + '/I';
			var linesResponse = $http.get(dataUrl);
			linesResponse.success(function(data, status, headers, config){
				$scope.linesData.result = data;


				//from here



				//charts
				google.charts.load('current', {'packages':['corechart']});
		      	google.charts.setOnLoadCallback(drawChart);

		      	function drawChart() {
		        	var data = google.visualization.arrayToDataTable([
		          	['Wavelength', 'spectrum 1', 'spectrum 2'],
		          	['label 1',  1,      2],
		          	['label 2',  5,      1],
		          	['label 3',  1,       10],
		          	['label 4',  10,      1],
		          	['label 5',  1,      1]
		        	]);

		        	var options = {
		          	title: 'Company Performance',
		          	curveType: 'function',
		          	legend: { position: 'bottom' }
		        	};

		        	var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		        	chart.draw(data, options);
		      	}



				//till here


			});
			linesResponse.error(function(data, status, headers, config){
				console.log('failed get lines request' + status);
			});
		}

	}]);
