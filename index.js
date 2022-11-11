const http = require("http");
const url = require("url");
const fs = require("fs");

const slugify = require("slugify");

const replaceAndFill = require("./modules/replaceTemplates");
////////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
dataObject = JSON.parse(data);

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

////////////////////////////////
const slugs = dataObject.map((Element) =>
  slugify(Element.productName, { lower: true })
);
dataObject.forEach((Element, index) => {
  Element.id = slugs[index];
});

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const products = dataObject
      .map((Element) => replaceAndFill(cardTemplate, Element))
      .join("");
    const mainPage = overview.replace(/{%card%}/g, products);
    res.end(mainPage);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObject.filter((Element) => {
      return Element.id == query.id;
    });
    // const product = dataObject[query.id];
    const infoPage = replaceAndFill(productDetails, product[0]);
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
