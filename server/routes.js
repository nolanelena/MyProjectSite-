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
  var newTodo = req.body;
  fs.readFile(databasePath, function(err, data){
    if (err) { console.log(err); }
    // parse data from a string 
    var parsedData = JSON.parse(data);
    if (!parsedData) { console.log ('Database is corrupted!!'); }
    // add new item to the database 
    parsedData.push(newTodo);
    // convert database back to a string 
    //...
    var newDBSString = JSON.stringify(parseData);
    fs.writeFile(databasePath, newDBSString, function(err){
      if (err) { console.log(err); }
      // respond to the client
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.write(newDBSString);
      res.end(); 
    });
  });
}),

// Everything route 

router.get('/*', function indexRouteHandler (req, res) {
  res.render('view', {
    title: "Website Example",
    token: _.uniqueId()
  });
});


module.exports = router;