const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cv"
});

connection.connect((err => {
    if (err) {
        consoole.error("Connection failed: " + err);
        return;
    }

    console.log("Connected to MySQL!");
}));