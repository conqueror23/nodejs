const http = require('http');
const fs = require('fs');
const util = require('util');
const querystring =require('querystring');

//http server 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() === 'get') {
    // forms
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple" />'+
        '<input type="submit" value="Upload" />'+
      '</form>'
    );
  } else if (req.url == '/upload' && req.method.toLowerCase() === 'post') {
    if(req.headers['content-type'].indexOf('multipart/form-data')!==-1)
      parseFile(req, res)
    } else {
      res.end('other upload method');
    }
}).listen(3000);

function parseFile (req, res) {
  req.setEncoding('binary');
  var body = '';   // data
  var fileName = '';  // filename
  // bondary 
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
  req.on('data', function(chunk){
    body += chunk;
  });

  req.on('end', function() {
    var file = querystring.parse(body, '\r\n', ':')

    // image only
    if (file['Content-Type'].indexOf("image") !== -1)
    {
      // get file name
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo){
        if (fileInfo[value].indexOf("filename=") != -1){
          fileName = fileInfo[value].substring(10, fileInfo[value].length-1);

          if (fileName.indexOf('\\') != -1){
            fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
          }
          console.log("File : " + fileName);
        }
      }

      // get image type
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;

      contentType = file['Content-Type'].substring(1);
      // get binary start point
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);

      // replace empty
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // remove extra data
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--'+boundary+'--'));
      // save files
      fs.writeFile(fileName, binaryData, 'binary', function(err) {
        res.end('upload complete');
      });
    } else {
      res.end('png are only accepted');
    }
  });
}