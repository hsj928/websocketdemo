var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){
    //接收到客户端连接
    console.log('new connection');

    //接收到客户端传的字符串，将其打印,并将其传到客户端
    conn.on('text', function(str){
        console.log(str);
        //conn.sendText(str);
        //广播
        boardcast(str);
    });

    conn.on('error', function(err) {
        console.log(err);
    });

    // setTimeout(function() {
    //     //给客户端推消息
    //     conn.sendText('来自服务端的消息');
    // }, 5000);

}).listen(2333);

function boardcast(str) {
    server.connections.forEach(function(conn){
        conn.sendText(str);
    });
}