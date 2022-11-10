const http = require("http");
const url = require("url");
const fs = require("fs");

////////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const server = http.createServer((req, res) => {
  const query = req.url;
  if (query == "/" || query == "'/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end("Welcome in overview, it feels like correct");
  } else if (query === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
});
server.listen(8080, "127.0.0.1", () => {
  console.log("MAES is listening for you");
});
