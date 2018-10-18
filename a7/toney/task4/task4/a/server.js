var express = require('express');
//var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//connection URL
const url = 'mongodb://127.0.0.1:27017';
//DATAbase name
const dbName = 'myproject';


// use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if(err){throw err;};
 // assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});


app.use(bodyParser());
app.use(cookieParser());
app.use(cookieSession({secret:'my secret'}))

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});

app.get('/',function(req,res){
    res.render('login');
});

app.get('/signup',function(req,res){
    res.render('signup');
});

//app.get('/update',function(req,res){
    
//});
app.post('/signup',function(req,res,next){
    MongoClient.connect(url, function(err, client) {
        if(err){throw err;};
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.insertOne(req.body.user,function(err,result){
            if(err){throw err;};
            console.log('success');
           // callback(result);
            client.close();
            res.redirect('/');
        })
        
        
});
})

app.post('/login',function(req,res,next){
    MongoClient.connect(url,function(err,client){
        if(err){throw err;};
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.find({'email':req.body.email,'password':req.body.password}).toArray(function(err,result){
            if (err) throw err;
            console.log(JSON.stringify(result));
            res.send("First Name: "+result[0].firstName+"<br>"+"Last Name: "+result[0].lastName+"<br>"+"Email: "+result[0].email+"<br>"+"Do you want to update your email address?"+"<br>"+'<form action="/update" method="post" ><br>Old email: <input type = "text" name = "oldEmail"> <br>New email: <input type="text" name="newEmail"><br><button type="submit">update</button></form><br><form action = "/delete" method = "post">Old account: <input type = "text" name = "oldaccount"><br><button type = "submit">delete your account</button></form>');
            client.close();
            
        });
    });
});

app.post('/delete', function(req,res,next){
    MongoClient.connect(url,function(err,clinet){
        if(err){throw err;};
        console.log("connected successfully to server");
        const db = clinet.db(dbName);
        const collection = db.collection('documents');
        try{
            collection.deleteMany(
            {"email":req.body.oldaccount}
            );
            console.log(req.body.oldaccount);
        }catch(e){
            print(e);
        };
        
        clinet.close();
        res.redirect('/');
    })
    
})

app.post('/update',function(req,res,next){
    MongoClient.connect(url,function(err,clinet){
        if(err){throw err;};
        console.log("connected successfully to server");
        const db = clinet.db(dbName);
        const collection = db.collection('documents');
        
        try{
        collection.updateOne(
            {"email":req.body.oldEmail},
            {$set:{"email":req.body.newEmail}}
            
        );
            console.log(req.body.newEmail)
        } catch(e){
            print(e)
        };
        clinet.close();
        
        res.send("update successfully");
        res.redirect("/");
        //var user_new_email= req.body.newEmail;
        
    });
});


app.listen(3000,function(){
    console.log('app listening on *:3000')
});