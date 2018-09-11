// Make connection
var socket = io.connect('https://intim-in-team.herokuapp.com/');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    element = document.getElementById('chat-window'),
    time = document.getElementById('time'),
    y = document.getElementById('myAudio');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function playAudio() {
    y.play();
}
function pauseAudio() {
    y.pause();
}

// scroll function
function updateScroll(){
  element.scrollTop = element.scrollHeight;
}

// Emit events
btn.addEventListener('click', function(){
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    time: `${h}:${m}:${s}`
  });
  message.value = "";
  playAudio()
});

message.addEventListener('keypress', function(w){
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  if (w.keyCode == 13) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value,
      time: `${h}:${m}:${s}`
    });
    message.value = "";
    playAudio()
  }
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
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>' + '<p style="font-size:12;font-weight:lighter;">' + data.time + '</p>';
  });
  updateScroll();
});

// load chat message
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message  + '</p>' + '<p style="font-size:12;font-weight:lighter;">' + data.time + '</p>';
  updateScroll();


});

// load typing message
socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

// to understand this, it means that the function is an
//argument and therefore cannot function as a function.
// BUT, because of the addeventlistener, it means make the argument work
//as a function. so when you keypress, the function will execute itself
//and emit a message and a handle (name)
