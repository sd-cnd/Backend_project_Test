const express = require('express');
const public_users = express.Router();
const books = require("./booksdb.js"); // Assuming books data is imported from booksdb.js
const axios = require('axios');
const { isValid, users } = require("./auth_users.js");

// Task 1: Get the list of all books available
public_users.get('/', function (req, res) {
    res.json(books); // Assuming books is an array of book objects
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params;
    const booksArray = Object.values(books);
    const book = booksArray.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
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
// public_users.get('/review/:isbn', function (req, res) {
//     const { isbn } = req.params;
//     const booksArray = Object.values(books);
//     const book = booksArray.find(b => b.isbn === isbn);
//     if (book && book.reviews) {
//         res.json(book.reviews);
//     } else {
//         res.status(404).json({ message: 'No reviews found for this book' });
//     }
// });

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

    // Register the user (this is a simplified example)
    // You would typically hash the password and store it securely
    users.push({ username, password });

    res.status(201).json({ message: "User registered successfully" });
});

public_users.get('/review/:isbn', function (req, res) {
    const { isbn } = req.params;
    const booksArray = Object.values(books);
    const book = booksArray.find(b => b.isbn === isbn);

    if (book && book.reviews) {
        // Use Axios to make an HTTP GET request to a local server endpoint
        axios.get(`http://localhost:5000/review/${isbn}`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews from server:', error);
                res.status(500).json({ message: 'Error fetching reviews from server' });
            });
    } else {
        res.status(404).json({ message: 'No reviews found for this book' });
    }
});

module.exports.general = public_users;

