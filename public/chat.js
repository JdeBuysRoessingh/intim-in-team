// Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});


message.addEventListener('keypress', function(event){
  socket.emit('typing',handle.value);
  if(event.which === 13 && event.shiftKey == false){
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    event.preventDefault();
    message.value = "";
  }
});

//Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML = '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>' + output.innerHTML;
});

socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
