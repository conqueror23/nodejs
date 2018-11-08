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
          // console.table(data);
          socket.emit('commentl',data[n].product);
          var option = document.createElement('option');
          option.innerHTML = data[n].product;
          document.getElementById('options').appendChild(option)
          console.log(data[n].product);
          }

          socket.on('show_comments',function(comm){
            const comments=comm;
            console.log(comm);
            for(var n_com=0;n_com<comm.length;n_com++){
                console.log(comm.product);
                addMessage('searchResult',comm[n_com].product,comm[n_com].comments);
              }

            })
      }
        });

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
  console.log(options.value);
  console.log(comments.value);
  socket.emit('comment',options.value,comments.value);
}
}
