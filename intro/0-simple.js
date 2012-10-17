var expect = require('expect.js');

describe('simple test', function() {
  it('is simple', function() {
    expect(1).to.eql(1);
  });

  describe('nested simple test', function() {
    it('is also simple', function() {
      expect(2).to.eql(2);
    });
  });
});
