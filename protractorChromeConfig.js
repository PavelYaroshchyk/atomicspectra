exports.config = {
	chromeOnly: true,
	chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',
	capabilities: {
		'browserName': 'chrome'
	},

	baseUrl: 'http://localhost:6060/',
	specs: ['spec/e2e/**/*.js'],
	jasmineNodeOpts: {
    		showColors: true,
    		defaultTimeoutInterval: 30000
  	}
};
