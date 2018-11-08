window.onload= function (){
  var socket = io.connect();

  socket.on('connect',function(){
    console.log('connected to server in client side');

  })
  socket.on('json',function (data){
    console.log(data);
  })


};
