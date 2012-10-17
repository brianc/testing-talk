var expect = require('expect.js');
var Client = function(app) {
  this.app = app;
  this.port = 3212;
  this.server = require('http').createServer(this.app);
};

Client.prototype.start = function(cb) {
  this.server.listen(this.port, cb);
};

Client.prototype.stop = function(cb) {
  this.server.close(cb);
};

Client.prototype.request = function(path, options, cb) {
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
    res.body = '';

    res.on('data', function(buffer) {
      res.body += buffer.toString('utf8');
    });

    res.on('end', function() {
      cb(null, res);
    });

    res.on('error', cb);
  });
  req.on('error', cb);
  req.end();
};

Client.test = function(app, cb) {
  var client = new Client(app);
  describe('site', function() {
    before(function(done) {
      client.start(done);
    });
    after(function(done) {
      client.stop(done);
    });
    cb(client);
  });
};

Client.prototype.get = function(path, cb) {
  var client = this;
  describe('GET ' + path, function() {
    before(function(done) {
      var self = this;
      client.request(path, function(err, res) {
        self.response = res;
        done(err);
      });
    });
    var should = {
      statusCode: function(code) {
        it('should have statusCode ' + code, function() {
          expect(this.response.statusCode).to.eql(code);
        })
      },
      html: function() {
        it('should have content-type text/html', function() {
          expect(this.response.headers['content-type']).ok();
          expect(this.response.headers['content-type'].indexOf('text/html')).eql(0);
        })
      }
    };
    should.have = should;
    should.be = should;
    it.should = should;
    cb(it);
  });
};

module.exports = Client;
