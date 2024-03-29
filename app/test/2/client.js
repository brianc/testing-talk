var expect = require('expect.js');
var Client = function(app) {
  this.app = app;
  this.port = 3212;
  if(this.isRemote()) return;
  this.server = require('http').createServer(this.app);
};

Client.prototype.isRemote = function() {
  return typeof this.app === 'string';
}

Client.prototype.start = function(cb) {
  if(this.isRemote()) return cb();
  this.server.listen(this.port, cb);
};

Client.prototype.stop = function(cb) {
  if(this.isRemote()) return cb();
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
  if(this.isRemote()) {
    var parts = require('url').parse(this.app + path);
    options.path = parts.pathname;
    options.host = parts.hostname;
    options.port = parts.port;
    options.query = parts.query;
  }
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
        it('has statusCode ' + code, function() {
          expect(this.response.statusCode).to.eql(code);
        });
      },
      header: function(name, val) {
        it('has header "'+name+'" with value "'+val+'"', function() {
          expect(this.response.headers[name]).ok();
          expect(this.response.headers[name].indexOf(val) > -1).ok();
        });
      },
      body: function(content) {
        it('has body content "'+content+'"', function() {
          expect(this.response.body.indexOf(content) > -1).ok();
        });
      }
    };
    should.contentType = should.header.bind(should, 'content-type');
    should.css = should.contentType.bind(should, 'text/css');
    should.html = should.contentType.bind(should, 'text/html');
    should.have = should;
    should.be = should;
    should.has = should;
    should.is = should;
    should.should = should;
    cb(should);
  });
};

module.exports = Client;
