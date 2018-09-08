var express = require('express');

// App setup
var app = express();
var server = app.listen(4000,function(){
  console.log('listen to requests on port 4000');
});

// Static files
app.use(express.static('public'));
