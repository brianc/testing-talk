
describe('something awesome', function() {
  it('is awesome', function(done) {
    process.nextTick(function() {
      done();
    });
  });

  it('never ends', function(done) {
    //never calls done
  })
});

//kind-of 'duh' but still easy to do
