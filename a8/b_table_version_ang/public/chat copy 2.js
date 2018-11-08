window.onload = function (){
  var socket = io.connect();
    socket.on('connect',function (){
    document.getElementById('product').style.display = 'block';
    socket.on('announcement',function (msg){
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });

    socket.on('searchResult',function(data){
      if(data.length){
        for(var n=0;n<data.length;n++){
          console.table(data);
          // console.log(data[n].auther);
          addMessage("searchResult",search.value,data[n].product);
          socket.emit('commentl',data[n].product);
        }
      }
    });
    socket.on('show_comments',function(result){
      if(result.length){
        for(var n=0;n<result.length;n++){
          console.table(result);
          // console.log(data[n].auther);
          addMessage("process",search.value,result[n].comments);
        }
      }
    })
function addMessage (place,from ,contact){
  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>'+from +'</b> :'+contact;
  document.getElementById(place).appendChild(li);
}


document.getElementById('SearBtn').onclick =function(){
  socket.emit('search',search.value);
}
  search.value = '';
  socket.on('text',addMessage);

document.getElementById('commentBtn').onclick = function(){
  console.log(productname.value);
  console.log(comments.value);
  socket.emit('comment',productname.value,comments.value);
}
}
