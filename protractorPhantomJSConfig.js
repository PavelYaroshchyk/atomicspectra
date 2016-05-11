exports.config = {
	capabilities: {
		'browserName': 'phantomjs'
	},

	baseUrl: 'http://localhost:6060/',
	specs: ['spec/e2e/**/*.js'],
	jasmineNodeOpts: {
    		showColors: true,
    		defaultTimeoutInterval: 30000
  	}
};
