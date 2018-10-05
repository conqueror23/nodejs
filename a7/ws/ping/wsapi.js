var ws = new Websocket('ws://host/path');
ws.onopen =function (){
  ws.send('data');
}
ws.onclose = function (){
ws.ondata  = function (ev){
  alert(ev.data);
}
}
