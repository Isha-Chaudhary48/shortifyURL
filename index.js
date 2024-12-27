const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

connectMongoDb(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("mongodb connected");
});

app.use("/", urlRoute);
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
