//Miguel Aguilera Zorzo    05450952K


var express = require('express');
var db = require('./db');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var config = require('./config');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var upload = multer({dest: 'public/uploads/'});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Better body data managing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

var rules = require('./rules');


//Login
app.post("/login", function(req, res) {
    db.login(req.body, function(err, results) {
        if (err !== null)
            res.render('error', {message: "Error!",error: err});        
        if (results !== null) {
            
            var minute = 360 * 1000;
            res.cookie('username', req.body.username, { maxAge: minute });
            if (results.photo !== null) {
                res.cookie('photo', results.photo, { maxAge: minute });
                res.render('MainWindow', {status: req.body.username, 
                    photo: results.photo});
            }
            else {
                res.cookie('photo', null, { maxAge: minute });
                res.render('MainWindow', {status: req.body.username, 
                    photo: null});
            }
        }
        else
            res.render('error', { message: "Wrong Password",error: "Try again!" });  
    });
});


//Signup is received
app.post("/signup", upload.single('file'), function(req, res) {
    var aux = {};
    
    if (req.file !== undefined) {
        
        var file = req.file.path + "."+ req.file.mimetype.substr(6);
        fs.rename(req.file.path, file, function(err) {
            if (err) {res.render('error', {message: "Error!",error: err }); 
            }
        });
        
        aux.photo = req.file.filename + "." + req.file.mimetype.substr(6);
    }
    else {
        aux.photo = null;
    }
    //Get the data from the form
    aux.username = req.body.username;
    aux.pass = req.body.pass;
    aux.name = req.body.name;
    aux.gender = req.body.gender;
    aux.birthdate = req.body.birthdate;
    
    db.signup(aux, function(err, results) {
        if (err !== null)
            res.render('error', {message: "Error!", error: err });  
        if (results)
            res.redirect('/');
    });
});

//Log Out
app.get('/logout',function(req, res){
    res.clearCookie("username");
    res.clearCookie("photo");
    res.render('index', {status: ""});
});

app.post("/signup", function(req, res) {
    db.signup(req.body, function(err, results) {
        if (err !== null)
            res.render('error', {message: "Error!",error: err});  
        if (results)
            res.redirect('/');
    });
});

//
app.get("/mainboard", function(req, res){
    db.loadGameList(req.cookies.username, 
    function(err, results) {
        if (err !== null) {
            res.render('error', {message: "Error!", error: err }); 
            }
            else {
                db.loadPlayerList(req.cookies.username, 
                function(err, res_players) {
                    if (err !== null) {
                        res.render('error', { message: "Error!",error: err }); 
                        }
                        else {
                            res.render('mainboard', {status: req.cookies.username, 
                            game: results, playersInGame: res_players});           
                        }   
                });
            }   
    });
});

//load list of games to join
app.get("/joingame", function(req, res){
    db.loadGameList(req.cookies.username, 
    function(err, results) {
        if (err !== null) {
            res.render('error', {message: "Error",error: err}); 
            }
            else {
                db.loadPlayerList(req.cookies.username, 
                function(err, res_players) {
                    if (err !== null) {
                        res.render('error', {message: "Error!",error: err}); 
                        }
                        else {                         
                            res.render('joingame', {
                                status: req.cookies.username, 
                                game: results, 
                                playersInGame: res_players});
                        }   
                });
            }   
    });
});

//Create game
app.post("/creategame", function(req, res) {
    var aux = {};
    
    aux.id_creator = req.cookies.username;
    aux.name = req.body.name;
    aux.max_players = req.body.max_players;
    aux.turns_left = rules.maxTurn(req.body.num); 
    
    db.creategame(aux, function(err, results) {
        if (err !== null)
            res.render('error', {message: "Error!",error: err});  
        if (results){
            res.redirect('/mainboard');
        }
    });
});


//joing a game
app.get('/join',function(req, res){
    
    db.joingame(req.query, function(err, results) {
     if (err !== null)
            res.render('error', { message: "Error!", error: err});  
        if (results) {
            res.redirect('/mainboard');
        }
    });
});

//close a game
app.get('/closegame',function(req, res){
    db.closegame(req.query.id, function(err, results) {
     if (err !== null)
            res.render('error', { message: "Error!", error: err});  
        if (results) {
            res.redirect('/mainboard');
        }
    });
});

//enter game
app.get('/entergame',function(req, res){
    var auxGame = {};
    auxGame.id = req.query.id;
    auxGame.username = req.cookies.username;
    db.loadgame(auxGame, function(err, results) {
     if (err !== null)
            res.render('error', { message: "Error!",error: err });  
        if (results) {
            res.render('game', {game: results});
        }
    });
});




//Redirection
app.get("/", function(req, res){
    if (req.cookies.username === undefined)
        res.render('index', {status: "No user"});
    else
        res.render('MainWindow', {status: req.cookies.username, photo: req.cookies.photo});
});

app.get("/MainWindow", function(req, res){  
    
    if (req.cookies.username === undefined)
        res.render('index', {status: " ", photo: null});
    else {
        res.render('MainWindow', {status: req.cookies.username, photo: req.cookies.photo});
    }
});



// Errors
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});





app.listen(config.port);

module.exports = app;
