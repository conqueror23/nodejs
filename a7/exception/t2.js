var request = require('superagent')
,assert = require('assert');

request.get('http://localhost:3000')
.data({q:'bieber'})
.exec(function(res){

assert.ok(200 ==res.status);

assert.ok(~res.text.toLowerCase().indexOf('bieber'));
});



