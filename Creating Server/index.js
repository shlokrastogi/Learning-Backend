const http = require("http");
const express = require("express");
const { create } = require("domain");
// const fs = require("fs");
// const url = require("url");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});

app.get("about", (req, res) => {
  const name = req.query.name || "Guests";
  res.send(`Welcome to AboutPage ${name}`);
});

app.get("/contact", (req, res) => {
  res.send("Welcome to ContactPage");
});

app.get("/signup", (req, res) => {
  res.send("This is a signup page");
});

app.post("/signup", (req, res) => {
  // DB queries to save the user data
  res.send("Signup successful");
});

// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `Request made at ${new Date()} with method ${req.method} and url ${req.url}\n`;
//   const myUrl = new URL(req.url, `http://${req.headers.host}`);

//   console.log({
//     pathname: myUrl.pathname,
//     search: myUrl.search,
//     query: Object.fromEntries(myUrl.searchParams),
//   });

//   fs.appendFile("log.text", log, (err) => {
//     if (err) {
//       res.statusCode = 500;
//       return res.end("Internal Server Error");
//     }
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") return res.end("HomePage");
//         res.end("HomePage");
//         break;
//       case "/about":
//         const name = myUrl.searchParams.get("name") || "Guest";
//         res.end(`AboutPage for ${name}`);
//         break;
//       case "/contact":
//         res.end("ContactPage");
//         break;

//       case "/search":
//         const query = myUrl.searchParams.get("search_query") || "Nothing";
//         res.end(`Search results for ${query}`);
//         break;

//       case "/signup":
//         if (req.method === "GET") res.end("This is a signup page");
//         else if (req.method === "POST") {
//           // DB queries to save the user data
//           res.end("Signup successful");
//         }

//       default:
//         res.statusCode = 404;
//         res.end("Page Not Found");
//     }
//   });
// });

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
