//require the app we're testing
var app = require('./../../app');

//require the expect.js module
var expect = require('expect.js');

//require our client helper
var client = require('./../client');

//TODO delete this before talk -
var client = require('./client');

//initialize our test client
client.test(app, function(app) {

  app.get('/', function(it) {
    it.should.have.statusCode(200);

    it.should.be.html();

    it('should have body contents', function() {
      expect(this.response.body.indexOf('hello!')).eql(0);
    });
  });

  app.get('/index.css', function(it) {
    return;
    it.should.have.statusCode(200);

    it.should.be.css();
  });
});
