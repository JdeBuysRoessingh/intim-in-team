var express = require('express');
var socket = require('socket.io');
var path = require("path");

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

app.get("/calendar", function (req, res){
  res.sendFile(path.join(__dirname+"/public/calendar.html"));
});

app.get("/chat", function (req, res){
  res.sendFile(path.join(__dirname+"/public/index.html"));
});
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

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

});
