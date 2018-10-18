window.onload = function(){
    var socket = io.connect();
    
    function addMessage (name,email,text,idd){
        var li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = '<b>' + name + '</b>: '+ 'email: '+email+' message: '+text;
        document.getElementById(idd).appendChild(li);
    };
    
    var input = document.getElementById('user_message');
    
    document.getElementById('btn1').onclick = function(){
        addMessage(user_name.value,user_email.value,user_message.value,'messages');
        socket.emit('text',user_name.value,user_email.value,user_message.value);

        user_name.value='';
        user_name.focus();
        user_email.value='';
        user_email.focus();
        user_message.value='';
        user_message.focus();
            
        return false;
    };
    
    socket.on('text', addMessage);
    
    socket.on('output', function(data){

        if(data.length){
            for(var x = 0;x < data.length;x++){
                addMessage(data[x].name,data[x].email,data[x].message,'old_message');
            };
        };
    });
    
    
    document.getElementById('btn2').addEventListener('click', function(){
        
					socket.emit('search',key_word.value);
        
				});
    
     socket.on('searched', function(data){
        console.log(data);
        if(data.length){
            for(var x = 0;x < data.length;x++){
                addMessage(data[x].name,data[x].email,data[x].message,'search_message');
            };
        };
    });
    
    
}