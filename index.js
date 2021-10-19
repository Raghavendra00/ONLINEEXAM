const express = require("express");
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT;

const userRoutes = require('./routes/user');

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set("view engine", "ejs");
app.set("views", "views");

app.use('/', userRoutes);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, (req, res) => {
          console.log(`running on ${PORT}`);
        });
    }
)
    .catch((err) => {
    console.log(err);
})


