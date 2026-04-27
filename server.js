const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
            res.status(500).json({ error: "Databas fel!" });
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
            res.status(500).json({ error: "Databas fel!" });
            return;
        }

        res.status(201).json({
            message: "Arbetserfarenhet sparad!",
            id: result.insertId
        });
    });
});

//Put-route
app.put("/workexperience/:id", (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location } = req.body;

    if (!companyname || !jobtitle || !location) {
        return res.status(400).json({ error: "Alla fält måste fyllas i!" });
    }

    const sql = `
        UPDATE workexperience
        SET companyname = ?, jobtitle = ?, location = ?
        WHERE id = ?
    `;

    connection.query(sql, [companyname, jobtitle, location, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Databas fel!" });
            return;
        }

        res.json({ message: "Arbetserfarenhet uppdaterad!" });
    });
})

//Delelte
app.delete("/workexperience/:id", (req, res) => {

    const { id } = req.params;

    const deleteQuery = "DELETE FROM workexperience WHERE id = ?";

    connection.query(deleteQuery, [id], (err, result) => {
        const deleteResult = result;

        if (err) {
            console.error(err);
            res.status(500).json({ error: "Databas fel!" });
            return;
        }

        if (deleteResult.affectedRows === 0) {
            res.status(404).json({ error: "Inget hittades" });
            return;
        }

        res.json({
            message: "Arbetserfarenhet har tagits bort!",
            affectedRows: deleteResult.affectedRows
        });
    });
});

// Start applikation
app.listen(port, () => {
    console.log("Servern har startat på port:" + port);
});