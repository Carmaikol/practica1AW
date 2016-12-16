/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var multer = require('multer');
var mysql = require("mysql");
var express = require("express");
var http =  require("http");
var path = require("path");
var config = require("./config");
var db = require ("./db");
var fs = require('fs');
var ejs = require('ejs');
var bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({ extended: false })

var uploads = multer({
    dest: 'public/uploads/'
});

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
//app.use(bodyparser.json({ type: 'application/*+json' }));
//app.use(bodyparser.text({ type: "*/*" }));
//app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser());
app.use(express.static("public"));
//app.use(bodyparser.text({ type: "*/*" }));

/*
var servidor = http.createServer(function(request, response) {   
       console.log(`Método: ${request.method}`); 
        console.log(`URL: ${request.url}`);
          console.log(request.headers);  
});

*/


 //LOGIN
  app.post("/login",  function(request, response){
         var aux = {}; 
         aux.username = request.body.username;
         aux.pass = request.body.pass;
      //  console.log("Llego aqui login 1    request: " + request.document.loginform.username.value  + "  " + request.document.loginform.pass.value  + "  "  );
      db.login(aux, function(err, res){
          if(err !== null) response.render('error', { message:"Error Login", error:err});
          if(res) {
              db.loadphoto(aux, function(err, auxPhoto){
                   if(err !== null) response.render('error', { message:"Error Login Photo", error:err});
                   else {
                       console.log("Llego aqui login 1");
                       if(auxPhoto.lenght === 1) {
                           response.render('MainWindow', {
                               status: aux,
                               photo: auxPhoto[0].PHOTO
                           });
                       }else{
                           console.log("Llego aqui login 2");
                           response.render('MainWindow', {
                               status: aux,
                               photo: null
                           });
                       }
                   }
              });
          }else{
              console.log("Llego aqui login error");
              response.render('error', { message: "Wrong password!", error: null});
          }
          
      });
 });
 
 //SIGNUP
 app.post("/signup", uploads.single('file'), function(request, response){
     var aux = {};
     if(request.file !== undefined){
         var auxFile = request.file.path + "." + request.file.mimetype.substr(6);
         fs.rename(request.file.path, auxFile, function(err){
            if(err){
                response.render('error', { message:"Error SignUp", error:err});
            } 
         });
         
          aux.photo = request.file.filename + "." + request.file.mimetype.substr(6);
     }else {
         aux.photo = null;
     }
     
     aux.username = request.body.username;
     aux.pass = request.body.pass;
     aux.fullname = request.body.fullname;
     aux.gender = request.body.gender;
     aux.birthdate = request.body.birthdate;
     db.signup(aux, function(err, res){
         if(err !== null) response.render('error', { message: "Error SignUp", error : err});
         if(res) response.redirect('/');
     });
     
    
 
 });
 
 //CREATE GAME
  app.get('/createGame', function(request, response){
    db.creategame(request.query, function(err, res){
        if(err !== null) response.render('error', { message: "Error CreateGame", error : err});
        if(res) response.redirect('/');
    }); 
 });
 
 //JOIN GAME
 app.get('/joinGame',function(request, response){
    db.join(request.query, function(err, res){
        if(err !== null) response.render('error', { message: "Error JoinGame", error : err});
        if(res) response.redirect('/mainBoard');
    }); 
 });
 
 //ENDGAME
 app.get('/endGame', function(request, response){
    db.endgame(request.query.id, function(err, res){
        if(err !== null) response.render('error', { message: "Error EndGame", error : err});
        if(res) response.redirect('/mainBoard');
    }); 
 });

 app.get('/login.html',function(req,res){
              res.sendfile("login.html"); 
            
            });

             
    app.post("login.html", function(request, response) {
    console.log(request.body);
    response.end("login.html");
   // response.end();
});
             
    app.listen(config.port, function() {
    console.log("Escuchando en el puerto 3000");
});

module.exports = app;

/*
        app.post("/procesar_formulario", function(request, response) {
    request.checkBody("login", "Nombre de usuario no válido").matches(/^[A-Z0-9]*$/i);
    request.checkBody("login", "Nombre de usuario vacío").notEmpty();
    request.checkBody("pass", "La contraseña no tiene entre 6 y 10 caracteres").isLength({ min: 6, max: 10 });
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    request.checkBody("fechaNacimiento", "Fecha de nacimiento no válida").isBefore();
    request.getValidationResult().then(function(result) {
        if (result.isEmpty()) {
            response.redirect("/correcto.html");
        } else {
            console.log(result.array());
            console.log(result.mapped());
            var usuarioIncorrecto = {
                login: request.body.login,
                pass: request.body.pass,
                email: request.body.email,
                fechaNacimiento: request.body.fechaNacimiento
            };
            response.render("index", {errores: result.mapped(), usuario: usuarioIncorrecto });
        }
    });
});

*/

app.use(function(req, res, next) {
    res.status(404);
    res.end("Not found: " + req.url);
});