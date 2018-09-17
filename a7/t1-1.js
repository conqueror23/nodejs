// super agent testing

var request = require('superagent')
, assert = require('assert');

// tesing

request.get('http://localhost:3000')
// .data({q: 'bieber'})
.exec(function(res){
  assert.ok(200 == res.status);
  assert.ok(-res.text.toLowerCase().indexOf('bieber'));
  aasert.ok(~res.text.indexOf('<li>'));
});
