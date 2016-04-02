var constants = {minWl: 200, maxWl: 1000, pixSize: 0.1, numPix: 100};

var gauss = function(centWl, relInt, fwhm){
	var profile = [];
	centWl = findCentPix(centWl);
	var wlStart = centWl - constants.numPix * constants.pixSize/2;
	for (var i = 0; i < constants.numPix; i++){
		var curWl = wlStart + i * constants.pixSize;
		if (curWl >= constants.minWl && curWl <= constants.maxWl){
			var curInten = Math.exp(-Math.log(2) * Math.pow(((curWl - centWl)/fwhm/2), 2));
			profile.push({wl: curWl, inten: curInten * relInt});
		}
	}
	return profile;
}

var findCentPix = function(centWl){
	var wl = Math.floor(centWl);
	var dec = centWl - wl;
	for (var i = 0; i < 1; i += constants.pixSize){
		if (Math.abs(dec - i) < constants.pixSize ){
			dec = i;
			break;
		}
	}
	return wl + dec;
}

var getEmptySpectrum = function(){
	var spectrum = [];
	var curWl = constants.minWl;
	var i = 0;
	while (curWl < constants.maxWl){
		spectrum.push({wl: curWl.toFixed(3), inten: 0});
		curWl += constants.pixSize;
		i++;
	}
	return spectrum;
}

var getSpectrum = function(data, fwhm){
	var spectrum = getEmptySpectrum();
	var wlLookupMap = spectrum.map(function(e){return e.wl;});
	
	angular.forEach(data, function(value, key){
		var relIntDig = value.relInt.replace(/[^\d\.]/, '');

		if (!isNaN(relIntDig) && !isNaN(value.wl)){
			var line = gauss(value.wl, relIntDig, fwhm);
			var lineStart = line[0].wl.toFixed(3);
			var startPix = wlLookupMap.indexOf(lineStart);

			for (var i = 0; i < line.length; i++){
				if ((startPix + i) < spectrum.length) {
					spectrum[startPix + i].inten += line[i].inten;	
				}	
			}
		}	
	});
	return spectrum;
}

var getFormattedSpectrum = function(data, fwhm){
	return formatSpectrum(getSpectrum(data, fwhm));
}


var formatSpectrum = function(data){
		var rows = [];
		angular.forEach(data, function(value, key){
			var column = {c: [{v: value.wl}, {v: value.inten, f: value.inten.toFixed(3)}]};
			rows.push(column);
		});
	return rows;
}
