const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 4001;

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
