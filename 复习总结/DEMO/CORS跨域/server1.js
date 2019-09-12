var url = require('url');

// 这里是8080端口
require('http').createServer(function(req, res) {
    var data = {
        name:'小明',
        sex:'男'
    };
    res.writeHead(200, {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(data));
}).listen(8080, '127.0.0.1',function(){
    console.log('启动服务，监听 127.0.0.1:8080');
})

// 这里是3000端口 CORS跨域，通过修改响应头
require('http').createServer(function(req, res) {
    var data = {
        name: '武林外传',
        time: 2005,
        length: 81,
        address: '同福客栈'
    };
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(data));
}).listen(3000, '127.0.0.1',function(){
    console.log('启动服务，监听 127.0.0.1:3000');
})