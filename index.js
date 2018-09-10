//this is the server. that receives the messages and maybe send it someone else after
var express = require('express');
var socket = require('socket.io');
let fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'intim-in-team';

var db

//app setup

var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});
var io = socket(server);

app.use(express.static('public'));


// Socket setup

io.on('connection',function(socket){

  console.log('made socket connection', socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
    db.collection("message").insert(data)
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });
});

//Save chat history
// app.get('/conversation', function(req,res){
//     let conversation =  fs.readFileSync('./conversations.txt',{encoding:'utf8'});
//     conversation = conversation + output;
//     fs.writeFileSync('./conversations.txt',conversation);
//     res.send(conversation);
//     page_conversation()
// });

// Use connect method to connect to the server
MongoClient.connect(url, function(err, openConnection) {

  console.log("Connected successfully to server");

  db = openConnection.db(dbName);
});

// load home page
app.get('/', function(req, res){
  console.log("Load Homepage")
  db.collection("message").find({}).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
