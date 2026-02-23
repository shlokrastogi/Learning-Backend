const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `Request made at ${new Date()} with method ${req.method} and url ${req.url}\n`;
  const myUrl = new URL(req.url, `http://${req.headers.host}`);

  console.log({
    pathname: myUrl.pathname,
    search: myUrl.search,
    query: Object.fromEntries(myUrl.searchParams),
  });

  fs.appendFile("log.text", log, (err) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const name = myUrl.searchParams.get("name") || "Guest";
        res.end(`AboutPage for ${name}`);
        break;
      case "/contact":
        res.end("ContactPage");
        break;

      case "/search":
        const query = myUrl.searchParams.get("search_query") || "Nothing";
        res.end(`Search results for ${query}`);
        break;
      default:
        res.statusCode = 404;
        res.end("Page Not Found");
    }
  });
});

myServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
