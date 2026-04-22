const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
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
        console.error("Connection failed: " + err);
        return;
    }

    console.log("Connected to MySQL!");
}));


//Get-route
app.get("/workexperience", (req, res) => {
    const workexperience = "SELECT * FROM workexperience";

    connection.query(workexperience, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Databas error" });
            return;
        }
        res.json(results);
    });
});

//Post-route
app.post("/workexperience", (req, res) => {
    const { companyname, jobtitle, location } = req.body;

    if (!companyname || !jobtitle || !location) {
        res.status(400).json({ error: "Alla fält måste fyllas i!" });
        return;
    }

    const workexperience = `
        INSERT INTO workexperience (companyname, jobtitle, location)
        VALUES (?, ?, ?)
    `;

    connection.query(workexperience, [companyname, jobtitle, location], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Databas error" });
            return;
        }
    });

    res.status(201).json({
        message: "Arbetserfarenhet tillagd",
        id: result.insertId
    });
});


// Start applikation
app.listen(port, () => {
    console.log("Servern har startat på port:" + port);
});