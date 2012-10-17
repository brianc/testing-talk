
describe('something awesome', function() {
  before(function(done) {
    process.nextTick(function() {
      //done();
    });
  });

  it('is awesome', function() {
    expect(1).to.eql(1);
  });
});

//kind-of 'duh' but still easy to do
