var mysql = require("mysql");


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
           conexion.query("SELECT * FROM USERS WHERE USERNAME= '"+auxUser.username +
                   "' AND PASSWORD='" + auxUser.password + "'"
                  , function(error, res) {
                       if(error) result(error,false);
                          else {
                           
                            conexion.end();
                            if(res.length === 1) result(null,true);
                            else result(null,false);
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
           conexion.query("INSERT INTO USERS VALUES('"+auxUser.username +
                   "'," + auxUser.password + "'," + auxUser.fullname +
                   "'," + auxUser.gender + "'," + auxUser.photo + "'," + auxUser.birthdate 
                   +"')", function(error, res) {
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
        
        
        
        
        
         
 //CREATEGAME
var creategame = function(auxGame, result) {
   conexion.connect(function(err){
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
           conexion.query("INSTERT INTO GAME (ID_CREATOR, NAME, N_PLAYERS, TURNS_LEFT) VALUES ('"
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
  conexion.query("INSTERT INTO ROLES (ID_PLAYER, ID_GAME, ROL, TURN) VALUES ('"
                   + auxRole.id_player + "','" + auxRole.id_game + "', '0'"  + "','" + auxRole.turn + "')"
                   + "ON DUPLICATE KEY UPDATE ID_PLAYER='" + auxRole.id_player + "', ID_GAME='" + auxRole.id_game
                   + "', TURN='" + auxRole.turn         
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
       if(err) result(err, false);
       else{
           //REPASAR ESTA SHIT
         conexion.query("SELECT PHOTO FROM USERS WHERE USERNAME ='" + auxRole +"'"
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
        
         exports.login = login;
        exports.signup = signup;
       exports.creategame = creategame;
        exports.joingame = joingame;
        exports.closegame = closegame;
        exports.gameslist = gameslist;
        exports.playerlist = playerlist;
        exports.loadphoto = loadphoto;