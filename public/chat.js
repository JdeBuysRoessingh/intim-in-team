// make connection
var socket  = io.connect('http://localhost:4000');
// shows functionality from the client to the server
//query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
    //shortcut for button. we give the variable send the name button
var output = document.getElementById('output');
// by doing this, it goes into the html file and looks for the id message for example and creates a variable thats is linked to setInterval(function () {
  // it takes elemnts by there id.

//eMit events

btn.addEventListener('click', function(){
  //this function meas that the user will listen anytime we click on the button send
  socket.emit("chat", {
    message:message.value,
    handle:handle.value
    //these refer to the variables we defined up there, and will do what we wrote above.
  });
  message.value = "";
  //this is going to emit the name of the message called chat to the server, so that the box containing the message then gets emty for new messages
});

//listen fro addEventListener
socket.on("chat",function(data){
  output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</P>";
  // this += means keep whatever messages you already have but add on
});
