var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var app = express();

var url = 'mongodb://127.0.0.1:27017/a7task4b';

//var server = new mongodb.Server('127.0.0.1', 27017);

app.use(bodyParser());
app.use(cookieParser());
app.use(cookieSession({secret:'my secret'}))

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});

// create the mongoose connection
mongoose.connect(url);

// error
mongoose.connection.on('connected',function(){
    console.log('Mongoose connection open to'+ url);
})

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/*mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});*/

//Schema model

var Schema = mongoose.Schema;
var User = mongoose.model('User',new Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type: String},
    password:{type:String}
}));

// clinet side
app.get('/',function(req,res){
    res.render('login');
});

app.get('/signup',function(req,res){
    res.render('signup');
});

app.post('/login',function(req,res){
    User.findOne({email:req.body.email, password: req.body.password},
                function(err,doc){
        if(err)return next(err);
        if(!doc) return res.send('<p>User not found. Go back and try again</p>');
        req.seesion.loggedIn = doc._id.toString();
        res.redirect('/');

    })
})


app.post('/signup', function (req, res, next) {
  var user = new User(req.body.user).save(function (err,res){
    if(err){
        console.log(err);
    }else{
        console.log("Res: "+ res);
    };

  });
     res.redirect('/');

});


app.listen(3000);
