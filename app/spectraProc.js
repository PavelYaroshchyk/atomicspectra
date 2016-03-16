var gauss = function(centWl, fwhm, pixSize, numPix){
	var profile = [];
	var wlStart = centWl - numPix * pixSize / 2;
	for (var i = 0; i < numPix; i++){
		var curWl = wlStart + i * pixSize;
		var curInten = Math.exp(-Math.log(2) * Math.pow(((curWl - centWl)/fwhm/2), 2));
		profile.push({wl: curWl, inten: curInten});
	}
	return profile;
}