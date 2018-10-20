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
      document.getElementById('chat').style.display ='block';
      document.getElementById('login').style.display = 'none';
      if(data.length){
        for(var n=0;n<data.length;n++){
          // console.log(data[n].auther);
          addMessage("messages",data[n].author,data[n].email,data[n].record);
        }
      }
    });
    socket.on('searchResult',function(data){
      if(data.length){
        for(var n=0;n<data.length;n++){
          // console.log(data[n].auther);
          addMessage("searchResult",data[n].author,data[n].email,data[n].record);
        }
      }
    });
function addMessage (place,from ,contact,text){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from +'</b> :'+contact+ '</b> :' + text;
  document.getElementById(place).appendChild(li);
}
var input = document.getElementById('input');
document.getElementById('loginBtn').onclick = function (){
  socket.emit('loginm',email.value,nickname.value);

}

document.getElementById('formBtn').onclick = function (){
  addMessage('messages',email.value,input.value);
  console.log(email.value,nickname);
  socket.emit('text',email.value,nickname.value,input.value);
  // reset input
  input.value = '';
  input.focus();
  return false;
}
document.getElementById('SearBtn').onclick =function(){
  socket.emit('search',search.value);
}
  email.value =" ";
  nickname.value = " ";
  socket.on('text',addMessage);
}
