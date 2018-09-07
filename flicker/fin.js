var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require("fs");
var multer  = require('multer');
var app = express();
app.use(multer({ dest: 'upload/'}).array('image'));

app.use(express.static('public'));
app.use(cookieParser());
//app.use(session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(app.router);

app.use(session({
    secret:'secret' ,
    name: 'testapp',   //这里的name指得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

require('fs').readFile('pas.json', function (err,data) {
  //console.log(data);
  alldata = data;
  alldata = JSON.parse(alldata);
});
//  主 "Hello World"
app.get('/', function (req, res) {
  console.log("/ GET");
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  res.end('<form method = "post"><br/>Username<br/><input name = "username"><br/>Password<br/><input name = "passcode"><br/>Anything you like<br/><input name = "img"><br/><button>submit</button></form><a href="http://localhost:3000/pic">show pic</a>');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
  //console.log("/ POST");
  console.log(req.body);
  if(req.body.passcode == alldata.passcode){
    res.cookie("userid",'aa');
    req.session.username = 'bb';
    req.session.search = req.body.img;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Password correct');
    //res.send('Password correct');
    res.end('<script>window.location.href="http://localhost:3000/ui"</script>');
    console.log(req.cookies);
    console.log(req.session.username);
  }else{
    res.end('Password error');
  }
})

app.get('/ui', function (req, res) {
    console.log('/ui get');
    console.log(req.session.username);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write('chose for upload: <br /><form action="/file_upload" method="post" enctype="multipart/form-data"><input type="file" name="image" size="50" /><br /><input type="submit" value="updload" /><br/>');
    /*
    export FLICKR_USER_ID="142177877@N07";
    export FLICKR_ACCESS_TOKEN="72157699438272191-772cfb2071efa81c";
    export FLICKR_ACCESS_TOKEN_SECRET="1f888290d58e1045";
    */

    if(req.session.username !== undefined){
      var Flickr = require("flickrapi"),
      flickrOptions = {
        api_key: "9c69743d03081fceec76893027f50ac1",
        secret: "a731a594d1852473"
      };

      Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        if(req.session.search === undefined){
          req.session.search = 'red+panda';
        }
        if(req.session.search == null){
          req.session.search = 'red+panda';
        }
        if(req.session.search == ''){
          req.session.search = 'red+panda';
        }
        console.log(req.session.search);
        flickr.photos.search({
          text: req.session.search
        }, function(err, result) {
          result.photos.photo.forEach(e=>{
            let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
            console.log(url);
            res.write('<img src = "'+url+'" /><br/>');
          });
          res.end('end');
        });
      });

      //res.end('logged in');
    }else{
       res.end('<a href = "http://localhost:3000">Please login</a>')
    }
})

app.post('/file_upload', function (req, res) {
 
  console.log(req.files[0]);  // 上传的文件信息
 
  var des_file = __dirname + "/1.jpg";
  // + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
          console.log( err );
      }else{
        response = {
          message:'File uploaded successfully', 
          filename:req.files[0].originalname
        };
      }
      console.log( response );
      res.end( JSON.stringify( response ) );
    });
  });
});

app.get('/pic', function(req, res) {   
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.write(fs.readFileSync('1.jpg'));
  res.end();
  //res.end('<img href = "http://localhost:3000/1.jpg" />');
})

app.get('/1.jpg', function(req, res) {   
  //console.log("/ab*cd GET ");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(fs.readFileSync('1.jpg'));
  res.end();
})


app.get('/ab*cd', function(req, res) {   
  console.log("/ab*cd GET ");
  res.end('regular express');
})
 
 
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("http://%s:%s", host, port)
 
})