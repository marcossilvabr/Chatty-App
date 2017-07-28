// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require("ws")

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colors = ['#0000FF', '#7FFF00', '#00FFFF', '#8B008B', '#FFD700', '#CD5C5C'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.broadcastUserCount = function broadcast() {
  wss.clients.forEach((client) => {
    let color = colors[Math.floor(Math.random()*colors.length)];
    let userCount = {
      type: 'clientCount',
      count: wss.clients.size,
      color: color
    }
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userCount));
    }
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastUserCount();

  ws.on('message', function incoming(message) {
    let toShow = JSON.parse(message);
    console.log('User', toShow.username, 'said', toShow.content);
    toShow.id = uuid.v4();
    wss.broadcast(JSON.stringify(toShow));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastUserCount();
  });
});