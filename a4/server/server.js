const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res)   => {
           res.statusCode = 200;
           res.setHeader('Content-Type', 'text/html');
           res.end('Hello World <a href="https://www.google.com">google </a> \n');
 });
 server.listen(port, hostname, () => {
      console.log
                (`Server running at http://${hostname}:${port}/`);
app.get ('/',function (req,res){
	res.send ('hello word');
})
	console.log('hello this the server using here');
});
