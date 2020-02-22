const fs = require('fs');
const path = require('path');
const messageQueue = require('./js/messageQueue.js');



const keypressHandler = require('./js/keypressHandler');
keypressHandler.initialize(message => console.log(`Message received: ${message}`));
keypressHandler.initialize(message => {
  console.log(messageQueue.messages);
  console.log(messageQueue.enqueue(message));
  console.log(messageQueue.messages);
});


const httpHandler = require('./js/httpHandler');


const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);



// // Handle your routes here, put static pages in ./public and they will server
// httpHandler.router.register('/', function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World');
//   res.close();
// });