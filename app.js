const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // socket.myid = Math.random();
  console.log('a user connected');

  console.log(socket.handshake.headers.cookie);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('username', msg => {
    users.push(msg);
    socket.username = msg;
  })

  socket.on('typing', function (msg) {
    socket.broadcast.emit('typing', 'blabla');
  });

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});