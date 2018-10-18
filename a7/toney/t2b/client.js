var socket  = io.connect();

socket.on('position',move);

socket.on('remove',remove);
