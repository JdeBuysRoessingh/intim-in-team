var express = require('express');

<<<<<<< HEAD

//app setup

var app = express();
var server = app.listen(4000,function(){
  console.log('listening to requests on port 4000');
});

=======
// App setup
var app = express();
var server = app.listen(4000,function(){
  console.log('listen to requests on port 4000');
});

// Static files
>>>>>>> 34b648bc262ee2556ff7815a0a1ba9af549c04c0
app.use(express.static('public'));
