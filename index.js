//this is the server. that receives the messages and maybe send it someone else after
var express = require('express');
var socket = require('socket.io');

//app setup

var app = express();
var server = app.listen(4000,function(){
  console.log('listening to requests on port 4000');
});

app.use(express.static('public'));

// Socket setup
var io = socket(server);
io.on('connection',function(socket){

  console.log('made socket connection', socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

});
