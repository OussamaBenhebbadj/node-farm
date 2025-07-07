const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === '/' || pathname === '/overview') {
    res.end('Welcome to the Overview Page');
  } else if (pathname === '/product') {
    res.end('Welcome to the Product Page');
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'Custom-Header': 'This is a custom header'
    });
    res.end('<h1>Page Not Found</h1>');
  }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listening to requests on port 8000"); // Server is listening on port 80
});