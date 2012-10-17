var expect = require('expect.js');

describe('execution order', function() {
  var beforeCount = 0;
  var beforeEachCount = 0;
  var afterCount = 0;
  var afterEachCount = 0;

  before(function() {
    beforeCount++;
  });

  beforeEach(function() {
    beforeEachCount++;
  });

  after(function() {
    afterCount++;
  });

  afterEach(function() {
    afterEachCount++;
  });

  it('runs tests in order', function() {
    expect(beforeCount).to.eql(1);
    expect(beforeEachCount).to.eql(1);
    expect(afterCount).to.eql(0);
    expect(afterEachCount).to.eql(0);
  });

  it('runs "around" functions properly', function() {
    expect(beforeCount).to.eql(1);
    expect(beforeEachCount).to.eql(2);
    expect(afterCount).to.eql(0);
    expect(afterEachCount).to.eql(1);
  });

  describe('child tests', function() {
    it('runs "around" functions properly', function() {
      expect(beforeCount).to.eql(1);
      expect(beforeEachCount).to.eql(3);
      expect(afterCount).to.eql(0);
      expect(afterEachCount).to.eql(2);
    });
  });

});
