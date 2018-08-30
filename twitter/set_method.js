var request = require ('superagent');
request.get = ('http://twitter.com/search.json')
	.send ({q: 'justin bieber'})
	.set('Data,new Date')