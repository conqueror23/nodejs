window.onload = function (){
  var socket = io.connect();
    socket.on('connect',function (){
    document.getElementById('product').style.display = 'block';
    // socket.on('announcement',function (msg){
    //   var li = document.createElement('li');
    //   li.className = 'announcement';
    //   li.innerHTML = msg;
    //   document.getElementById('messages').appendChild(li);
    // });
  });

    socket.on('searchResult',function(p_data){
      if(p_data.length){
        for(var n=0;n<p_data.length;n++){
          // console.table(p_data);
          //product
          var tr = document.createElement('tr');
          tr.id = p_data[n];
          addMessage(p_data[n],p_data[n]);
          // console.log(p_data);
          socket.on('show_comments',function(result){
              for(var n_comment=0;n_comment<result.lenght;n_comment++){
                //shows all the comment instead only the firstonehere
                addMessage("pro_com",result[n_comment].comments);
              }
              })
              console.log(result);
              socket.emit('commentl',p_data[n].product);
            }
          }

        });
//
// function addMessage (place,from ,contact){
//   var li = document.createElement('tr');
//   li.className = 'message';
//   li.innerHTML = '<b>'+from +'</b> :'+contact;
//   document.getElementById(place).appendChild(li);
// }

function addMessage (place,contact){
  var td = document.createElement('td');
  td.className  = 'message';
  td.innerHTML = contact;
  document.getElementById(place).appendChild(td);
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
