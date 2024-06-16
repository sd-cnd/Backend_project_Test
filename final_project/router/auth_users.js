const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js"); // Assuming books data is imported from booksdb.js
const regd_users = express.Router();
let users = [];

// Function to check if a username is valid (placeholder function)
const isValid = (username) => {
    // Placeholder implementation; replace with actual logic as needed
    return users.some(user => user.username === username);
}

// Function to authenticate user credentials (placeholder function)
const authenticatedUser = (username, password) => {
    // Placeholder implementation; replace with actual logic as needed
    // console.log(user.username);
    return users.some(user => user.username === username && user.password === password);
}

// Task 7: Endpoint for user login 
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ 
          message: "Username and password are required" 
        });
    }

    // Check if the user exists and credentials are valid
    if (authenticatedUser(username, password)) {
        // Create and sign a JWT token
        const token = jwt.sign({ username }, 'fingerprint_customer', { expiresIn: '1h' });

        // Store the token in session (for illustration purposes)
        req.session.token = token;
        console.log(token);

        res.status(200).json({ 
          message: "Login successful", token 
        });
    } else {
        res.status(401).json({ 
          message: "Invalid username or password" 
        });
    }
});

// Task 8: Endpoint to add or modify a review for a book
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body; // Assuming review is sent in the request body
    const username = req.user.username;
    
    // Find the book by ISBN
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (!book) {
        return res.status(404).json({ 
            message: "Book not found" 
        });
    }

    // Ensure book.reviews is initialized as an object if it doesn't exist
    if (!book.reviews) {
        book.reviews = {};
    }

    // Add or update the review for the user
    book.reviews[username] = review;

    res.status(200).json({ 
        message: "Review added/modified successfully", 
        book 
    });
});



// Task 9: Endpoint to delete a review for a book
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username; // Assuming userId is set in authentication middleware

  // Find the book by ISBN
  const booksArray = Object.values(books);
  const book = booksArray.find(b => b.isbn === isbn);
  if (!book || !book.reviews) {
      return res.status(404).json({ 
        message: "Book or reviews not found" 
      });
  }

  if (!(username in book.reviews)) {
    return res.status(404).json({ 
      message: "Review not found for this user and book" 
    });
  }

  // Delete the review
  delete book.reviews[username];

  res.status(200).json({ 
    message: "Review deleted successfully", 
    book 
  });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
