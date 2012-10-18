//require the app we're testing
var app = require('./../app');

//require the expect.js module
var expect = require('expect.js');

//require our client helper
var Client = require('./client');

//initialize our test client
var site = new Client(app);

describe('site', function() {

  //start the site
  before(function(done) {
    site.start(done);
  });

  //stop the site
  after(function(done) {
    site.stop(done);
  });

  describe('GET /', function() {
    before(function(done) {
      var self = this;
      site.request('/', function(err, res) {
        if(err) return done(err);
        self.response = res;
        done();
      });
    });

    it('has statusCode 200', function() {
      expect(this.response.statusCode).to.eql(200);
    });

    it('has content-type html', function() {
      expect(this.response.headers['content-type'].indexOf('text/html')).to.equal(0);
    });

    it('has "O hai!" in the body"', function() {
      expect(this.response.body.indexOf('O hai!')).eql(0);
    });
  });


  describe('GET /index.css', function() {
    return;
    before(function(done) {
      var self = this;
      site.request('/index.css', function(err, res) {
        self.response = res;
        done(err);
      });
    });

    it('has 200 status code', function() {
      expect(this.response.statusCode).eql(200);
    });

    it('is css', function() {
      expect(this.response.headers['content-type'].indexOf('text/css')).eql(0);
    });
  });
});

//write failing test for public resource (/index.css)
//make it pass
