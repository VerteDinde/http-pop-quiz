const fs = require('fs');
const path = require('path');

const superCat = {
  name: 'super cat', 
  type: 'top secret'
};

const filePath = path.join(__dirname, 'cat.html');

function app(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 404;
    res.statusMessage = 'Why u no cat?';
    const responseMessage = '<h2>please cat</h2>';
    res.end(responseMessage);
    return;
  }
  if (req.url === '/cat') {
    res.setHeader('Content-Type', 'application/JSON');
    res.end(superCat);
  }
  else {
    // res.setHeader('Content-Type', 'text/html');
    // const stream = fs.createReadStream(filePath);
    // stream.on('data', chunk => res.write(chunk));
    // stream.on('end', () => res.end());
    fs.creatReadStream(filePath).pipe(res);
  }
}

module.exports = app;