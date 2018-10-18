window.onload = function (){
  var socket = io.connect();
  socket.on('connect',function (){
    socket.emit('join', prompt ('nickname ?'));

    document.getElementById('chat').style.display = 'block';

    socket.on('announcement',function (msg){
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
});
function addMessage (from ,text){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from + '</b> :' + text;
  document.getElementById('messages').appendChild(li);
}
var input = document.getElementById('input');
// console.log(input);

document.getElementById('form').onsubmit = function (){
  console.log('isnide print functions');
  addMessage('me',input.value);
  socket.emit('text',input.value);
  // reset input
  input.value = '';
  input.focus();
  return false;
}
  socket.on('text',addMessage);
}
