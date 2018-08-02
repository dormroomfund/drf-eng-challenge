var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  var room = null;

  socket.on('join', function (msg) {
    if (room != null) return;
    room = msg;
    socket.join(room);
  });

  socket.on('message', function (msg) {
    if (room == null) return;
    socket.in(room).emit('message', msg);
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + this.address().port);
});
