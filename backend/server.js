#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./config/express');
var debug = require('debug')('PTApp:server');
var http = require('http');
var db      = require( './config/database' )();
var path        = require('path');

/******************************************************************************
 **
 ** Initialize and maintain the database tables, index, and stored procedures
 */
var options =
{
    host             : db.db.host,
    port             : db.db.port,
    user             : db.db.user,
    password         : db.db.password,
    database         : db.db.database,
    installScript    : path.join( __dirname, 'databaseScripts', 'mysql-deploy.rc' ),
    schemaLocation   : path.join( __dirname, 'databaseScripts', 'schemaScripts' )
    // routinesLocation : path.join( __dirname, 'databaseScripts', 'routineScripts' ),
    // indexLocation    : path.join( __dirname, 'databaseScripts', 'indexScripts' )
};

var dbInstaller = require('./config/dbInstaller')( options );

//dbInstaller.installBuildScript();


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
