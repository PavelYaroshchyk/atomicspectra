angular.module('spectralPlotter')
.controller('LinesController',['$scope', '$http', '$q', '$anchorScroll', '$location', function($scope, $http, $q, $anchorScroll, $location){
	$scope.linesData = {};
	$scope.linesData.isAl = false;
	$scope.linesData.isCa = false;
	$scope.linesData.isH = false;
	$scope.linesData.isGo = false;
	$scope.linesData.elements = [];
	$scope.linesData.fwhm = 0.5;
	$scope.linesData.numHorGr = 6;
	$scope.linesData.startWl = '200';
	$scope.linesData.endWl = '1000';

	var gatherElements = function(){

		$scope.linesData.elements.length = 0;
		if ($scope.linesData.isAl && $scope.linesData.elements.indexOf('Al') == -1) $scope.linesData.elements.push('Al');
		if ($scope.linesData.isH &&  $scope.linesData.elements.indexOf('H') == -1)  $scope.linesData.elements.push('H');
		if ($scope.linesData.isCa && $scope.linesData.elements.indexOf('Ca') == -1) $scope.linesData.elements.push('Ca');
	}

	$scope.linesData.fetchLines = function(item, event){
		
		gatherElements();
		var serviceUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/';
		var linesResponses = [];

		for (var i = 0; i < $scope.linesData.elements.length; i++){
			var dataUrl = serviceUrl + $scope.linesData.elements[i] + '?wlFrom=' + $scope.linesData.startWl + '&wlTo=' + $scope.linesData.endWl;	
			linesResponses[i] = $http.get(dataUrl, {cache: true});
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

				legend: { position: 'bottom' },
		  
		        "displayExactValues": true,
		        "vAxis": {
		            "title": "Intensity/a.u."//, "gridlines": {"count": $scope.linesData.numHorGr}
		        },
		        "hAxis": {
		            "title": "Wavelength/nm"
		        }
		    };

		    chart1.formatters = {};
		    $scope.linesData.linesChart = chart1;	
		});
	}

	$scope.linesData.gotoAnchor = function(x) {
	 	var oldHash = $location.hash();
	 	$location.hash(x);
	 	$anchorScroll.yOffset = 50;
	 	$anchorScroll();
	 	$location.hash(oldHash);
	};
}])

.directive('setClassWhenAtTop', ['$window', function($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function (scope, element, attrs)
        {
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                topPadding = parseInt(attrs.paddingWhenAtTop, 10),
                offsetTop = element.prop('offsetTop'); // get element's offset top relative to document

            $win.on('scroll', function (e) {
                if ($window.pageYOffset + topPadding >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
}]);
