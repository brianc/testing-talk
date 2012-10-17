var server = require(__dirname + '/simple-http');
var expect = require('expect.js');

describe('my server', function() {
  it('is awesome', function() {
    expect(1).to.eql(1);
  });
});

//where is the server.close() call? Booo!!!
//cleanly shutting down is part of the testing process
//https://github.com/visionmedia/mocha/blob/master/bin/_mocha#L324
