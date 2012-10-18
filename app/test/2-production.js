//require our client helper
var client = require('./client');

//TODO delete this
var client = require('./2/client');

//initialize our test client
client.test('http://bmc.io', function(app) {

  app.get('/', function(response) {
    response.has.statusCode(200);
    response.is.html();
    response.has.body('O hai!');
  });

});
