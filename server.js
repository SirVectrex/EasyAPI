import express from 'express';
import dotenv from "dotenv";
import pg from "pg";

import cors from "cors";

import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT;
const conString = process.env.DB_CON_STRING;
const app = express();
app.use(cors())
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonparser = bodyParser.json()

// connect to database
const dbConfig = {
    connectionString: conString,
    ssl: { rejectUnauthorized: false }
}

let dbClient = new pg.Client(dbConfig);
dbClient.connect();

app.get('/', (request, response) => {
    response.send('Hello World!');
});

// get all books from table my_books
app.get('/books', async (request, response) => {
    console.log("---> receiving GET Request to /books");
    console.log(request.headers);
    try {
        console.log("---> getting data from database");
        let res = await dbClient.query('SELECT * FROM my_books')
        console.log("---> sending data to client");
        response.status(200).json(res.rows);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

// post a new book to table my_books with attributes Booktitle and bookauthor
app.post('/addbook', jsonparser ,async (request, response) => {
    console.log("---> receiving POST Request to /books");
    try {
        const data = request.body
        console.log("adding book with title: " + data.booktitle + "   and author: " + data.bookauthor);
        let res = await dbClient.query('INSERT INTO my_books (booktitle, bookauthor) VALUES ($1, $2)', [data.booktitle, data.bookauthor])
        console.log(res)
        response.status(200).json("final");
    } catch (error) {
        // console.log(error);
        response.sendStatus(500);
    }
});


app.listen(PORT, function() {
    console.log(`API running and listening on port ${PORT}`);
});



