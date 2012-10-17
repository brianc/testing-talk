var server = require('http').createServer(function(req, res) {
  res.writeHead(200, {'content-type':'text/plain'});
  res.end('hai!');
});

server.listen(3000);
