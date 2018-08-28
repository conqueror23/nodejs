/**
 * @file 基于TCP的聊天程序
 * @author <huangjiandong>
 */

const net = require('net');
totalchunk = '';
// 共享状态
let count = 0;
let users = {};

let server = net.createServer(function (socket) {
    count++;
    let nickname;
    socket.setEncoding('utf8');    
    // 页面tip
    socket.write(
        '\r\n > welcome to \033[92mgroup-chat\033[39m!'
        + '\r\n > ' + count + ' other people are connected at this time.'
        + '\r\n > please write your name and press enter: '
    );

    // 当用户退出时，进行广播通知
    let broadcast = (msg, exceptMyself) => {
        for (var i in users) {
            if (!exceptMyself || i != nickname) {
                users[i].write(msg);
            }
        }
    };

    // 监听用户行为作出处理
    socket.on('data', function (chunk) {
        socket.setEncoding('utf8');
        // 删除回车符
        //chunk = chunk.replace('\r\n', '');
        //chunk += chunk;

        if(chunk == '\r\n'){
            if (!nickname) {
                if (users[totalchunk]) {
                    socket.write('\033[93m> nickname already in use. try again:\033[39m ');
                    return;
                } else {
                    nickname = totalchunk;
                    // 将socket对象赋予用户，赋予用户可操作权限
                    users[nickname] = socket;
                    console.log('\033[90m > ' + nickname + ' joined the room\033[39m\r\n');
                    broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\r\n');
                }
            } else {
                // 验证用户为已注册，则输入数据(totalchunk)为聊天信息
                for (var i in users) {
                    if (i != nickname) {
                        console.log('\033[96m > ' + nickname + ':\033[39m ' + totalchunk + '\r\n')
                        broadcast('\033[96m > ' + nickname + ':\033[39m ' + totalchunk + '\r\n', true);
                    }
                }
            }
            totalchunk = '';
        }else{
            totalchunk = totalchunk + chunk;
        }
    });

    socket.on('error', function (err) {
        console.log(err)
    });


    // 当其中某个用户断开连接时，需要清除数据
    socket.on('close', function () {
        count--;
        broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
        delete users[nickname];
    });
});

server.listen(3000, function () {
    console.log('\033[96m   server listening on *:3000\033[39m', server.address());
});


server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(8080);
      }, 1000);
    }
  });