const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js');




// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// fill in next so that it returns the message queue and invokes each message that it receives
module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
   res.end(messageQueue.dequeue());
  } else if (req.method === 'POST') {


    let incomingData
    let arrayOfChunks = [];
    req.on('data', chunk => {
      arrayOfChunks.push(chunk)

    });
    incomingData = Buffer.from(arrayOfChunks);
    console.log(Buffer.isBuffer(incomingData));
    req.on('end', () => {
        fs.writeFile(path.join('.', 'background.jpg'), incomingData, 'binary',function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          });
        res.end('ok');
    });





  //   fs.writeFile("./test.txt", "Hey there!", function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //     console.log("The file was saved!");
  // });
  } else {
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
