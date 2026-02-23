const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `Request made at ${new Date()} with method ${req.method} and url ${req.url}\n`;
  fs.appendFile("log.text", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("AboutPage");
        break;
      case "/contact":
        res.end("ContactPage");
        break;
      default:
        res.end("Page Not Found");
    }
  });
});

myServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
