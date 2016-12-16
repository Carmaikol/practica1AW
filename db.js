var mysql = require("mysql");
var config = require("./config");

var datosConexion = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
};

 var conexion = mysql.createConnection(datosConexion);
 
 
 
 //LOGN
var login = function(auxUser, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
             console.log(" login HASTA AQUI LLEGO");
           conexion.query("SELECT * FROM users WHERE username='"+ auxUser.username +
                   "' AND password='" + auxUser.pass + "'"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {
                             console.log(" loginHASTA NO AQUI LLEGO   user: " +  auxUser.username + " pass: " +  auxUser.pass  );
                            
                            conexion.end();
                            if(res.length === 1) {
                                 console.log(" loginHASTA NO " + res + "   user: " +  auxUser.username + " pass: " +  auxUser.pass  );
                                result(null,true);
                        }
                        else {result(null,false);}
                           } 
                        });
                     }
                });
        }; 
 
 //SIGNUP
var signup = function(auxUser, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
           console.log("HASTA AQUI LLEGO");
           conexion.query("INSERT INTO users VALUES('"+auxUser.username +
                   "','" + auxUser.pass + "','" + auxUser.fullname +
                   "','" + auxUser.gender + "','" + auxUser.photo + "','" + auxUser.birthdate 
                   +"')", function(error, res) {
                       if(error) result(error,false);
                          else {
                                console.log("HASTA AQUI NO LLEGO");
                            conexion.commit();
                            conexion.end();
                            result(null,true);
                           } 
                        });
                     }
                });
        };
        
        
        
        
        
         
 //CREATEGAME
var creategame = function(auxGame, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
           conexion.query("INSTERT INTO game (id_creator, name , n_players, turns_left) VALUES ('"
                   + auxGame.id_creator + "','" + auxGame.name + "','" + auxGame.n_players + "','" + auxGame.turns_left + "')"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {
                           conexion.commit();
                            conexion.end();
                         result(null,true);
                            
                           } 
                        });
                     }
                });
        }; 
        
        
        

        
        


 //joingame
var joingame = function(auxRole, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
  conexion.query("INSTERT INTO roles (id_player, id_game, role, turn) VALUES ('"
                   + auxRole.id_player + "','" + auxRole.id_game + "', '0' ,'" + auxRole.turn + "')"
                   + "ON DUPLICATE KEY UPDATE id_player='" + auxRole.id_player + "', id_game='" + auxRole.id_game
                   + "', turn='" + auxRole.turn         
                  , function(error, res) {
                       if(error) result(error,false);
                          else {
                           conexion.commit();
                            conexion.end();
                         result(null,true);
                            
                           } 
                        });
                     }
                });
        }; 



  //CLOSEGAME
var closegame = function(auxGame, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
           conexion.query("UPDATE GAME SET ACTIVE = '0' WHERE ID '" + auxGame + "'" 

                  , function(error, res) {
                       if(error) result(error,false);
                          else {
                           conexion.commit();
                            conexion.end();
                         result(null,true);
                            
                           } 
                        });
                     }
                });
        }; 
        
        
 //LIST ALL GAMES       
var gameslist = function(auxGame, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
  conexion.query("SELECT ID, NOMBRE, DATE(CREATION_DATE) AS DATE, ID_CREATOR, ID_WINNER, N_PLAYERS AS MAXPLAYERS, TURNS_LEFT, ROWS, COLUMNS FROM GAME"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {             
                            conexion.end();
                         result(null,res);
                            
                           } 
                        });
                     }
                });
        }; 


//LIST PLAYERS IN GAME
var playerlist = function(auxRole, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
         conexion.query("SELECT * FROM ROLES"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {             
                          conexion.end();
                         result(null,res);
                            
                           } 
                        });
                     }
                });
        }; 
        
        
var loadphoto = function(auxRole, result) {
   conexion.connect(function(err){
       if(err) {
           console.log("ERROR CONEXION EN PHOTO")
           result(err, false);}
       else{
           //REPASAR ESTA SHIT
           console.log("Llego aqui photo");
         conexion.query("SELECT photo FROM users WHERE username ='" + auxRole.username +"'"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {         
                              console.log("Llego 2aqui photo");
                          conexion.end();
                         result(null,res);
                            
                           } 
                        });
                     }
                });
        }; 
        
         exports.login = login;
        exports.signup = signup;
       exports.creategame = creategame;
        exports.joingame = joingame;
        exports.closegame = closegame;
        exports.gameslist = gameslist;
        exports.playerlist = playerlist;
        exports.loadphoto = loadphoto;