window.onload = function (){
  var socket = io.connect();
    socket.on('connect',function (){
    // login process check
    document.getElementById('login').style.display = 'block';
    // document.getElementById('chat').style.display = 'block';
    socket.on('announcement',function (msg){
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });
    socket.on('last4',function(data){
      console.log(data);
      // document.getElementById('chat').style.display ='block';
      // document.getElementById('login').style.display = 'none';
      // var li = document.createElement('li');
      // li.className = 'last4';
      // li.innerHTML = data;
      // document.getElementById('messages').appendChild(li);
    });

function addMessage (from ,text){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from + '</b> :' + text;
  document.getElementById('messages').appendChild(li);
}
var input = document.getElementById('input');
document.getElementById('login').onsubmit = function (){
  socket.emit('loginm',email.value,nickname.value);
  email.value =" ";
  nickname.value = " ";
}

document.getElementById('form').onsubmit = function (){
  addMessage('me',input.value);
  socket.emit('text',input.value);
  // reset input
  input.value = '';
  input.focus();
  return false;
}
  socket.on('text',addMessage);
}
