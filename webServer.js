'use strict';

var express = require('express');
var mongoose = require('mongoose');
var portno = 3000;
var app = express();
var User = require('./schema/user.js');
var SchemaInfo = require('./schema/schemaInfo.js');
var Photo = require('./schema/photo.js');
var models = require('./modelData/photoApp.js').models;
var async = require('async');

mongoose.Promise = require('bluebird');

app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost/SM_Project6', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', function (request, response) {
  response.send('Root server files from the' + __dirname);
});

app.get('/test/:p1', function (request, response) {
  var param = request.params.p1;
  console.log('/test called with param1 = ', param);
  if (param !== "info") {
    console.error("Nothing to be done for param: ", param);
    response.status(400).send('Not found');
    return;
  }
  
  var info = models.schemaInfo();
  
  if (info.length === 0) {
    response.status(500).send('Missing SchemaInfo');
    return;
  }
  response.status(200).send(info);
});

app.get('/user/list', function (request, response) {
  response.status(200).send(models.userListModel());
  return;
});

app.get('/user/:id', function (request, response) {
  var id = request.params.id;
  var user = models.userModel(id);
  if (user === null) {
    console.log('User with _id:' + id + ' not found.');
    response.status(400).send('Not found');
    return;
  }
  response.status(200).send(user);
  return;
});

app.get('/photosOfUser/:id', function (request, response) {
  var id = request.params.id;
  var photos = models.photoOfUserModel(id);
  if (photos.length === 0) {
    console.log('Photos for user with _id:' + id + ' not found.');
    response.status(400).send('Not found');
    return;
  }
  response.status(200).send(photos);
});

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
