const express = require('express');
const public_users = express.Router();
const books = require("./booksdb.js");
const axios = require('axios');
const { isValid, users } = require("./auth_users.js");

// Task 1: Get the list of all books available
public_users.get('/', function (req, res) {
    res.json(books);
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params;

    if (isbn && books[isbn]) {
        res.json(books[isbn]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Task 3: Get books by author
public_users.get('/author/:author', function (req, res) {
    const { author } = req.params;
    const booksArray = Object.values(books); // Convert books object to array
    const booksByAuthor = booksArray.filter(book => book.author === author);

    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
    } else {
        res.status(404).json({ message: 'No books found by this author' });
    }
});

// Task 4: Get books by title
public_users.get('/title/:title', function (req, res) {
    const { title } = req.params;
    const booksArray = Object.values(books);
    const booksByTitle = booksArray.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).json({ message: 'No books found with this title' });
    }
});

// Task 5: Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
    const { isbn } = req.params;
    if (isbn && books[isbn]) {
        res.json(books[isbn].reviews)
    } else {
        res.status(404).json({ message: `Error in getting book reviews with isbn : ${isbn}` });
    }
});

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Register the user
    users.push({ username, password });

    res.status(201).json({ message: "User registered successfully" });
});

// Task 10: Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
function getAllBooks() {
    return new Promise((resolve, reject) => {
        // Check if 'books' object is not empty
        if (books && Object.keys(books).length) {
            resolve(books);
        } else {
            reject('Error in getting all the books');
        }
    });
}

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    getAllBooks()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(500).json({ "message": error }))
});

// Task 11: Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
function getBookDetailsFromISBN(isbn) {
    let book = books[isbn];
    return new Promise((resolve, reject) => {
        if (book) {
            resolve(book);
        } else {
            reject("Book not found with isbn :");
        }
    });
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params;
    getBookDetailsFromISBN(isbn)
        .then(book => res.send(JSON.stringify(book, null, 4)),)
        .catch(error => res.status(500).json({ "message": error + `${isbn}` }))
});

// Task 12: Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
function getBookDetailsFromAuthor(author) {
    let output = [];
    return new Promise((resolve, reject) => {
        for (var isbn in books) {
            let book = books[isbn];
            if (book.author === author) {
                output.push(book);
            }
        }
        if (output.length) {
            resolve(output);
        } else {
            reject("Error in getting book details with author : ")
        }

    })
}

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const { author } = req.params;
    getBookDetailsFromAuthor(author)
        .then(result => res.send(JSON.stringify(result, null, 4)))
        .catch(error => res.status(500).json({ "message": error + `${author}` }))
});

// Task 13: Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
function getBookDetailsFromTitle(title) {
    let output = [];
    return new Promise((resolve, reject) => {
        for (var isbn in books) {
            let book = books[isbn];
            if (book.title === title) {
                output.push(book);
            }
        }
        if (output.length) {
            resolve(output);
        } else {
            reject("Error in getting book details with title : ")
        }
    })
}

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const { title } = req.params;
    getBookDetailsFromTitle(title)
        .then(result => res.send(JSON.stringify(result, null, 4)))
        .catch(error => res.status(500).json({ "message": error + `${title}` }))
});


module.exports.general = public_users;

