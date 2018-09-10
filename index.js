//this is the server. that receives the messages and maybe send it someone else after
var express = require('express');
var socket = require('socket.io');
<<<<<<< HEAD
=======

//app setup
>>>>>>> afa85a0d3ec930030daa4349cb70ed5bed5af988

var app = express();
<<<<<<< HEAD
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
=======
var server = app.listen(4000,function(){
  console.log('listening to requests on port 4000');
>>>>>>> afa85a0d3ec930030daa4349cb70ed5bed5af988
});

app.use(express.static('public'));

<<<<<<< HEAD
// Socket setup & pass server
var io = socket(server);
io.on('connection', function (socket){

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

=======
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
>>>>>>> afa85a0d3ec930030daa4349cb70ed5bed5af988
});
