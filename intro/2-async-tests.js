var expect = require('expect.js');

describe('async tests', function() {
  var beforeEachCount = 0;
  var afterEachCount = 0;

  //uses arguments.length to determine async
  beforeEach(function(done) { 
    process.nextTick(function() {
      beforeEachCount++;
      done();
    });
  });

  afterEach(function(done) {
    process.nextTick(function() {
      afterEachCount++;
      done();
    });
  });

  it('executes in order', function(done) {
    process.nextTick(function() {
      expect(beforeEachCount).to.eql(1);
      expect(afterEachCount).to.eql(0);
      done();
    });
  });

  it('makes testing async code much easier', function(done) {
    process.nextTick(function() {
      expect(beforeEachCount).to.eql(2);
      expect(afterEachCount).to.eql(1);
      done();
    });
  });
});
