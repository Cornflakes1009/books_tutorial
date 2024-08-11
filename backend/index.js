import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cornflakes1009",
    database: "test"
})

app.use(express.json()); // this is a middleware that allows us to send data using client
app.use(cors()); // this lets us connect to the API

app.get("/", (req, res) => {
    res.json("hello");
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) {
            res.json(err); 
        } else {
            return res.json(data)
        }
    })
})

// posting books
app.post("/books", (req, res) => {

    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title, 
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been created");

    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted");
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title, 
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated");
    })
})

app.listen(8800, ()=> {
    console.log("Connected to backends!")
})