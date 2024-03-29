var expect = require('expect.js');
var app = require('./../app');

var helper = {
  port: 3021,
  start: function(app, cb) {
    this.server = require('http').createServer(app);
    this.server.listen(this.port, cb);
  },
  stop: function(cb) {
    this.server.close(cb);
  },
  request: function(path, options, cb) {
    if(typeof options === 'function') {
      cb = options;
      options = {
      };
    }
    options.path = path;
    options.host = 'localhost';
    options.port = this.port;
    options.method = options.method || 'GET';
    var req = require('http').request(options, function(res) {
      res.data = '';

      res.on('data', function(buffer) {
        res.data += buffer.toString('utf8');
      });
      
      res.on('end', function() {
        cb(null, res);
      });

      res.on('error', cb);
    });
    req.on('error', cb);
    req.end();
  }
};

helper.get = function(path, cb) {
  describe('GET ' + path, function() {
    before(function(done) {
      console.log('here')
      var self = this;
      helper.request(path, function(err, res) {
        self.response = res;
        done(err);
      });
    });
    var should = {
      statusCode: function(code) {
        it('should have statusCode ' + code, function() {
          expect(this.response.statusCode).to.eql(code);
        })
      }
    };
    should.have = should;
    should.be = should;
    it.should = should;
    cb(it);
  });
};

describe('my app', function() {
  before(function(done){
    helper.start(app, done)
  });

  helper.get('/', function(it) {
    it.should.have.statusCode(200);
  })

  helper.get('/', function(res) {
  })
})
