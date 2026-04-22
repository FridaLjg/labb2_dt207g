const mysql = require("mysql");

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

// SQL-fråga
connection.query("DROP TABLE IF EXISTS workexperience;", (err, results) => {
    if(err) throw err;

    console.log("Tabellen workexperience raderad!");
});

connection.query(`CREATE TABLE workexperience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(100) NOT NULL,
    jobtitle VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL)`, (err, results) => {
    if (err) throw err;

    console.log("Database created: " + results);
});