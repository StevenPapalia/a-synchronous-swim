const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// fill in next so that it returns the message queue and invokes each message that it receives
module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  var commands = ['up', 'down', 'left', 'right'];
  var index = Math.floor(Math.random() * 4);
  if (req.method === 'GET') {
    res.end(commands[index]);
  } else {
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
