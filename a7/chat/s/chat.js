window.onload = function (){
  var socket = io.connect();
  socket.on('connect',function (){
  socket.emit('join', prompt ('nickname ?'));

  document.getElementById('chat').style.display = 'block';

  socket.on('annocement',function (msg){
    var li = document.createElement('li');
    li.className = 'announcement';
    li.innerHTML = msg;
    document.getElementById('message').appendChild(li);
  })
});

function addMessage (from ,text){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from + '</b> :' + text;
  document.getElementById('message').appendChild(li);
}
var input = document.getElementById('input');
document.getElementById('from').onsubmit = function (){
  addMessagg('me',input.value);
  socket.emit('text',input.value);

  // reset input
  input.value = '';
  input.focus();

  return false;


}
  socket.on('text',addMessage);
}
