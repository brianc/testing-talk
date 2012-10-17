var expect = require('expect.js');
var app = require('./../');

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

describe('site', function() {
  before(function(done) {
    helper.start(app, done);
  });

  describe('GET /', function() {
    before(function(done) {
      var self = this;
      helper.request('/', function(err, res) {
        if(err) return done(err);
        self.response = res;
        done();
      });
    });

    it('has statusCode 200', function() {
      expect(this.response.statusCode).to.eql(200);
    });
  });

  after(function(done) {
    helper.stop(done);
  });
});
