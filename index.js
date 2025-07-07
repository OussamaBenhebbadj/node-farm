const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/productCard.html`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

  const {query , pathname } = url.parse(req.url, true); //

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHtml = dataObj.map(el => card.replace(/{%PRODUCTNAME%}/g, el.productName)
      .replace(/{%IMAGE%}/g, el.image)
      .replace(/{%PRICE%}/g, el.price)
      .replace(/{%FROM%}/g, el.from)
      .replace(/{%NUTRIENTS%}/g, el.nutrients)
      .replace(/{%QUANTITY%}/g, el.quantity)
      .replace(/{%DESCRIPTION%}/g, el.description)
      .replace(/{%ID%}/g, el.id)).join('');
    const overviewWithCards = overview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(overviewWithCards);

  } else if (pathname === '/product') {
    const productId = query.id;
    const productData = dataObj[productId];
    if (productData) {  
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const productHtml = product.replace(/{%PRODUCTNAME%}/g, productData.productName)
        .replace(/{%IMAGE%}/g, productData.image)
        .replace(/{%PRICE%}/g, productData.price)
        .replace(/{%FROM%}/g, productData.from)
        .replace(/{%NUTRIENTS%}/g, productData.nutrients)
        .replace(/{%QUANTITY%}/g, productData.quantity)
        .replace(/{%DESCRIPTION%}/g, productData.description)
        .replace(/{%ID%}/g, productData.id);
      res.end(productHtml);
    }

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