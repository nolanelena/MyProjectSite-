'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');


// API routes

router.get('/elephant', function(req, res){
  // read in the database
  fs.readFile(databasePath, function(err, data){
    if (err) { console.log(err); }
    // send a response 
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(data);
    res.end();
  });   
});

router.post('/api', function(req, res){
  var todos = req.body.todos;
  fs.writeFile(databasePath, todos, function(err){
    if (err) { console.log(err); }
    // respond to the client
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(todos);
    res.end(); 
  });
});

// Everything route 

router.get('/*', function indexRouteHandler (req, res) {
  res.render('view', {
    title: "Website Example",
    token: _.uniqueId()
  });
});


module.exports = router;