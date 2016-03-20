angular.module('spectralPlotter')
	.controller('LinesController',['$scope', '$http', '$q', function($scope, $http, $q){
	
		$scope.linesData = {};
		$scope.linesData.isAl = false;
		$scope.linesData.isCa = false;
		$scope.linesData.isH = false;
		$scope.linesData.isGo = false;
		$scope.linesData.elements = [];
		$scope.linesData.fwhm = 0.5;
		$scope.linesData.numHorGr = 6;


		$scope.linesData.updSelection = function(el){

			var ind = $scope.linesData.elements.indexOf(el);
			if (ind == -1){
				$scope.linesData.elements.push(el);
			} else {
				$scope.linesData.elements.splice(ind, 1);
			}
			$scope.linesData.isGo = ($scope.linesData.elements.length > 0);
		}

		$scope.linesData.selectH = function(){
			$scope.linesData.updSelection('H');
			$scope.linesData.isH = !$scope.linesData.isH;
		}

		$scope.linesData.selectAl = function(){
			$scope.linesData.updSelection('Al');
			$scope.linesData.isAl = !$scope.linesData.isAl;
		}

		$scope.linesData.selectCa = function(){
			$scope.linesData.updSelection('Ca');
			$scope.linesData.isCa = !$scope.linesData.isCa;
		}


		$scope.linesData.fetchLines = function(item, event){
			var serviceUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/';
			var linesResponses = [];

			for (var i = 0; i < $scope.linesData.elements.length; i++){
				var dataUrl = serviceUrl + $scope.linesData.elements[i];	
				linesResponses[i] = $http.get(dataUrl);
			}

			$q.all(linesResponses).then(function(values) {

				var data = [];
				angular.forEach(values, function(value, key){
					data = data.concat(value.data);
				});
				$scope.linesData.result = data;

				var chart1 = {};
			    chart1.type = "LineChart";
			    chart1.cssStyle = "height:400px;";
			    chart1.data = {"cols": [
			        {id: "spec", label: "Spectrum", type: "number"},
			        {id: "aSpec", label: $scope.linesData.elements.join(', '), type: "number"}], 
			        "rows": getFormattedSpectrum(data, $scope.linesData.fwhm)
				};

			    chart1.options = {

			    	explorer: {
        				//maxZoomIn:0.1,
        				keepInBounds: true,
        				actions: ['dragToZoom', 'rightClickToReset'] 
    				},
			  
			        "displayExactValues": true,
			        "vAxis": {
			            "title": "Intensity/a.u.", "gridlines": {"count": $scope.linesData.numHorGr}, "format": "scientific"
			        },
			        "hAxis": {
			            "title": "Wavelength/nm"
			        }
			    };

			    chart1.formatters = {};
			    $scope.linesData.linesChart = chart1;
    			
			});



			/*var dataUrl = serviceUrl + $scope.linesData.elements[0];// + '?wlFrom=400.0&wlTo=500.0';
			var linesResponse = $http.get(dataUrl);

			linesResponse.success(function(data, status, headers, config){
				$scope.linesData.result = data;

				var chart1 = {};
			    chart1.type = "LineChart";
			    chart1.cssStyle = "height:400px;";
			    chart1.data = {"cols": [
			        {id: "spec", label: "Spectrum", type: "number"},
			        {id: "aSpec", label: $scope.linesData.elements.join(', '), type: "number"}], 
			        "rows": getFormattedSpectrum(data, $scope.linesData.fwhm)
				};

			    chart1.options = {
			        //"title": "Atomic Spectrum",
			        "displayExactValues": true,
			        "vAxis": {
			            "title": "Intensity/a.u.", "gridlines": {"count": $scope.linesData.numHorGr}
			        },
			        "hAxis": {
			            "title": "Wavelength/nm"
			        }
			    };

			    chart1.formatters = {};
			    $scope.linesData.linesChart = chart1;

				function formatRows(d){
					var rows = [];
					angular.forEach(d, function(value, key){

						if (!isNaN(value.relInt)){
							var column = {c: [{v: value.wl}, {v: value.relInt, f: "Al Intensity " + value.relInt}]};
							rows.push(column);
						} 
					});
			        return rows;
				}


			});
			linesResponse.error(function(data, status, headers, config){
				console.log('failed get lines request' + status);
			}); */
		}

	}]);
