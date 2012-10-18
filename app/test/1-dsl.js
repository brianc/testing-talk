//require the app we're testing
var app = require('./../../app');

//require the expect.js module
var expect = require('expect.js');

//require our client helper
var client = require('./../client');

//TODO delete this
var client = require('./client');

//initialize our test client
client.test(app, function(app) {

  app.get('/', function(response) {
    response.has.statusCode(200);
    response.is.html();
    response.has.body('O hai!');
  });

});


