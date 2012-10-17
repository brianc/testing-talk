var expect = require('expect.js');

describe('scope', function() {

  this.lastName = 'Carlson';
  
  before(function() {
    this.firstName = 'Brian';
  });

  it('is shared between setup and test method', function() {
    expect(this.firstName).to.eql('Brian');
  });

  it('is NOT shared between test method and describe method', function(){
    expect(this.lastName).not.ok();
  });

  it('is shared between tests & mutable', function() {
    this.firstName = 'Aaron';
    this.lastName = 'Carlson';
  });

  it('...', function() {
    expect(this.firstName).to.eql('Aaron');
    expect(this.lastName).to.eql('Carlson');
  });

});
