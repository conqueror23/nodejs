var express = require('express');

var app = express();

app.use(express.static('public'));

app.listen(3000);


// angularjs complete the things in your terminal
//get files/data from another places into server and manipulate in the client side
