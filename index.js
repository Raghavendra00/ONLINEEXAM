const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
var store = new MongoDBStore({
  uri: process.env.MONGO_LIVE,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "hello",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", userRoutes);
app.use("/", adminRoutes);

mongoose
  .connect(process.env.MONGO_LIVE)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, (req, res) => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

