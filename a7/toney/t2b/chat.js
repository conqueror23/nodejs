window.onload =function (){
  var socket =io.connect();
  sockect.on('connect',function(){
    socket.emit('join',prompt('what is your nickname?'));

    document.getElementById('chat').style.display = 'block';

    socket.on('annoucement',function (msg){
      var li = document.createElement('li');
      li.className = 'annoucement';
      li.innerHTML = msg;
      document.getElementById('message').appendChild(li);
    });

  });

function addMessage(from,text){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from+'</b>: '+text;
  document.getElementById('messages').appendChild(li);

}
var input = document.getElementById('input');
document.getElementById('form').onsubmit = function(){
  addMessage('me',input.value);
  socket.emit('text',input.value);

input.value = '';
input.focus();
return false;
}
socket.on('text',addMessage);
}
