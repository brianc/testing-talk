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

module.exports = Client;
