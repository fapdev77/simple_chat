// Simple chat in NodeJS using socket
// Extracted from : https://socket.io/get-started/chat/
//
// Express initializes app to be a function handler that 
// you can supply to an HTTP server (as seen in line 2).
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// setup a PORT environment variable if you want.
// ex: on shell or in your .profile file include put these lines:
// PORT=3000 (put the port number you want)
// export PORT
var port = process.env.PORT || 3000;
//
// We define a route handler / that gets called when we hit our website home.
// We will serve a index.html file as response.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var connections = [];
//
// Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. 
// Then I listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket){
  socket.on('login message', function(nick) {
    // Inicia um array com um objeto contendo as chaves de socket id associado ao nick name
    connections.push({
      id : socket.id,
      nick: nick
    });
    console.log(connections);
    console.log('Usuario: ' +  nick + ' se conectou');
    io.emit('chat message', 'Olá ' +  nick + ' divirta-se no meu chat!');
  });

  socket.on('disconnect', function(){
    console.log(connections);
    console.log('Usuario: ' + socket.id + ' desconectou!');
    //connections = connections.filter(item => item == socket.id);
    console.log(connections);
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
    return ele != value; });
}



  /* io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
*/
// 
// We make the http server available and listening on port 3000 (you can change that if need)
http.listen(port, function(){
  console.log('listening on *:' + port);
});
