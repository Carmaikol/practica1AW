/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mysql = require("mysql");
//var express = require("express");
var http =  require("http");
var config = require("./config");

/*
var servidor = http.createServer(function(request, response) {   
       console.log(`Método: ${request.method}`); 
        console.log(`URL: ${request.url}`);
          console.log(request.headers);  
});

*/


var datosConexion = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
};
 var conexion = mysql.createConnection(datosConexion);
/**
 * Obtiene el nombre y apellidos de un usuario a partir de su identificador
 * 
 * @param {string} id  Identificador del usuario a buscar
 * @param {function} callback  Función callback que recibirá el objeto Error (en su caso) 
 *              y el usuario recuperado como un objeto con dos atributos: nombre y apellidos.
 */
function buscarPorId(id, callback) {
    if (callback === undefined) callback = function() {};
    
    var conexion = mysql.createConnection(datosConexion);

    conexion.connect(function(err) {
        if (err) {
            callback(err);
        } else {
            conexion.query("SELECT username, apellidos  " +
                           "FROM users c " +
                           "WHERE c.id = " + id,
            function(err, result) {
                var row = result[0];
                var res = { nombre: row.username, apellidos: row.apellidos };
                conexion.end();
                callback(null, res);
            });
        }
    });
}

/*
buscarPorId("1", function(err, result) {
    console.log(result);
});
*/
/**
 * Obtiene todos los usuarios de la BD, cada uno con el número de direcciones
 * de correo asociadas al mismo.
 * 
 * @param {function} callback   Función que recibirá, además del objeto de tipo
 *          Error (en su caso), un array con cada uno de los usuarios. El array
 *          contendrá objetos con tres atributos: Nombre, Apellidos y NumCorreos.
 
function devolverContactos(callback) {
    if (callback === undefined) callback = function() {};
    
    var conexion = mysql.createConnection(datosConexion);

    conexion.connect(function(err) {
        if (err) {
            callback(err);
        } else {
            conexion.query("SELECT c.Nombre, c.Apellidos, COUNT(tc.Correo) AS NumCorreos " +
                           "FROM Contactos c LEFT JOIN Tiene_correo tc ON c.Id = tc.Id " +
                           "GROUP BY c.Id",
            function(err, result) {
                conexion.end();
                callback(null, result);
            });
        }
    });
}

devolverContactos(function(err, result) {
    if (!err) {
        result.forEach(function(u) {
            console.log(`Nombre: ${u.username} ${u.apellidos}. password: ${u.password}`);
        });
    }
});
*/

conexion.connect(function(err) {      
    if (err) {         
         console.log("Error al realizar la conexión: " + err);     
    }else {    
          // ... realizar consulta ...   
    
        conexion.query("SELECT username, apellidos  " +
                           "FROM users c " ,
            function(err, result) {
                var row = result[0];
                var res = { nombre: row.username, apellidos: row.apellidos };
                console.log(res);
                conexion.end();
                //callback(null, res);
            });
            
      
            
        
         
      } });
    
   /* 
    function consultaBD(callback) {    
          var conexion = mysql.createConnection({   
                   host: "localhost",        
              user: "root", password: "",        
              database: "miBD"      });
                  conexion.connect(function(err) {   
                 if (err) { callback(err); 
            }  else {         
                 conexion.query(      
                      "SELECT Nombre, Apellidos, COUNT(tc.Correo) as NumCorreos "  
                        +  "FROM Contactos c LEFT JOIN Tiene_Correo tc ON c.Id = tc.Id "  +
                         "GROUP BY c.id",          
                  function(err, rows) {              
                        callback(null, rows);   
                             });       
                 }      });
      }
          */  
            
          
            var servidor = http.createServer(function(request, response) { 
                    consultaBD(function(err, filasBD) {    
                          if (err) {         
                             console.error(err);      
                             response.statusCode = 500;     
                             } else {          
                            response.statusCode = 200;
                                      devolverPagina(response, filasBD);
                                  }      });
                  });
           
         function devolverPagina(response, filasBD) {     
                 response.write('<html>');    
                  response.write('<head>');   
                   response.write('<title>Base de datos de teléfonos</title>' );   
                   response.write('<meta charset="utf­8">');  
                   response.write('<style>th, td { border: 1px solid }</style>' );    
                  response.write('</head>');   
                   response.write('<body>');    
                  response.write('<table>');    
                  response.write('<tr><th>Nombre</th><th>Apellidos</th>'  +    
                                  '<th>Número direcciones</th></tr>');   
                   filasBD.forEach(function(fila) {      
                        response.write('<tr>');        
                      response.write(`<td>${fila.username}</td>`);       
                       response.write(`<td>${fila.apellidos}</td>`);      
                        response.write(`<td>${fila.password}</td>`);   
                           response.write('</tr>');  
                        });    
                  response.write('</table>');   
                   response.write('</body>');   
                   response.end(); 
            }
            
            /*
            conexion.get('/',function(req,res){
               res.sendfile("index.html"); 
            });
             */
             
        