const http = require("http");
const express = require("express");//引入express
const socketIo = require("socket.io");//引入socket.io

const app = new express();
const server = http.createServer(app);
const ws = new socketIo(server);//将socket.io 注入 express模块

app.get("/user1", function(req, res, next) {
    res.sendFile(__dirname+"/views/user1.html");
})

app.get("/user2", function(req, res, next) {
    res.sendFile(__dirname+"/views/user2.html");
})

app.get("/user3", function(req, res, next) {
    res.sendFile(__dirname+"/views/user3.html");
})

server.listen(4000, () => {
    console.log(`WS started on http://localhost:4000`)
})

ws.on("connection",function (clientSocket) {
    // socket.io 使用 emit(eventName, data) 发送消息，使用on(eventName, callback)监听消息
    //监听客户端发送的 sendMsg 事件
    clientSocket.on("sendMsg",function (data) {
        // data 为客户端发送的消息，可以是 字符串，json对象或 buffer
        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        clientSocket.broadcast.emit("receiveMsg",data);
    })
});