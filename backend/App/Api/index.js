const http = require("http");
const URL = require("url");
const fs = require("fs");
const path = require("path");

const data = require("./urls.json");

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, "urls.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;

      cb(JSON.stringify({ message: "OK" }));
    }
  );
}

http
  .createServer((req, res) => {
    const { name, url, description, del } = URL.parse(req.url, true).query;

    const newData = data.urls.map((i, index) => ({ content: i, id: index }));
    const lastId = newData.length;

    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
    });

    if (!name || !url) return res.end(JSON.stringify(data));

    if (del) {
      data.urls = data.urls.filter((item) => item.url !== url);

      return writeFile((message) => {
        res.end(message);
      });
    }

    data.urls.push({ id: lastId, name, url, description });

    return writeFile((message) => res.end(message));
  })
  .listen(3000, () => console.log("Api is runing"));
