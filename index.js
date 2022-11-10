const http = require("http");
const url = require("url");
const fs = require("fs");

////////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const productDetails = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

function createCards(template, JSON_Data) {
  let output = template.replace(/{%ID%}/g, JSON_Data.id);
  output = output.replace(/{%name%}/g, JSON_Data.productName);
  output = output.replace(/{%from%}/g, JSON_Data.from);
  output = output.replace(/{%image%}/g, JSON_Data.image);
  output = output.replace(/{%nutations%}/g, JSON_Data.nutrients);
  output = output.replace(/{%quantity%}/g, JSON_Data.quantity);
  output = output.replace(/{%price%}/g, JSON_Data.price);
  output = output.replace(/{%description%}/g, JSON_Data.description);

  if (!JSON_Data.organic)
    output = output.replace(/{%not-organic%}/g, "not-organic");
  return output;
}

////////////////////////////////
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const products = dataObject
      .map((Element) => createCards(cardTemplate, Element))
      .join("");
    const mainPage = overview.replace(/{%card%}/g, products);
    res.end(mainPage);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObject[query.id];
    const infoPage = createCards(productDetails, product);
    res.end(infoPage);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});
server.listen(8080, "127.0.0.1", () => {
  console.log("MAES is listening for you");
});
