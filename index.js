const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongodb connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRoute);

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
