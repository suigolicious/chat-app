const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);

const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};

wsServer.on('request', (request) => {
  let userID = Math.floor(Math.random() * 10000).toString();
  console.log('Received new connection request from origin ' + request.origin);

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' to server');

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('message received: ' + message.utf8Data);

      // broadcast message to all connected clients
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent message to all clients');
      }
    }
  });
});