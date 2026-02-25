const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `Request made at ${new Date().toISOString()} with method ${req.method} and url ${req.url}\n`,
      (err, data) => {
        if (err) {
          console.error("Failed to write to log file", err);
        }
        console.log("hello from Middleware 3");
        next();
      },
    );
  };
}

module.exports = { logReqRes };
