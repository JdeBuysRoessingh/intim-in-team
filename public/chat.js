// Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    element = document.getElementById("chat-window");

// scroll function
function updateScroll(){
  element.scrollTop = element.scrollHeight;
}

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function(){
  socket.emit('typing',handle.value);
});

// reload of the page
window.addEventListener('load', function(){
  socket.emit('loadMessages')
});

//Listen for events
// load all messages
socket.on('loadMessages', function(result){
  result.forEach(function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });
  updateScroll();
});

// load chat message
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  updateScroll();
});

// load typing message
socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});


message.addEventListener('keypress', function(w){
  if (w.keyCode == 13) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = "";
  }
});
