function move (id, pos){
 var cursor = document.getElementById('cursor-'+id);

 if(!cursor){
 cursor = document.createElement('img');
 cursor.id = 'cursor-' + id;
 cursor.src  = '/cursor.png';
 cursor.style.position = 'absolute';
 document.body.appendChild(cursor);

 }
 cursor.style.left = pos.x + 'px';
 cursor.style.top = pos.y + 'px';
}
function remove(id){
  var cursor = document.getElementById('cursor-' +id);

  cursor.parentNode.removeChild(cursor);
}
