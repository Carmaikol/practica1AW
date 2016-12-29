var mysql = require("mysql");
var config = require("./config");

var conexionInfo = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
};



//login
var login = function(auxUser, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err, false);
        else {
         conexion.query("SELECT * FROM users WHERE username = '" 
                 + auxUser.username + "' AND" + " password ='" + auxUser.pass + "'",
            function(err, result) {
                if (err) res(err, null);
                else {
                    conexion.end();
                    if (result.length === 1)
                        res(null, result[0]);
                    else 
                        res(null, null);
                }
            });
        }
    });
};

//Sign Up
var signup = function(auxUser, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err, false);
        else {
           conexion.query("INSERT INTO users VALUES ('" + auxUser.username + "'," + "'" + auxUser.pass + "', '" + auxUser.fullname + "', " +
                           "'" + auxUser.gender + "', '" + auxUser.photo+"',"+ "'" + auxUser.birthdate + "')",
            function(err, result) {
                if (err) res(err, false);
                else {
                    conexion.commit();
                    conexion.end();
                    res(null, true);
                }
            });
        }
    });
};



//load games
var loadGameList = function(datos, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err);
        else {
            conexion.query("SELECT id, active, name, DATE(creationdate) AS creationdate, "+
                "id_creator, id_winner, n_players AS max_players, turns_left, rows, columns FROM game",
            function(err, result) {
                if (err) res(err);
                else {
                    conexion.end();
                    res(null, result);
                }
            });
        }
    });
};

var loadPlayerList = function(datos, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err);
        else {
            conexion.query("SELECT * FROM roles ",
            function(err, result) {
                if (err) res(err);
                else {
                    conexion.end();
                    res(null, result);
                }
            });
        }
    });
};


//create game
var creategame = function(auxgame, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err, false);
        else {
              conexion.query("INSERT INTO game (id_creator, name, n_players, turns_left) VALUES ('" + auxgame.id_creator +
                      "','" + auxgame.name + "','" + auxgame.max_players+"','" + auxgame.turns_left+"')",
            function(err, result) {
                if (err) res(err, false);
                else {
                    conexion.commit();
                    conexion.end();
                    res(null, true);
                }
            });
        }
    });
};


//join game
var joingame = function(auxRole, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err, false);
        else {
          conexion.query("INSERT INTO roles (role, id_player, id_game, turn) VALUES ('0', '" + auxRole.id_player + "','" + auxRole.id_game +
                  "','" + auxRole.id_player + "') ON DUPLICATE KEY UPDATE role='0', id_player='" + auxRole.id_player+ "', id_game='" + auxRole.id_game
                  + "'," + "turn = '" + auxRole.id_player + "'",
            function(err, result) {
                if (err) res(err, false);
                else {
                    conexion.commit();
                    conexion.end();
                    res(null, true);
                }
            });
        }
    });
};


//close game
var closegame = function(auxid, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err, false);
        else {
           conexion.query("UPDATE game SET active = '0' WHERE id = '" + auxid + "'",
            function(err, result) {
                if (err) res(err, false);
                else {
                    conexion.commit();
                    conexion.end();
                    res(null, true);
                }
            });
        }
    });
};






//load game
var loadgame = function (auxGame, res) {
    var conexion = mysql.createConnection(conexionInfo);
    conexion.connect(function(err) {
        if (err) res(err);
        else {
            conexion.query("SELECT * FROM game G, roles R WHERE G.id = '" + auxGame.id + "' AND R.id_game = '" +
                    auxGame.id + "' AND R.id_player = '" + auxGame.username + "'" ,
            function(err, result) {
                if (err) res(err);
                else {
                    conexion.end();
                    res(null, result[0]);
                }
            });
        }
    });
};



exports.signup = signup;
exports.login = login;
exports.creategame = creategame;
exports.closegame = closegame;
exports.joingame = joingame;
exports.loadGameList = loadGameList;
exports.loadPlayerList = loadPlayerList;
exports.loadgame = loadgame;