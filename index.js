//this is the server. that receives the messages and maybe send it someone else after
var express = require('express');
var socket = require('socket.io');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 4000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

// Database Name
const dbName = 'intim-in-team';

var db

//app setup
var app = express();
var server = app.listen(port, function(){
  console.log('listening to requests on port heroku or 4000');
});
var io = socket(server);

app.use(express.static('public'));

// Use connect method to connect to the server
MongoClient.connect(url, { newUrlParser: true } , function(err, dbb) {
  console.log(err)
  console.log("Connected successfully to server");

  db = dbb.db();

});

// Socket setup

io.on('connection',function(socket){

  console.log('made socket connection', socket.id);

  socket.on('loadMessages', function(){
    db.collection("message").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      socket.emit('loadMessages',result)
    });
  });

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
    db.collection("message").insert(data)
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });
});


// // load home page
// app.get('/', function(req, res){
//   console.log("Load Homepage")
//   db.collection("message").find({}).toArray(function(err,result){
//     if (err) throw err;
//     console.log(result);
//     res.render(path.join(__dirname + '/public/index.html'), result);
//   });
// });
